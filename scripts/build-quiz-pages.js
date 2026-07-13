#!/usr/bin/env node
/**
 * 問題ごとの静的ページ dncl-scratch/quiz/qNNN/index.html を生成する。
 *
 * 中身は editor.html そのもの（同じ見た目・同じ機能のエディタ）。違うのは次の3点だけ:
 *   1. 問題ごとの <title> / description / OGP / Twitterカード meta と canonical を持つ
 *      → クエリ違いの editor.html?mode=quiz&id=... では出せない「問題ごとのカード画像」が出せる
 *   2. window.QUIZ_ID でその問題を読み込む（クエリ不要）
 *   3. <noscript> に問題文・プログラム・選択肢・解答解説を静的HTMLで持つ
 *      → JSを実行しないクローラー（ChatGPT/Claude/Perplexity 等）に中身が読まれる
 *
 * 人間にとっては editor.html?mode=quiz&id=qNNN と同じページ。ページは1つだけ。
 *
 *   node scripts/build-quiz-pages.js
 */
"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const QUIZ_DATA = path.join(ROOT, "dncl-scratch", "quiz-data.js");
const OUT_DIR = path.join(ROOT, "dncl-scratch", "quiz");
const SITEMAP = path.join(ROOT, "sitemap.xml");
const LLMS = path.join(ROOT, "llms.txt");
const SITE = "https://joho-kyoshitsu.com";

const DIFFICULTY_LABEL = { 1: "入門", 2: "やさしい", 3: "標準", 4: "やや難しい", 5: "難しい" };

