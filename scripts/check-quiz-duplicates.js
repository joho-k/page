#!/usr/bin/env node
/**
 * 問題の重複チェック。
 *
 * タイトルと問題文を突き合わせて、似ている問題の組を報告する。
 * 新しい問題を追加する前後に実行して、同じ題材を二度出さないようにするためのもの。
 *
 *   node scripts/check-quiz-duplicates.js            # 全問どうしを総当たりで見る
 *   node scripts/check-quiz-duplicates.js q040       # q040 と既存問題だけを見る
 *
 * 似ている組が1つでもあれば終了コード1を返す（ジョブの手前で止められる）。
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const DATA = path.join(ROOT, "dncl-scratch", "quiz-data.js");

// この値以上を「似ている」とみなす
const TITLE_THRESHOLD = 0.55;
// 言い回しが似ているだけの別問題（例：q008「偶数の合計」と q016「3の倍数を数える」は
// どちらも「1から○までの整数について…」で始まるが中身は別）まで拾わないよう、
// 問題文はタイトルより高めのしきい値にしている。
const QUESTION_THRESHOLD = 0.72;

function loadQuizData() {
    const sandbox = { window: {} };
    const code = fs.readFileSync(DATA, "utf8");
    new Function("window", code)(sandbox.window);
    return sandbox.window.quizData || {};
}

/** 比較用に文字をそろえる（全角半角・記号・空白のゆれを消す） */
function normalize(text) {
    return String(text || "")
        .normalize("NFKC")
        .toLowerCase()
        .replace(/[\s　]/g, "")
        .replace(/[（）()「」『』【】、。，．,.・:：;；!！?？"'’”\-—ー_+*/%=<>[\]{}]/g, "");
}

/** 2文字ずつの組で見た一致度（Dice係数）。0〜1で、1が完全一致 */
function similarity(a, b) {
    const x = normalize(a);
    const y = normalize(b);
    if (!x || !y) return 0;
    if (x === y) return 1;
    if (x.length < 2 || y.length < 2) return x === y ? 1 : 0;

    const bigrams = (s) => {
        const map = new Map();
        for (let i = 0; i < s.length - 1; i += 1) {
            const g = s.slice(i, i + 2);
            map.set(g, (map.get(g) || 0) + 1);
        }
        return map;
    };

    const ax = bigrams(x);
    const bx = bigrams(y);
    let shared = 0;
    for (const [g, count] of ax) {
        if (bx.has(g)) shared += Math.min(count, bx.get(g));
    }
    return (2 * shared) / (x.length - 1 + y.length - 1);
}

function main() {
    const quizData = loadQuizData();
    const ids = Object.keys(quizData);
    const targets = process.argv.slice(2).filter((a) => !a.startsWith("-"));
    const focus = targets.length > 0 ? targets : null;

    if (focus) {
        const missing = focus.filter((id) => !quizData[id]);
        if (missing.length > 0) {
            console.error(`指定された問題が見つかりません: ${missing.join(", ")}`);
            process.exit(2);
        }
    }

    const hits = [];

    for (let i = 0; i < ids.length; i += 1) {
        for (let j = i + 1; j < ids.length; j += 1) {
            const a = ids[i];
            const b = ids[j];
            if (focus && !focus.includes(a) && !focus.includes(b)) continue;

            const titleScore = similarity(quizData[a].title, quizData[b].title);
            const questionScore = similarity(quizData[a].question, quizData[b].question);

            if (titleScore >= TITLE_THRESHOLD || questionScore >= QUESTION_THRESHOLD) {
                hits.push({ a, b, titleScore, questionScore });
            }
        }
    }

    hits.sort((x, y) => Math.max(y.titleScore, y.questionScore) - Math.max(x.titleScore, x.questionScore));

    const pct = (n) => `${Math.round(n * 100)}%`;

    if (hits.length === 0) {
        console.log(`重複の疑いはありません（${focus ? focus.join(", ") : `${ids.length}問`}をチェック）`);
        return;
    }

    console.log(`似ている問題が ${hits.length} 組あります：\n`);
    for (const hit of hits) {
        console.log(`  ${hit.a} × ${hit.b}  タイトル ${pct(hit.titleScore)} / 問題文 ${pct(hit.questionScore)}`);
        console.log(`    ${hit.a}: ${quizData[hit.a].title}`);
        console.log(`    ${hit.b}: ${quizData[hit.b].title}`);
        console.log("");
    }
    console.log("同じ題材なら、どちらかを別の題材に変えてください。");
    process.exit(1);
}

main();
