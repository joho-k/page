#!/usr/bin/env node
/**
 * 問題ごとの Twitter/OGP カード画像を生成する。
 *
 * カードの meta を持つのは問題ページ dncl-scratch/quiz/qNNN/index.html
 * （scripts/build-quiz-pages.js が生成）。ここではその og:image を作るだけ。
 * プログラムはエディタの実画面をそのまま撮って載せるので、quiz-data.js を直せば画像も追従する。
 *
 * 生成物（追跡対象＝コミットする静的アセット）:
 *   dncl-scratch/quiz/img/qNNN.png   … 1200x630 のカード画像
 *
 * 実行はローカル専用（Playwright が必要。automation/ 配下のものを利用）。
 *   node scripts/build-quiz-cards.js            # 全問
 *   node scripts/build-quiz-cards.js q014 q015  # 指定問のみ
 */
"use strict";

const fs = require("fs");
const http = require("http");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const QUIZ_DATA = path.join(ROOT, "dncl-scratch", "quiz-data.js");
const IMG_DIR = path.join(ROOT, "dncl-scratch", "quiz", "img");
const LOGO = path.join(ROOT, "img", "logo_transparent.png");

const CARD_W = 1200;
const CARD_H = 630;

// 難易度ごとの配色（1:青 2:緑 3:オレンジ 4:赤 5:紫）
const DIFFICULTY_THEMES = {
    1: { main: "#1e6fd9", dark: "#164f9b", bg1: "#e8f1fd", bg2: "#cfe1fa" },
    2: { main: "#1f9254", dark: "#166b3d", bg1: "#e7f6ee", bg2: "#c9ead9" },
    3: { main: "#e07b00", dark: "#a95c00", bg1: "#fdf1e0", bg2: "#f8dfba" },
    4: { main: "#d1344b", dark: "#9d2338", bg1: "#fdeaec", bg2: "#f7ccd2" },
    5: { main: "#7b3fb5", dark: "#5b2c87", bg1: "#f2eafb", bg2: "#e0cdf3" },
};

function themeOf(quiz) {
    const d = Math.min(5, Math.max(1, Number(quiz.difficulty) || 1));
    return { ...DIFFICULTY_THEMES[d], level: d };
}

function stars(level) {
    return "★".repeat(level) + "☆".repeat(5 - level);
}

/** カード生成中だけ使う静的サーバ（エディタ実画面を開くため） */
function startServer() {
    const MIME = {
        ".html": "text/html; charset=utf-8",
        ".js": "text/javascript; charset=utf-8",
        ".css": "text/css; charset=utf-8",
        ".png": "image/png",
        ".ico": "image/x-icon",
        ".svg": "image/svg+xml",
        ".json": "application/json",
    };
    const server = http.createServer((req, res) => {
        const urlPath = decodeURIComponent(req.url.split("?")[0]);
        const filePath = path.join(ROOT, urlPath.replace(/^\/+/, ""));
        if (!filePath.startsWith(ROOT) || !fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
            res.writeHead(404);
            res.end("not found");
            return;
        }
        res.writeHead(200, { "Content-Type": MIME[path.extname(filePath)] || "application/octet-stream" });
        fs.createReadStream(filePath).pipe(res);
    });
    return new Promise((resolve) => {
        server.listen(0, "127.0.0.1", () => {
            resolve({ server, base: `http://127.0.0.1:${server.address().port}` });
        });
    });
}

