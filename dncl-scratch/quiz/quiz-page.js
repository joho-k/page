/**
 * 問題ごとの静的ページ（dncl-scratch/quiz/qNNN/index.html）を、editor.html から組み立てる。
 *
 * 各ページが持つのは「その問題の meta（title/OGP/Twitterカード/JSON-LD）」と
 * 「クローラー向けの <noscript> 本文」だけ。画面の中身は editor.html を1つの正として
 * ここで読み込むので、editor.html を直せば全問のページに自動で反映される（再生成不要）。
 *
 * ページ側で必要な前提:
 *   window.QUIZ_ID   … 読み込む問題のID（例 "q018"）
 *   window.DNCL_BASE … dncl-scratch/ までの相対パス（例 "../../"）
 */
(function () {
    "use strict";

    const BASE = window.DNCL_BASE || "../../";
    const EDITOR_URL = BASE + "editor.html";
    const FALLBACK_URL = `${EDITOR_URL}?mode=quiz&id=${encodeURIComponent(window.QUIZ_ID || "")}`;

    // editor.html 内の相対パスは dncl-scratch/ 基準。ここは2階層深いので base を足す。
    function resolvePath(value) {
        if (!value) return value;
        if (/^(https?:|data:|mailto:|#|\/)/.test(value)) return value; // 絶対パス等はそのまま
        return BASE + value.replace(/^\.\//, "");
    }

    function rewriteElement(el) {
        if (el.hasAttribute && el.hasAttribute("src")) {
            el.setAttribute("src", resolvePath(el.getAttribute("src")));
        }
        if (el.hasAttribute && el.hasAttribute("href")) {
            el.setAttribute("href", resolvePath(el.getAttribute("href")));
        }
    }

    function rewritePaths(root) {
        root.querySelectorAll("[src], link[href]").forEach(rewriteElement);
    }

    // <script> は innerHTML では実行されないので、作り直して順番に読み込む
    function runScript(src, text) {
        return new Promise((resolve, reject) => {
            const script = document.createElement("script");
            if (src) {
                script.src = src;
                script.async = false;
                script.onload = resolve;
                script.onerror = () => reject(new Error(`script load failed: ${src}`));
                document.body.appendChild(script);
            } else {
                script.textContent = text;
                document.body.appendChild(script);
                resolve();
            }
        });
    }

    async function build() {
        const res = await fetch(EDITOR_URL, { cache: "no-cache" });
        if (!res.ok) throw new Error(`editor.html を読めませんでした (${res.status})`);
        const doc = new DOMParser().parseFromString(await res.text(), "text/html");

        // 1) スタイル（editor.html の head から link/style だけを引き継ぐ。meta と title はページ側が持つ）
        doc.head
            .querySelectorAll("link[rel='stylesheet'], link[rel='icon'], link[rel='apple-touch-icon'], style")
            .forEach((el) => {
                rewriteElement(el);
                document.head.appendChild(el);
            });

        // 2) スクリプトは markup と分けて扱う（innerHTML では実行されないため）。
        //    JSON-LD はページ側が問題ごとのものを持っているので取り込まない。
        const scripts = [...doc.querySelectorAll("script")].filter(
            (s) => s.type !== "application/ld+json"
        );
        doc.querySelectorAll("script").forEach((s) => s.remove());

        // 3) 画面の中身（noscript は残したいので、既存の body 内容の前に差し込む）
        rewritePaths(doc.body);
        document.body.insertAdjacentHTML("afterbegin", doc.body.innerHTML);

        // 4) スクリプトを editor.html と同じ順番で実行する
        //    （blocks.js は読み込み時に #workspace を掴むので、必ず markup のあとに実行する）
        for (const s of scripts) {
            const src = s.getAttribute("src");
            await runScript(src ? resolvePath(src) : "", s.textContent);
        }

        // 5) 初期化イベントを補う。
        //    blocks.js は DOMContentLoaded、common.js（ヘッダー生成）は load で初期化するが、
        //    動的に読み込んだ時点で DOMContentLoaded は過ぎていることがあるため、その分だけ自分で流す。
        //    まだ load 前なら本物の load が届くので、二重初期化しないようここでは流さない。
        //    blocks.js は window で DOMContentLoaded を待つので、document から bubbles で届くようにする。
        const state = document.readyState;
        if (state !== "loading") {
            document.dispatchEvent(new Event("DOMContentLoaded", { bubbles: true }));
        }
        if (state === "complete") window.dispatchEvent(new Event("load"));
    }

    build().catch((err) => {
        console.error("[quiz-page] 組み立てに失敗したため editor.html へ移動します", err);
        location.replace(FALLBACK_URL);
    });
})();