function loadQuizData() {
    const win = {};
    new Function("window", fs.readFileSync(QUIZ_DATA, "utf8"))(win);
    return win.quizData || {};
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

function stars(n) {
    const d = Math.min(5, Math.max(1, Number(n) || 1));
    return "★".repeat(d) + "☆".repeat(5 - d);
}

// ---- 空欄 ----------------------------------------------------------------
// quiz-data の空欄は "__BLANK_blank_a__" 形式。出現順に A, B, ... を割り当てる。
const BLANK_RE = /__BLANK(?::|_)?([A-Za-z0-9_]+?)__/g;

function collectBlankKeys(ast) {
    const keys = [];
    const walk = (nodes) => {
        nodes.forEach((node) => {
            Object.values(node).forEach((v) => {
                if (typeof v === "string") {
                    for (const m of v.matchAll(BLANK_RE)) {
                        if (!keys.includes(m[1])) keys.push(m[1]);
                    }
                } else if (Array.isArray(v)) {
                    walk(v);
                }
            });
        });
    };
    walk(ast);
    return keys;
}

function fillBlanks(text, keys) {
    return String(text).replace(
        BLANK_RE,
        (_m, key) => `［${String.fromCharCode(65 + keys.indexOf(key))}］`
    );
}

// ---- AST → DNCL コード（dncl-scratch/blocks.js の buildCode() と同じ表記） ----
function buildCode(ast, keys, indent = "") {
    let code = "";
    const f = (s) => fillBlanks(s, keys);

    ast.forEach((node) => {
        if (node.type === "assign") {
            code += `${indent}${f(node.name)} = ${f(node.value)}\n`;
        } else if (node.type === "print") {
            code += `${indent}表示する(${f(node.value)})\n`;
        } else if (node.type === "if") {
            code +=
                `${indent}もし ${f(node.condition)} ならば:\n` +
                buildCode(node.body || [], keys, indent + "  ");
        } else if (node.type === "ifelse") {
            code +=
                `${indent}もし ${f(node.condition)} ならば:\n` +
                buildCode(node.ifBody || [], keys, indent + "  ") +
                `${indent}そうでなければ:\n` +
                buildCode(node.elseBody || [], keys, indent + "  ");
        } else if (node.type === "for") {
            code +=
                `${indent}${f(node.varName)} を ${f(node.start)} から ${f(node.end)} まで ${f(node.step)} ずつ増やしながら繰り返す:\n` +
                buildCode(node.body || [], keys, indent + "  ");
        } else if (node.type === "while") {
            code +=
                `${indent}${f(node.condition)} の間繰り返す:\n` +
                buildCode(node.body || [], keys, indent + "  ");
        } else if (node.type === "expr") {
            code += `${indent}${f(node.left)} ${f(node.op)} ${f(node.right)}\n`;
        } else if (node.type === "call") {
            code += `${indent}${f(node.value)}\n`;
        }
    });

    return code;
}

function labelOf(quiz, value) {
    const c = (quiz.choices || []).find((ch) => ch.value === value);
    return c ? c.label : value;
}

// ---- クローラー向けの本文（<noscript>） -----------------------------------
function noscriptHtml(quiz, id, prev, next) {
    const n = quizNumber(id);
    const keys = collectBlankKeys(quiz.ast || []);
    const code = buildCode(quiz.ast || [], keys).trimEnd();
    const correct = (quiz.answers || []).find((a) => a.correct);
    const diff = Number(quiz.difficulty) || 1;
    const blankNames = keys.map((_k, i) => `［${String.fromCharCode(65 + i)}］`);

    const answerHtml = correct
        ? correct.values
              .map(
                  (v, i) =>
                      `<li>空欄 ［${String.fromCharCode(65 + i)}］ … <code>${esc(labelOf(quiz, v))}</code></li>`
              )
              .join("\n            ")
        : "<li>（正解データなし）</li>";

    const wrongHtml = (quiz.answers || [])
        .filter((a) => !a.correct && a.hint)
        .map(
            (a) =>
                `<li>${a.values
                    .map(
                        (v, i) =>
                            `［${String.fromCharCode(65 + i)}］<code>${esc(labelOf(quiz, v))}</code>`
                    )
                    .join("　")} … ${esc(a.hint)}</li>`
        )
        .join("\n            ");

    return `<noscript>
        <article>
            <h1>第${n}問 ${esc(quiz.title || id)}</h1>
            <p>${esc(quiz.question)}</p>
            <p>難易度：${stars(diff)}（${diff}／${DIFFICULTY_LABEL[diff] || ""}）。共通テスト「情報I」で使われるDNCL（共通テスト用プログラム表記）の穴埋め問題です。JavaScriptを有効にすると、このページでプログラムを組み立てて実行しながら解けます。</p>

            <h2>プログラム</h2>
            <pre><code>${esc(code)}</code></pre>
            <p>空欄 ${blankNames.join("・")} に当てはまるものを、次の選択肢から選びます。</p>

            <h2>選択肢</h2>
            <ul>
                ${(quiz.choices || []).map((c) => `<li><code>${esc(c.label)}</code></li>`).join("\n                ")}
            </ul>

            <h2>ヒント</h2>
            <p>${esc(quiz.defaultHint || "プログラムを1行ずつ追いかけて、変数の値がどう変わるか確かめてみましょう。")}</p>

            <h2>解答</h2>
            <ul>
            ${answerHtml}
            </ul>
            ${wrongHtml ? `<h2>よくある間違い</h2>\n            <ul>\n            ${wrongHtml}\n            </ul>` : ""}

            <h2>ほかの問題</h2>
            <ul>
                ${prev ? `<li><a href="../${prev}/index.html">第${quizNumber(prev)}問へ</a></li>` : ""}
                ${next ? `<li><a href="../${next}/index.html">第${quizNumber(next)}問へ</a></li>` : ""}
                <li><a href="../../practice.html">問題一覧</a></li>
            </ul>
        </article>
    </noscript>`;
}

// ---- 構造化データ ---------------------------------------------------------
function jsonLd(quiz, id) {
    const n = quizNumber(id);
    const pageUrl = `${SITE}/dncl-scratch/quiz/${id}/index.html`;
    const correct = (quiz.answers || []).find((a) => a.correct);

    return {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Quiz",
                "@id": `${pageUrl}#quiz`,
                name: `第${n}問 ${quiz.title || id}`,
                url: pageUrl,
                educationalLevel: "高等学校",
                learningResourceType: "演習問題",
                teaches: "プログラミング, DNCL, アルゴリズム",
                inLanguage: "ja",
                isAccessibleForFree: true,
                about: { "@type": "Thing", name: "DNCL（共通テスト用プログラム表記）" },
                hasPart: {
                    "@type": "Question",
                    eduQuestionType: "Multiple choice",
                    text: quiz.question,
                    ...(correct
                        ? {
                              acceptedAnswer: {
                                  "@type": "Answer",
                                  text: correct.values.map((v) => labelOf(quiz, v)).join(" , "),
                              },
                          }
                        : {}),
                    suggestedAnswer: (quiz.choices || []).map((c) => ({
                        "@type": "Answer",
                        text: c.label,
                    })),
                },
            },
            {
                "@type": "BreadcrumbList",
                itemListElement: [
                    { "@type": "ListItem", position: 1, name: "ホーム", item: `${SITE}/index.html` },
                    {
                        "@type": "ListItem",
                        position: 2,
                        name: "共テプロトレ",
                        item: `${SITE}/dncl-scratch/index.html`,
                    },
                    {
                        "@type": "ListItem",
                        position: 3,
                        name: "練習問題集",
                        item: `${SITE}/dncl-scratch/practice.html`,
                    },
                    { "@type": "ListItem", position: 4, name: `第${n}問 ${quiz.title || id}`, item: pageUrl },
                ],
            },
        ],
    };
}

