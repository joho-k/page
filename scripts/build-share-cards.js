#!/usr/bin/env node
/**
 * 正解シェア用の Twitter/OGP カード画像と、問題ごとのシェア用ページを生成する。
 *
 * 静的サイトのため、editor.html?mode=quiz&id=qNNN のようなクエリ違いでは
 * クローラーに問題ごとの og:image を出せない（クローラーはJSもクエリも見ない）。
 * そこで問題ごとに独立した静的ページ share/qNNN.html を用意し、そこへ
 * 問題ごとの meta（twitter:image 等）を持たせる。人間のアクセスは editor へリダイレクト。
 *
 * 生成物（すべて追跡対象＝コミットする静的アセット）:
 *   dncl-scratch/share/img/qNNN.png   … 1200x630 のカード画像
 *   dncl-scratch/share/qNNN.html      … カード meta 付きリダイレクトページ
 *
 * 実行はローカル専用（Playwright が必要。automation/ 配下のものを利用）。
 *   node scripts/build-share-cards.js            # 全問
 *   node scripts/build-share-cards.js q014 q015  # 指定問のみ
 */
"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const QUIZ_DATA = path.join(ROOT, "dncl-scratch", "quiz-data.js");
const OUT_DIR = path.join(ROOT, "dncl-scratch", "share");
const IMG_DIR = path.join(OUT_DIR, "img");
const LOGO = path.join(ROOT, "img", "logo_transparent.png");
const SITE = "https://joho-kyoshitsu.com";

const CARD_W = 1200;
const CARD_H = 630;

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

function cardHtml(quiz, id, logoDataUri) {
    const n = quizNumber(id);
    return `<!doctype html><html lang="ja"><head><meta charset="utf-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { width: ${CARD_W}px; height: ${CARD_H}px; }
  body {
    font-family: "Hiragino Sans", "Hiragino Kaku Gothic ProN", "Noto Sans JP", sans-serif;
    background: linear-gradient(135deg, #002D5A 0%, #013e7d 55%, #01579b 100%);
    color: #fff; padding: 48px 56px; display: flex; flex-direction: column;
  }
  .top { display: flex; align-items: center; justify-content: space-between; }
  .brand { display: flex; align-items: center; gap: 16px; }
  .brand img { height: 56px; width: auto; }
  .brand .name { font-size: 30px; font-weight: 800; letter-spacing: 1px; }
  .pill {
    background: #FEFF7C; color: #002D5A; font-weight: 800; font-size: 24px;
    padding: 8px 22px; border-radius: 999px;
  }
  .card {
    flex: 1; margin-top: 34px; background: #fff; border-radius: 24px;
    padding: 40px 46px; color: #002D5A; display: flex; flex-direction: column;
    box-shadow: 0 18px 40px rgba(0,0,0,0.25);
  }
  .qno {
    align-self: flex-start; background: #ab0333; color: #fff; font-weight: 800;
    font-size: 26px; padding: 6px 20px; border-radius: 10px;
  }
  .title {
    margin-top: 22px; font-size: 46px; font-weight: 800; line-height: 1.25;
    display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
  }
  .question {
    margin-top: 20px; font-size: 30px; line-height: 1.5; color: #33506e;
    display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;
  }
  .foot {
    margin-top: auto; display: flex; align-items: center; justify-content: space-between;
    font-size: 24px; font-weight: 700; color: #002D5A;
  }
  .foot .tags { color: #ab0333; }
</style></head><body>
  <div class="top">
    <div class="brand">${logoDataUri ? `<img src="${logoDataUri}" alt="">` : ""}<span class="name">情報の教室</span></div>
    <div class="pill">共テプロトレ</div>
  </div>
  <div class="card">
    <div class="qno">第${n}問</div>
    <div class="title">${esc(quiz.title || `問題 ${id}`)}</div>
    <div class="question">${esc(quiz.question || "")}</div>
    <div class="foot">
      <span>joho-kyoshitsu.com</span>
      <span class="tags">#共テプロトレ #情報I</span>
    </div>
  </div>
</body></html>`;
}

function redirectHtml(quiz, id) {
    const n = quizNumber(id);
    const title = `第${n}問「${quiz.title || id}」に挑戦 | 共テプロトレ`;
    const desc = quiz.question
        ? `${quiz.question}｜共通テスト「情報I」のプログラミングを、実際に動かしながら学べます。`
        : "共通テスト「情報I」のプログラミングを、実際に動かしながら学べます。";
    const pageUrl = `${SITE}/dncl-scratch/share/${id}.html`;
    const imgUrl = `${SITE}/dncl-scratch/share/img/${id}.png`;
    const quizUrl = `../editor.html?mode=quiz&id=${id}`;
    return `<!doctype html>
<html lang="ja">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)}</title>
  <meta name="robots" content="noindex">
  <meta name="description" content="${esc(desc)}">
  <!-- OGP -->
  <meta property="og:type" content="article">
  <meta property="og:site_name" content="情報の教室">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(desc)}">
  <meta property="og:url" content="${pageUrl}">
  <meta property="og:image" content="${imgUrl}">
  <meta property="og:locale" content="ja_JP">
  <!-- Twitterカード -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(title)}">
  <meta name="twitter:description" content="${esc(desc)}">
  <meta name="twitter:image" content="${imgUrl}">
  <!-- 人間のアクセスは問題ページへ転送（クローラーは meta を読むだけ） -->
  <meta http-equiv="refresh" content="0; url=${quizUrl}">
  <link rel="canonical" href="${SITE}/dncl-scratch/editor.html?mode=quiz&id=${id}">
  <script>location.replace("${quizUrl}");</script>
</head>
<body>
  <p>問題ページへ移動します。自動で移動しない場合は <a href="${quizUrl}">こちら</a>。</p>
</body>
</html>
`;
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

    const browser = await chromium.launch();
    const page = await browser.newPage({ viewport: { width: CARD_W, height: CARD_H }, deviceScaleFactor: 2 });

    for (const id of ids) {
        const quiz = quizData[id];
        await page.setContent(cardHtml(quiz, id, logoDataUri), { waitUntil: "networkidle" });
        const pngPath = path.join(IMG_DIR, `${id}.png`);
        await page.screenshot({ path: pngPath, clip: { x: 0, y: 0, width: CARD_W, height: CARD_H } });
        fs.writeFileSync(path.join(OUT_DIR, `${id}.html`), redirectHtml(quiz, id));
        console.log(`  ✓ ${id}  (${quiz.title || ""})`);
    }

    await browser.close();
    console.log(`\n生成完了: ${ids.length} 問  →  dncl-scratch/share/`);
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
});