/** エディタの実画面を開き、ブロックで組まれたプログラムを画像として切り出す */
async function captureProgram(page, base, id) {
    await page.goto(`${base}/dncl-scratch/editor.html?mode=quiz&id=${id}`, {
        waitUntil: "networkidle",
    });
    await page.waitForSelector("#workspace .block", { timeout: 15000 });

    // 撮影中だけ、空欄（.quiz-blank）を「？」入りの太枠にして一目で分かるようにする
    await page.evaluate(() => {
        const style = document.createElement("style");
        style.textContent = `
            .quiz-blank {
                border-width: 4px !important;
                background: #fff3cd !important;
                min-width: 4.4em !important;
                font-size: 18px !important;
            }
        `;
        document.head.appendChild(style);

        document.querySelectorAll(".quiz-blank").forEach((el) => {
            if (el.value) return; // 既に答えが入っている空欄はそのまま
            if (el.tagName === "SELECT") {
                const opt = document.createElement("option");
                opt.textContent = "？";
                opt.selected = true;
                el.insertBefore(opt, el.firstChild);
            } else {
                el.value = "？";
            }
        });
    });

    // パネルのスクロールで見切れないよう、撮影中だけ高さ制限を外す
    await page.evaluate(() => {
        const panel = document.getElementById("workspace-panel");
        if (panel) {
            panel.style.height = "auto";
            panel.style.maxHeight = "none";
            panel.style.overflow = "visible";
        }
        const ws = document.getElementById("workspace");
        if (ws) {
            ws.style.height = "auto";
            ws.style.width = "fit-content";
            ws.style.overflow = "visible";
        }
    });

    const buf = await page.locator("#workspace").screenshot({ omitBackground: true });
    return `data:image/png;base64,${buf.toString("base64")}`;
}

function loadChromium() {
    try {
        return require(path.join(ROOT, "automation", "node_modules", "playwright")).chromium;
    } catch (_e) {
        console.error(
            "Playwright が見つかりません。カード生成はローカル専用です（automation/ が必要）。"
        );
        process.exit(1);
    }
}

function loadQuizData() {
    const sandbox = { window: {} };
    const code = fs.readFileSync(QUIZ_DATA, "utf8");
    // quiz-data.js は window.quizData = {...} の形。window を渡して評価する。
    new Function("window", code)(sandbox.window);
    return sandbox.window.quizData || {};
}

function quizNumber(id) {
    return parseInt(String(id).replace(/\D/g, ""), 10);
}

function esc(s) {
    return String(s)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}

function cardHtml(quiz, id, logoDataUri, programDataUri) {
    const n = quizNumber(id);
    const t = themeOf(quiz);
    const title = String(quiz.title || "");
    const question = String(quiz.question || "");
    const tlen = title.length;
    const qlen = question.length;
    // 問題文が長い問題は「q027形式」= タイトルを大きく／問題文は下に小さく3行。
    // 問題文が短い問題は問題文自体を主役にして大きく見せる（タイトルは小さな見出し）。
    const longQuestion = qlen > 45;
    const titleSize = tlen > 18 ? 36 : tlen > 12 ? 44 : 52; // q027形式のタイトル
    const qHeroSize = qlen > 35 ? 30 : qlen > 22 ? 36 : 42; // 短い問題文を主役に出すサイズ

    return `<!doctype html><html lang="ja"><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@400;700;800;900&display=swap" rel="stylesheet">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { width: ${CARD_W}px; height: ${CARD_H}px; }
  body {
    font-family: "M PLUS Rounded 1c", "Hiragino Sans", "Noto Sans JP", sans-serif;
    background: linear-gradient(135deg, ${t.bg1} 0%, ${t.bg2} 100%);
    color: #1b2733; position: relative; overflow: hidden;
    display: flex; flex-direction: column;
  }

  /* 左上：難易度バッジ（円は画面外にはみ出す。文字は円の見えている範囲の中央に置く） */
  .badge {
    position: absolute; top: -60px; left: -50px;
    width: 320px; height: 320px; border-radius: 50%;
    background: ${t.main};
    box-shadow: 0 10px 30px rgba(0,0,0,0.18);
  }
  .badge-text {
    position: absolute; top: 42px; left: 20px; width: 240px;
    color: #fff; text-align: center;
  }
  .badge-text .label { font-size: 20px; font-weight: 700; letter-spacing: 4px; }
  .badge-text .stars { font-size: 34px; letter-spacing: 4px; line-height: 1.3; }
  .badge-text .no { font-size: 24px; font-weight: 800; line-height: 1; margin-top: 6px; }
  .badge-text .no b { font-size: 52px; letter-spacing: 1px; }

  /* 右上：ヘッダー。問題文の長さで主役を切り替える */
  .header { margin: 40px 56px 0 320px; }
  /* q027形式（問題文が長い）：タイトル大 → 問題文小3行 */
  .header .ttl {
    font-size: ${titleSize}px; font-weight: 900; line-height: 1.25; color: #16202b;
    display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
  }
  .header .q {
    margin-top: 12px;
    font-size: 18px; font-weight: 600; line-height: 1.5; color: #46515c;
    display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;
  }
  /* 問題文が短い：小さな見出し（タイトル）→ 問題文を大きく主役に */
  .header .kicker {
    font-size: 22px; font-weight: 800; color: ${t.main}; letter-spacing: 1px;
    display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden;
  }
  .header .qbig {
    margin-top: 10px;
    font-size: ${qHeroSize}px; font-weight: 800; line-height: 1.35; color: #16202b;
    display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;
  }

  /* 中央：エディタ実画面のプログラム */
  .program {
    flex: 1; margin: 18px 90px 0; min-height: 0;
    display: flex; align-items: center; justify-content: center;
  }
  .program img {
    max-width: 100%; max-height: 100%;
    object-fit: contain;
    filter: drop-shadow(0 10px 24px rgba(0,0,0,0.16));
  }

  /* 下：ブランド帯（何のサイトの何なのかを1行で言い切る） */
  .band {
    height: 96px; flex: none; background: ${t.dark}; color: #fff;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 40px 0 46px;
  }
  .band .copy { display: flex; align-items: baseline; gap: 14px; }
  .band .what { font-size: 27px; font-weight: 800; letter-spacing: 0.5px; }
  .band .eq { font-size: 30px; font-weight: 900; opacity: 0.75; }
  .band .brand { font-size: 34px; font-weight: 900; color: ${t.bg1}; letter-spacing: 1px; }
  .band img { height: 58px; width: auto; }
</style></head><body>
  <div class="badge"></div>
  <div class="badge-text">
    <div class="label">難易度</div>
    <div class="stars">${stars(t.level)}</div>
    <div class="no">第<b>${n}</b>問</div>
  </div>
  <div class="header">${
    longQuestion
      ? `<div class="ttl">${esc(title)}</div>${question ? `<div class="q">${esc(question)}</div>` : ""}`
      : `<div class="kicker">${esc(title)}</div><div class="qbig">${esc(question || title)}</div>`
  }</div>
  <div class="program">${programDataUri ? `<img src="${programDataUri}" alt="">` : ""}</div>
  <div class="band">
    <div class="copy">
      <span class="what">共通テスト「情報I」プログラミング対策</span>
      <span class="eq">=</span>
      <span class="brand">共テプロトレ</span>
    </div>
    ${logoDataUri ? `<img src="${logoDataUri}" alt="情報の教室">` : ""}
  </div>
</body></html>`;
}