// ---- 問題ページ（薄い殻。画面は quiz-page.js が editor.html から組み立てる） ----
function quizPageHtml(quiz, id, prev, next) {
    const n = quizNumber(id);
    const diff = Number(quiz.difficulty) || 1;
    const title = `第${n}問 ${quiz.title || id}｜共通テスト「情報I」プログラミング演習 | 共テプロトレ`;
    const desc = `${quiz.question}｜DNCL（共通テスト用プログラム表記）の穴埋め問題（難易度${diff}）。ブラウザ上でプログラムを実際に動かしながら解けます。`;
    const pageUrl = `${SITE}/dncl-scratch/quiz/${id}/index.html`;
    const imgUrl = `${SITE}/dncl-scratch/quiz/img/${id}.png`;

    return `<!DOCTYPE html>
<html lang="ja">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>${esc(title)}</title>
    <meta name="description" content="${esc(desc)}">
    <meta name="keywords" content="プログラミング学習,情報I,DNCL,共通テスト,${esc(quiz.title || "")}">
    <meta name="robots" content="index, follow">
    <link rel="canonical" href="${pageUrl}">

    <!-- オープングラフ -->
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

    <script type="application/ld+json">
${JSON.stringify(jsonLd(quiz, id), null, 2)}
    </script>

    <script>
        // 画面（エディタ）は editor.html を正として quiz-page.js が組み立てる。
        window.QUIZ_ID = "${id}";
        window.DNCL_BASE = "../../";
    </script>
    <script src="../quiz-page.js"></script>
</head>

<body>
    ${noscriptHtml(quiz, id, prev, next)}
</body>

</html>
`;
}

// ---- sitemap.xml / llms.txt ----------------------------------------------
function updateSitemap(ids) {
    if (!fs.existsSync(SITEMAP)) return;
    let xml = fs.readFileSync(SITEMAP, "utf8");
    const today = new Date().toISOString().slice(0, 10);

    xml = xml.replace(
        /\s*<url>\s*<loc>[^<]*\/dncl-scratch\/quiz\/[^<]*<\/loc>[\s\S]*?<\/url>/g,
        ""
    );

    const entries = ids
        .map(
            (id) => `  <url>
    <loc>${SITE}/dncl-scratch/quiz/${id}/index.html</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`
        )
        .join("\n");

    xml = xml.replace(/\s*<\/urlset>\s*$/, `\n${entries}\n</urlset>\n`);
    fs.writeFileSync(SITEMAP, xml);
}

function updateLlmsTxt(ids, quizData) {
    if (!fs.existsSync(LLMS)) return;
    let txt = fs.readFileSync(LLMS, "utf8");

    const heading = "## 共テプロトレ 問題ページ（個別ページ）";
    const lines = [
        heading,
        "",
        ...ids.map((id) => {
            const q = quizData[id];
            const n = quizNumber(id);
            return `- [第${n}問 ${q.title || id}](${SITE}/dncl-scratch/quiz/${id}/index.html): ${q.question}（難易度${Number(q.difficulty) || 1}）`;
        }),
        "",
    ].join("\n");

    if (txt.includes(heading)) {
        txt = txt.replace(new RegExp(`${heading}[\\s\\S]*?(?=\\n## |$)`), lines.trimEnd() + "\n");
    } else {
        txt = txt.trimEnd() + "\n\n" + lines;
    }
    fs.writeFileSync(LLMS, txt);
}

// ---- main -----------------------------------------------------------------
function main() {
    const quizData = loadQuizData();
    const ids = Object.keys(quizData).sort();
    if (!ids.length) {
        console.error("問題データがありません。");
        process.exit(1);
    }

    ids.forEach((id, i) => {
        const dir = path.join(OUT_DIR, id);
        fs.mkdirSync(dir, { recursive: true });
        const html = quizPageHtml(quizData[id], id, ids[i - 1] || null, ids[i + 1] || null);
        fs.writeFileSync(path.join(dir, "index.html"), html);
        console.log(`  ✓ dncl-scratch/quiz/${id}/index.html`);
    });

    updateSitemap(ids);
    console.log("  ✓ sitemap.xml");
    updateLlmsTxt(ids, quizData);
    console.log("  ✓ llms.txt");

    console.log(`\n生成完了: ${ids.length} 問`);
}

main();