async function main() {
    const chromium = loadChromium();
    const quizData = loadQuizData();
    const argIds = process.argv.slice(2).filter((a) => /^q\d+$/.test(a));
    const ids = (argIds.length ? argIds : Object.keys(quizData)).filter((id) => quizData[id]);
    if (!ids.length) {
        console.error("対象の問題がありません。");
        process.exit(1);
    }

    fs.mkdirSync(IMG_DIR, { recursive: true });
    const logoDataUri = fs.existsSync(LOGO)
        ? `data:image/png;base64,${fs.readFileSync(LOGO).toString("base64")}`
        : "";

    const { server, base } = await startServer();
    const browser = await chromium.launch();

    // プログラム撮影用（実エディタを開く）と、カード描画用でページを分ける
    const editorPage = await browser.newPage({
        viewport: { width: 1400, height: 1800 },
        deviceScaleFactor: 2,
    });
    const cardPage = await browser.newPage({
        viewport: { width: CARD_W, height: CARD_H },
        deviceScaleFactor: 2,
    });

    for (const id of ids) {
        const quiz = quizData[id];
        const programDataUri = await captureProgram(editorPage, base, id);
        await cardPage.setContent(cardHtml(quiz, id, logoDataUri, programDataUri), {
            waitUntil: "networkidle",
        });
        await cardPage.evaluate(() => document.fonts.ready); // Webフォント適用を待つ
        const pngPath = path.join(IMG_DIR, `${id}.png`);
        await cardPage.screenshot({ path: pngPath, clip: { x: 0, y: 0, width: CARD_W, height: CARD_H } });
        console.log(`  ✓ ${id}  (難易度${themeOf(quiz).level} / ${quiz.title || ""})`);
    }

    await browser.close();
    server.close();
    console.log(`\n生成完了: ${ids.length} 問  →  dncl-scratch/quiz/img/`);
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
});
