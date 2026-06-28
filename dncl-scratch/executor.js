let vars = {};
let output = "";

let trace = [];
let stepIndex = 0;
let changedVars = new Set();
let currentExplanation = "ステップ実行を始めると、ここに今の処理の説明が表示されます。「次へ」を押してステップ実行を開始してください。";
let currentExplanationHtml = null;
let highlightedArrayAccesses = new Set();
let highlightedVars = new Set();
let whileIterationCounts = new Map();
let stepHistory = [];          // 「前へ」用に各ステップ実行前の状態を積む
let executionActive = false;   // ステップ/一括実行が動いているか（プログラム変更でキャンセル）

const MAX_WHILE_ITERATIONS_PER_BLOCK = 10000;

function pushTraceStep(blockId, fn, getDetails = null) {
    trace.push({
        blockId,
        run: fn,
        getDetails
    });
}

function clearStepHighlight() {
    document.querySelectorAll(".step-active")
        .forEach(el => el.classList.remove("step-active"));
}

function highlightBlock(blockId) {
    clearStepHighlight();

    if (!blockId) return;

    const el = document.querySelector(`[data-block-id="${blockId}"]`);
    if (el) {
        el.classList.add("step-active");
    }
}

function runTraceStep(step) {
    if (!step) return;
    changedVars = new Set();
    highlightBlock(step.blockId);
    const varsBefore = structuredClone(vars);
    const result = step.run();
    const details = step.getDetails ? step.getDetails(varsBefore, result) : null;
    currentExplanation = details?.text || "";
    currentExplanationHtml = details?.html || null;
    highlightedArrayAccesses = new Set(details?.arrayAccesses || []);
    highlightedVars = new Set(details?.highlightVars || []);
}

function setVar(name, value) {
    vars[name] = value;
    changedVars.add(name);
}

function parseAssignmentTarget(expr, scope) {
    const tokens = tokenize(expr.trim());
    if (tokens.length === 0) return null;
    if (!/^[a-zA-Z_]\w*$/.test(tokens[0])) return null;

    const baseName = tokens[0];
    let pos = 1;
    const indices = [];

    function consumeIndex() {
        if (tokens[pos] !== "[") return null;
        pos += 1;

        let bracketDepth = 1;
        const start = pos;
        while (pos < tokens.length) {
            const t = tokens[pos];
            if (t === "[") bracketDepth += 1;
            if (t === "]") bracketDepth -= 1;
            if (bracketDepth === 0) break;
            pos += 1;
        }
        if (pos >= tokens.length || tokens[pos] !== "]") return null;

        const slice = tokens.slice(start, pos);
        pos += 1;

        const indexExpr = slice.join("").trim();
        if (!indexExpr) return null;
        const indexValue = safeEvalWithScope(indexExpr, scope);
        return { indexExpr, indexValue };
    }

    while (true) {
        const idx = consumeIndex();
        if (!idx) break;
        indices.push(idx);
        if (indices.length >= 2) break;
    }

    if (pos !== tokens.length) return null;
    if (indices.length === 0) return null;

    return { baseName, indices };
}

function ensureArrayLength(arr, length) {
    while (arr.length < length) arr.push(0);
}

function ensure2DOuterLength(outer, length) {
    while (outer.length < length) outer.push([]);
    for (let r = 0; r < outer.length; r += 1) {
        if (!Array.isArray(outer[r])) outer[r] = [];
    }
}

function setIndexedVar(target, value) {
    const { baseName, indices } = target;
    if (!(baseName in vars) || !Array.isArray(vars[baseName])) {
        vars[baseName] = [];
    }

    if (indices.length === 1) {
        const i = indices[0].indexValue;
        const arr = vars[baseName];
        ensureArrayLength(arr, i + 1);
        arr[i] = value;
        changedVars.add(baseName);
        return;
    }

    const i = indices[0].indexValue;
    const j = indices[1].indexValue;
    const outer = vars[baseName];
    ensure2DOuterLength(outer, i + 1);
    const inner = outer[i];
    ensureArrayLength(inner, j + 1);
    inner[j] = value;

    // 2次元配列として矩形を保つ（行の長さを揃える）
    const width = outer.reduce((max, row) => Math.max(max, Array.isArray(row) ? row.length : 0), 0);
    for (let r = 0; r < outer.length; r += 1) {
        ensureArrayLength(outer[r], width);
    }

    changedVars.add(baseName);
}

function formatVarValue(value) {
    if (Array.isArray(value)) {
        return JSON.stringify(value);
    }

    if (typeof value === "string") {
        return `"${value}"`;
    }

    if (value === undefined) {
        return "undefined";
    }

    return String(value);
}

function escapeHtml(text) {
    return String(text)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;");
}

function renderVars() {
    const varsEl = document.getElementById("vars");
    const entries = Object.entries(vars);

    if (entries.length === 0) {
        varsEl.innerHTML = `<div class="vars-empty">まだ変数はありません</div>`;
        return;
    }

    function isRectangular2DArray(value) {
        if (!Array.isArray(value) || value.length === 0) return false;
        if (!value.every(row => Array.isArray(row))) return false;
        const width = value[0].length;
        return value.every(row => row.length === width);
    }

    function render1DArray(name, value) {
        // プログラムと同じ [20, 69, 30] の1行表記。参照中の要素だけ光らせる。
        const items = value.map((item, index) => {
            const highlightClass = highlightedArrayAccesses.has(`${name}:${index}`) ? " array-inline-cell-highlight" : "";
            return `<span class="array-inline-cell${highlightClass}">${escapeHtml(formatVarValue(item))}</span>`;
        }).join(`<span class="array-inline-sep">, </span>`);

        return `
            <div class="array-inline">
                <span class="array-inline-bracket">[</span>${items}<span class="array-inline-bracket">]</span>
            </div>
        `;
    }

    function render2DArray(name, value) {
        const height = value.length;
        const width = value[0].length;

        const header = `
            <tr class="array-var-index-row">
                <th class="array-var-cell array-var-corner-cell"></th>
                ${Array.from({ length: width }).map((_, col) => `<th class="array-var-cell">${col}</th>`).join("")}
            </tr>
        `;

        const rows = Array.from({ length: height }).map((_, row) => {
            return `
                <tr class="array-var-value-row">
                    <th class="array-var-cell array-var-row-index-cell">${row}</th>
                    ${Array.from({ length: width }).map((_, col) => {
                const highlightClass = highlightedArrayAccesses.has(`${name}:${row}:${col}`) ? " array-var-cell-highlight" : "";
                return `<td class="array-var-cell${highlightClass}">${escapeHtml(formatVarValue(value[row][col]))}</td>`;
            }).join("")}
                </tr>
            `;
        }).join("");

        return `
            <div class="array-var">
                <table class="array-var-table">
                    ${header}
                    ${rows}
                </table>
            </div>
        `;
    }

    varsEl.innerHTML = entries.map(([name, value]) => {
        const activeClass = changedVars.has(name) ? " var-card-active" : "";
        const refClass = highlightedVars.has(name) ? " var-card-ref" : "";
        const kind = Array.isArray(value) ? "配列" : "値";
        const valueHtml = Array.isArray(value)
            ? (
                isRectangular2DArray(value)
                    ? render2DArray(name, value)
                    : render1DArray(name, value)
            )
            : `<div class="var-value">${escapeHtml(formatVarValue(value))}</div>`;

        return `
            <div class="var-card${activeClass}${refClass}${Array.isArray(value) ? " var-card-array" : ""}">
                <div class="var-card-head">
                    <span class="var-name">${escapeHtml(name)}</span>
                    <span class="var-kind">${kind}</span>
                </div>
                ${valueHtml}
            </div>
        `;
    }).join("");
}

function renderExplanation() {
    const explanationEl = document.getElementById("step-explanation");

    // 図解(html)があれば図を表示し、元の文章は data-alt に残す（動画作成時に取り出せる）
    if (currentExplanationHtml) {
        explanationEl.classList.add("step-explanation-figure");
        explanationEl.setAttribute("data-alt", currentExplanation || "");
        explanationEl.setAttribute("title", currentExplanation || "");
        explanationEl.innerHTML = currentExplanationHtml;
        requestAnimationFrame(() => animateStepCard(explanationEl));
        return;
    }

    explanationEl.classList.remove("step-explanation-figure");
    explanationEl.removeAttribute("data-alt");
    explanationEl.removeAttribute("title");
    explanationEl.textContent = currentExplanation || "このステップの説明はありません。";
}

// 変数を囲む「箱」（名前が上・値が下）を描く。値の最終下端 valueBottomRel まで覆う。
// 箱が下に伸びるぶん、下の説明（note/badge）と重ならないよう row に余白を確保する。
function makeVarBox(container, row, tRect, cRect, valueBottomRel, pad = 6) {
    const boxLeft = (tRect.left - cRect.left) - pad - 8;
    const boxTop = (tRect.top - cRect.top) - pad;
    const boxWidth = tRect.width + pad * 2 + 10;
    const boxHeight = (valueBottomRel + pad) - boxTop;

    const box = document.createElement("div");
    Object.assign(box.style, {
        position: "absolute",
        left: `${boxLeft}px`,
        top: `${boxTop}px`,
        width: `${boxWidth}px`,
        height: `${boxHeight}px`,
        border: "2px solid var(--primary, #3b7ddd)",
        borderRadius: "10px",
        background: "rgba(59, 125, 221, 0.06)",
        pointerEvents: "none",
        zIndex: "1"
    });
    container.appendChild(box);

    const rowBottomRel = row.getBoundingClientRect().bottom - cRect.top;
    const extra = (boxTop + boxHeight + 6) - rowBottomRel;
    if (extra > 0) row.style.marginBottom = `${extra}px`;
    return box;
}

// ステップカードのアニメーションの振り分け。
// 2回目以降のループ（増分データを持つ）はループ用アニメ、それ以外は代入アニメ。
function animateStepCard(container) {
    if (!container) return;
    const card = container.querySelector(".step-card");
    if (card && card.classList.contains("step-card-loop") && card.dataset.loopStep !== undefined) {
        animateLoopCard(container, card);
        return;
    }
    if (card && card.classList.contains("step-card-cond")) {
        animateConditionCard(container, card);
        return;
    }
    animateAssignmentCard(container);
}

const FLYIN_DURATION = 3000;
const LOOP_ANIM_DURATION = 2800;
const COND_ANIM_DURATION = 3800;

// 条件チェックのアニメーション：左の値 → 右の値 → 演算子 を順にズーム強調し、
// それぞれの下に言葉を出す。最後に結果（true/false バッジ）をズームして強調する。
function animateConditionCard(container, card) {
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (typeof Element.prototype.animate !== "function") return;

    const row = card.querySelector(".calc-row");
    if (!row) return;
    const opEl = row.querySelector(".calc-op");
    const leftEl = row.firstElementChild;
    const rightEl = row.lastElementChild;
    if (!leftEl) return;

    const cRect = container.getBoundingClientRect();
    const D = COND_ANIM_DURATION;
    const rowBottomRel = row.getBoundingClientRect().bottom - cRect.top;
    const labelTop = rowBottomRel + 6;

    // 要素を、指定の時間帯にズーム強調する
    const zoom = (el, s, e) => {
        if (!el) return;
        el.animate([
            { transform: "scale(1)", offset: 0 },
            { transform: "scale(1)", offset: s },
            { transform: "scale(1.25)", offset: (s + e) / 2 },
            { transform: "scale(1)", offset: e },
            { transform: "scale(1)", offset: 1 }
        ], { duration: D, easing: "ease-in-out", iterations: Infinity });
    };

    // 要素の真下に、対応する言葉を その要素のズーム中だけ出す
    const labelFor = (text, el, s, e) => {
        if (!text || !el) return;
        const lab = document.createElement("span");
        lab.className = "cond-phrase";
        lab.textContent = text;
        Object.assign(lab.style, { position: "absolute", margin: "0", zIndex: "6", pointerEvents: "none", opacity: "0" });
        container.appendChild(lab);
        const er = el.getBoundingClientRect();
        lab.style.left = `${er.left + er.width / 2 - cRect.left - lab.offsetWidth / 2}px`;
        lab.style.top = `${labelTop}px`;
        const reserve = (labelTop + lab.offsetHeight + 6) - rowBottomRel;
        if (reserve > 0 && (parseFloat(row.style.marginBottom) || 0) < reserve) {
            row.style.marginBottom = `${reserve}px`;
        }
        lab.animate([
            { opacity: 0, offset: 0 },
            { opacity: 0, offset: Math.max(0, s - 0.04) },
            { opacity: 1, offset: s },
            { opacity: 1, offset: e },
            { opacity: 0, offset: Math.min(1, e + 0.05) },
            { opacity: 0, offset: 1 }
        ], { duration: D, easing: "ease-in-out", iterations: Infinity });
    };

    // ① 左の値  ② 右の値  ③ 演算子 を順にズームし、その下に言葉を出す（間隔を空けて）
    zoom(leftEl, 0.05, 0.18);
    labelFor(card.dataset.condLeft, leftEl, 0.06, 0.20);
    if (rightEl && rightEl !== leftEl) {
        zoom(rightEl, 0.30, 0.43);
        labelFor(card.dataset.condRight, rightEl, 0.31, 0.45);
    }
    zoom(opEl, 0.55, 0.68);
    // 演算子の説明は、結果が出るまで長めに出しておく
    labelFor(card.dataset.condOp, opEl, 0.56, 0.97);

    // ④ 最後に結果（true/false バッジ）をズームして強調する
    const badgeEl = card.querySelector(".result-badge");
    if (badgeEl) {
        badgeEl.style.display = "inline-block";
        badgeEl.animate([
            { transform: "scale(1)", offset: 0 },
            { transform: "scale(1)", offset: 0.80 },
            { transform: "scale(1.3)", offset: 0.88 },
            { transform: "scale(1.15)", offset: 0.93 },
            { transform: "scale(1.15)", offset: 0.97 },
            { transform: "scale(1)", offset: 1 }
        ], { duration: D, easing: "ease-in-out", iterations: Infinity });
    }
}

// ループ（2回目以降）のアニメーション：変数の箱（名前が上・値が下）で、
// 「前の値」のとなりに「+ステップ」が上から降りてきて足され、「新しい値」に変わる、を繰り返す。
//   i  +1        i           i
//   0      →    0 +1   →    1
function animateLoopCard(container, card) {
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (typeof Element.prototype.animate !== "function") return;

    const row = card.querySelector(".calc-row");
    if (!row) return;
    const target = row.querySelector(".calc-target"); // 変数名 i
    const op = row.querySelector(".calc-op");
    const valueTok = row.lastElementChild;            // 元の値トークン（= 新しい値）
    if (!target) return;

    const prevText = card.dataset.loopPrev ?? "";
    const stepNum = Number(card.dataset.loopStep);
    const curText = card.dataset.loopCurrent ?? "";
    const plusText = stepNum >= 0 ? `+${card.dataset.loopStep}` : String(card.dataset.loopStep);

    const cRect = container.getBoundingClientRect();
    const tRect = target.getBoundingClientRect();
    if (!tRect.width) return;

    const gapY = 8;
    const nameCenterX = tRect.left + tRect.width / 2 - cRect.left;
    const nameCenterY = tRect.top + tRect.height / 2 - cRect.top;
    const slotCenterY = tRect.bottom + gapY + tRect.height / 2 - cRect.top;

    // 元の「= 値」は隠して、こちらで前の値/＋ステップ/新しい値を描く
    if (op) op.style.visibility = "hidden";
    if (valueTok && valueTok !== target) valueTok.style.visibility = "hidden";

    // 変数名を箱より前面に出す
    target.style.position = "relative";
    target.style.zIndex = "3";

    const mkToken = (text, cls) => {
        const el = document.createElement("span");
        el.className = `calc-token ${cls}`;
        el.textContent = text;
        Object.assign(el.style, {
            position: "absolute", margin: "0", zIndex: "5", pointerEvents: "none"
        });
        container.appendChild(el);
        return el;
    };
    const prevEl = mkToken(prevText, "calc-result");
    const curEl = mkToken(curText, "calc-result");
    const plusEl = mkToken(plusText, "calc-token-val");

    const placeCenter = (el, cx, cy) => {
        el.style.left = `${cx - el.offsetWidth / 2}px`;
        el.style.top = `${cy - el.offsetHeight / 2}px`;
    };
    // 前の値・新しい値は、変数の真下のスロット中央に重ねて置く（クロスフェード）
    placeCenter(prevEl, nameCenterX, slotCenterY);
    placeCenter(curEl, nameCenterX, slotCenterY);

    // ＋ステップ：最初は変数名の右どなり（右上）。そこから「元の値」めがけて
    // 斜めに降りて重なる（＝元の値に足される）。
    const plusStartX = (tRect.right - cRect.left) + plusEl.offsetWidth / 2 + 8;
    const plusEndX = nameCenterX; // 前の値（元の値）の中央
    placeCenter(plusEl, plusStartX, nameCenterY);
    const dxDown = plusEndX - plusStartX;
    const dyDown = slotCenterY - nameCenterY;

    // 箱（名前の上・値が下）
    const valueBottomRel = slotCenterY + tRect.height / 2;
    const box = makeVarBox(container, row, tRect, cRect, valueBottomRel);

    const D = LOOP_ANIM_DURATION;

    // ＋ステップ：名前の右で現れる → 前の値の右へ降りる → 足されて消える
    plusEl.animate([
        { transform: "translate(0,0)", opacity: 0, offset: 0 },
        { transform: "translate(0,0)", opacity: 1, offset: 0.12 },                       // i +1
        { transform: "translate(0,0)", opacity: 1, offset: 0.34 },
        { transform: `translate(${dxDown}px, ${dyDown}px)`, opacity: 1, offset: 0.52 },  // 0 +1
        { transform: `translate(${dxDown}px, ${dyDown}px)`, opacity: 0, offset: 0.64 },  // 足されて消える
        { transform: `translate(${dxDown}px, ${dyDown}px)`, opacity: 0, offset: 1 }
    ], { duration: D, easing: "ease-in-out", iterations: Infinity });

    // 前の値：見えている → 新しい値に変わるところで消える → 次のループ用に戻す
    prevEl.animate([
        { opacity: 1, offset: 0 },
        { opacity: 1, offset: 0.52 },
        { opacity: 0, offset: 0.62 },
        { opacity: 0, offset: 0.92 },
        { opacity: 1, offset: 1 }
    ], { duration: D, iterations: Infinity });

    // 新しい値：足し終わってから現れる → しばらく表示 → 次のループ用に消す
    curEl.animate([
        { opacity: 0, offset: 0 },
        { opacity: 0, offset: 0.6 },
        { opacity: 1, offset: 0.7 },
        { opacity: 1, offset: 0.92 },
        { opacity: 0, offset: 1 }
    ], { duration: D, iterations: Infinity });

    // 新しい値になる瞬間に、箱をポンと跳ねさせる
    box.animate([
        { transform: "scale(1)", offset: 0 },
        { transform: "scale(1)", offset: 0.6 },
        { transform: "scale(1.08)", offset: 0.7 },
        { transform: "scale(1)", offset: 0.82 },
        { transform: "scale(1)", offset: 1 }
    ], { duration: D, iterations: Infinity });
}

// 代入カードのアニメーション：右側の「値」そのものが 左へ寄る → 下の行へ降りて
// 変数の下に収まり、最後は「変数名の上・値が下」の箱になって約1秒止まる、を繰り返す。
// 行の先頭トークン(.calc-target)が代入先、末尾トークンが入れる値という構造を利用する。
// 動かすのは実際の値トークンなので、transform で動かしてもカードと一緒にスクロールしてずれない。
function animateAssignmentCard(container) {
    if (!container) return;
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (typeof Element.prototype.animate !== "function") return;

    const row = [...container.querySelectorAll(".calc-row")]
        .find(r => r.querySelector(".calc-target"));
    if (!row) return;

    const target = row.querySelector(".calc-target");
    const op = row.querySelector(".calc-op");
    const value = row.lastElementChild;
    if (!value || value === target) return;

    // 値が「ラベル＋値」チップ（a = b の b/1）かどうか
    const isChip = !!value.querySelector?.(".chip-label");

    const cRect = container.getBoundingClientRect();
    const vRect = value.getBoundingClientRect();
    const tRect = target.getBoundingClientRect();
    if (!vRect.width || !tRect.width) return;

    const pad = 6;
    const gapY = 6;

    // 値は変数 goukei の真下に中央ぞろえで収まる
    const dxFinal = (tRect.left + tRect.width / 2 - vRect.width / 2) - vRect.left;
    const dy = (tRect.bottom + gapY) - vRect.top;

    // 変数を囲む箱（名前が上・値が下）。値の最終位置の下端まで覆う
    const valueBottomRel = (vRect.top - cRect.top) + dy + vRect.height;
    const box = makeVarBox(container, row, tRect, cRect, valueBottomRel, pad);

    // = は使わないので隠す（レイアウト位置は保つため visibility）
    if (op) op.style.visibility = "hidden";

    const slotCenterX = tRect.left + tRect.width / 2 - cRect.left;
    const slotCenterY = (vRect.top - cRect.top) + dy + vRect.height / 2;

    // 同じ変数の上書き代入（a = b 以外）：元の値を最初から箱の中に表示しておき、
    // 新しい値が入ってくるのに合わせて「上書き」と出して元の値を消す。
    const card = container.querySelector(".step-card");
    const prevText = card?.dataset.prevValue;
    if (!isChip && prevText !== undefined && prevText !== "") {
        // 元の値（最初から表示）
        const prevEl = document.createElement("span");
        prevEl.className = "calc-token calc-result";
        prevEl.textContent = prevText;
        Object.assign(prevEl.style, { position: "absolute", margin: "0", zIndex: "4", pointerEvents: "none" });
        container.appendChild(prevEl);
        prevEl.style.left = `${slotCenterX - prevEl.offsetWidth / 2}px`;
        prevEl.style.top = `${slotCenterY - prevEl.offsetHeight / 2}px`;

        const labelLeft = `${slotCenterX + tRect.width / 2 + pad + 6}px`;

        // 「今までの値」ラベル（元の値を表示している間、箱のすぐ右に出す）
        const prevLabelEl = document.createElement("span");
        prevLabelEl.className = "assign-prev-label";
        prevLabelEl.textContent = "今までの値";
        Object.assign(prevLabelEl.style, { position: "absolute", margin: "0", zIndex: "6", pointerEvents: "none" });
        container.appendChild(prevLabelEl);
        prevLabelEl.style.left = labelLeft;
        prevLabelEl.style.top = `${slotCenterY - prevLabelEl.offsetHeight / 2}px`;

        // 「上書き」ラベル（同じ位置に、元の値が消えるのに合わせて出す）
        const overwriteEl = document.createElement("span");
        overwriteEl.className = "assign-overwrite-label";
        overwriteEl.textContent = "上書き";
        Object.assign(overwriteEl.style, { position: "absolute", margin: "0", zIndex: "6", pointerEvents: "none", opacity: "0" });
        container.appendChild(overwriteEl);
        overwriteEl.style.left = labelLeft;
        overwriteEl.style.top = `${slotCenterY - overwriteEl.offsetHeight / 2}px`;

        // 元の値：表示 → 新しい値が入るところで消える → 次のループ用に戻す
        prevEl.animate([
            { opacity: 1, offset: 0 },
            { opacity: 1, offset: 0.4 },
            { opacity: 0, offset: 0.55 },
            { opacity: 0, offset: 0.92 },
            { opacity: 1, offset: 1 }
        ], { duration: FLYIN_DURATION, iterations: Infinity });

        // 「今までの値」：最初から表示 → 上書きの直前に消える → 次のループ用に戻す
        prevLabelEl.animate([
            { opacity: 1, offset: 0 },
            { opacity: 1, offset: 0.4 },
            { opacity: 0, offset: 0.5 },
            { opacity: 0, offset: 0.92 },
            { opacity: 1, offset: 1 }
        ], { duration: FLYIN_DURATION, iterations: Infinity });

        // 「上書き」：「今までの値」が消えた直後に出して、少し見せてから消す
        overwriteEl.animate([
            { opacity: 0, offset: 0 },
            { opacity: 0, offset: 0.5 },
            { opacity: 1, offset: 0.58 },
            { opacity: 1, offset: 0.76 },
            { opacity: 0, offset: 0.86 },
            { opacity: 0, offset: 1 }
        ], { duration: FLYIN_DURATION, iterations: Infinity });
    }

    // 値を箱の外（右）から箱の中のスロットへ入れる
    target.style.position = "relative";
    target.style.zIndex = "2";
    value.style.position = "relative";
    value.style.zIndex = "5";

    if (isChip) {
        // a = b：b/1 が外から入ってきて、到着したら消える。
        // 代わりに a の値（1）がスロットに残る。
        const valText = value.querySelector(".chip-val")?.textContent ?? "";
        const resultEl = document.createElement("span");
        resultEl.className = "calc-token calc-result";
        resultEl.textContent = valText;
        Object.assign(resultEl.style, { position: "absolute", margin: "0", zIndex: "4", pointerEvents: "none", opacity: "0" });
        container.appendChild(resultEl);
        resultEl.style.left = `${slotCenterX - resultEl.offsetWidth / 2}px`;
        resultEl.style.top = `${slotCenterY - resultEl.offsetHeight / 2}px`;

        value.animate([
            { transform: "translate(18px, -2px) scale(0.9)", opacity: 0, offset: 0 },          // 箱の外（右）
            { transform: "translate(10px, 0) scale(1)", opacity: 1, offset: 0.12 },            // 外に現れる
            { transform: `translate(${dxFinal}px, ${dy}px) scale(1)`, opacity: 1, offset: 0.45 }, // 箱に到着（b/1）
            { transform: `translate(${dxFinal}px, ${dy}px) scale(0.85)`, opacity: 0, offset: 0.6 }, // b/1 が消える
            { transform: `translate(${dxFinal}px, ${dy}px) scale(0.85)`, opacity: 0, offset: 1 }
        ], { duration: FLYIN_DURATION, easing: "ease-in-out", iterations: Infinity });

        // a の値（1）：b/1 が消えるのに合わせて現れて、そのまま残る → ループ用に消す
        resultEl.animate([
            { opacity: 0, offset: 0 },
            { opacity: 0, offset: 0.52 },
            { opacity: 1, offset: 0.62 },
            { opacity: 1, offset: 0.92 },
            { opacity: 0, offset: 1 }
        ], { duration: FLYIN_DURATION, iterations: Infinity });
    } else {
        value.animate([
            { transform: "translate(18px, -2px) scale(0.9)", opacity: 0, offset: 0 },          // 箱の外（右）
            { transform: "translate(10px, 0) scale(1)", opacity: 1, offset: 0.12 },            // 外に現れる
            { transform: `translate(${dxFinal}px, ${dy}px) scale(1)`, opacity: 1, offset: 0.45 }, // 箱の中に入って収まる
            { transform: `translate(${dxFinal}px, ${dy}px) scale(1)`, opacity: 1, offset: 0.9 },  // 約1秒そのまま止める
            { transform: `translate(${dxFinal}px, ${dy}px) scale(1)`, opacity: 0, offset: 1 }     // 消えて先頭からやり直し
        ], { duration: FLYIN_DURATION, easing: "ease-in-out", iterations: Infinity });
    }

    // 値が箱に入る瞬間に、箱をポンと跳ねさせる
    box.animate([
        { transform: "scale(1)", offset: 0 },
        { transform: "scale(1)", offset: 0.4 },
        { transform: "scale(1.08)", offset: 0.5 },
        { transform: "scale(1)", offset: 0.62 },
        { transform: "scale(1)", offset: 1 }
    ], { duration: FLYIN_DURATION, iterations: Infinity });
}

function safeEvalWithScope(expr, scope) {
    const backup = vars;
    vars = scope;
    try {
        return safeEval(expr);
    } finally {
        vars = backup;
    }
}

function isSimpleVariable(expr) {
    return /^[a-zA-Z_]\w*$/.test(expr.trim());
}

function parseSimpleArrayAccess(expr, scope) {
    const tokens = tokenize(expr.trim());
    if (tokens.length < 4) return null;
    if (!/^[a-zA-Z_]\w*$/.test(tokens[0])) return null;

    const arrayName = tokens[0];
    let pos = 1;
    const indexParts = [];

    function consumeIndex() {
        if (tokens[pos] !== "[") return null;
        pos += 1;

        let bracketDepth = 1;
        const start = pos;
        while (pos < tokens.length) {
            const t = tokens[pos];
            if (t === "[") bracketDepth += 1;
            if (t === "]") bracketDepth -= 1;
            if (bracketDepth === 0) break;
            pos += 1;
        }
        if (pos >= tokens.length || tokens[pos] !== "]") return null;
        const slice = tokens.slice(start, pos);
        pos += 1;

        const indexExpr = slice.join("").trim();
        if (!indexExpr) return null;
        const indexValue = safeEvalWithScope(indexExpr, scope);
        return { indexExpr, indexValue };
    }

    const first = consumeIndex();
    if (!first) return null;
    indexParts.push(first);

    const second = consumeIndex();
    if (second) indexParts.push(second);

    if (pos !== tokens.length) return null;

    let arrayValue = scope[arrayName];
    let itemValue = undefined;
    if (Array.isArray(arrayValue)) {
        itemValue = arrayValue[indexParts[0].indexValue];
        if (indexParts.length === 2) {
            itemValue = Array.isArray(itemValue) ? itemValue[indexParts[1].indexValue] : undefined;
        }
    }

    return {
        arrayName,
        indexExpr: indexParts[0].indexExpr,
        indexValue: indexParts[0].indexValue,
        indexExpr2: indexParts[1]?.indexExpr,
        indexValue2: indexParts[1]?.indexValue,
        itemValue
    };
}

function parseSimpleBinaryExpression(expr) {
    const tokens = tokenize(expr.trim());
    const operators = ["+", "-", "*", "/", "%"];
    let bracketDepth = 0;
    let parenDepth = 0;

    function tokensToExpr(parts) {
        return parts.join("").trim();
    }

    for (let i = 0; i < tokens.length; i += 1) {
        const token = tokens[i];

        if (token === "[") bracketDepth += 1;
        if (token === "]") bracketDepth -= 1;
        if (token === "(") parenDepth += 1;
        if (token === ")") parenDepth -= 1;

        if (bracketDepth === 0 && parenDepth === 0 && operators.includes(token)) {
            const left = tokensToExpr(tokens.slice(0, i));
            const right = tokensToExpr(tokens.slice(i + 1));

            if (!left || !right) return null;

            return {
                left,
                op: token,
                right
            };
        }
    }

    return null;
}

function isNumericConstant(expr) {
    return /^\d+(\.\d+)?$/.test(String(expr).trim());
}

function formatBoolValue(value) {
    return value ? "真(true)" : "偽(false)";
}

// 比較式（amari == 0 など）を左辺・演算子・右辺に分解する
function parseComparison(expr) {
    const comparisonOps = ["==", "!=", "<=", ">=", "<", ">"];
    const tokens = tokenize(expr.trim());
    let bracketDepth = 0;
    let parenDepth = 0;

    for (let i = 0; i < tokens.length; i += 1) {
        const token = tokens[i];

        if (token === "[") bracketDepth += 1;
        if (token === "]") bracketDepth -= 1;
        if (token === "(") parenDepth += 1;
        if (token === ")") parenDepth -= 1;

        if (bracketDepth === 0 && parenDepth === 0 && comparisonOps.includes(token)) {
            const left = tokens.slice(0, i).join("").trim();
            const right = tokens.slice(i + 1).join("").trim();
            if (!left || !right) return null;
            return { left, op: token, right };
        }
    }

    return null;
}

function comparisonPhrase(leftDesc, right, op) {
    switch (op) {
        case "==": return `${leftDesc}と${right}が同じであれば`;
        case "!=": return `${leftDesc}と${right}がちがえば`;
        case "<": return `${leftDesc}が${right}より小さければ`;
        case ">": return `${leftDesc}が${right}より大きければ`;
        case "<=": return `${leftDesc}が${right}以下であれば`;
        case ">=": return `${leftDesc}が${right}以上であれば`;
        default: return "";
    }
}

function buildConditionText(condition, conditionValue, scope) {
    const resultText = formatBoolValue(conditionValue);
    const cmp = parseComparison(condition);

    if (cmp) {
        const leftDesc = isSimpleVariable(cmp.left) ? `${cmp.left}の値` : cmp.left;
        const phrase = comparisonPhrase(leftDesc, cmp.right, cmp.op);

        if (phrase) {
            const leftValue = safeEvalWithScope(cmp.left, scope);
            // 右辺もただの定数でなければ、その値も見せる（例: maxは 20）
            const rightPart = isNumericConstant(cmp.right)
                ? ""
                : `、${cmp.right}は ${formatVarValue(safeEvalWithScope(cmp.right, scope))}`;
            return `条件 ${condition} は、${phrase} 真(true)です。${leftDesc}は ${formatVarValue(leftValue)}${rightPart} なので、${resultText} です。`;
        }
    }

    return `条件 ${condition} は、今は ${resultText} です。`;
}

// 比較記号の意味を子ども向けに説明する
function operatorMeaningNote(op) {
    switch (op) {
        case "==": return "== は「2つが 同じ」か しらべる記号";
        case "!=": return "!= は「2つが ちがう（等しくない）」か しらべる記号";
        case "<": return "< は「左が 右より 小さい」か しらべる記号";
        case ">": return "> は「左が 右より 大きい」か しらべる記号";
        case "<=": return "<= は「左が 右以下（小さいか 同じ）」か しらべる記号";
        case ">=": return ">= は「左が 右以上（大きいか 同じ）」か しらべる記号";
        default: return "";
    }
}

// 比較を、左オペランド・右オペランド・演算子の3パーツの文章に分ける。
// （b != 0 → 左「b と」/ 右「0 が」/ 演算子「等しくなければ」）
function conditionPhraseParts(cmp) {
    const L = prettyExpr(cmp.left.trim());
    const R = prettyExpr(cmp.right.trim());
    switch (cmp.op) {
        case "==": return { left: `${L} と`, right: `${R} が`, op: "等しければ" };
        case "!=": return { left: `${L} と`, right: `${R} が`, op: "等しくなければ" };
        case "<": return { left: `${L} が`, right: `${R} より`, op: "小さければ" };
        case ">": return { left: `${L} が`, right: `${R} より`, op: "大きければ" };
        case "<=": return { left: `${L} が`, right: `${R}`, op: "以下なら" };
        case ">=": return { left: `${L} が`, right: `${R}`, op: "以上なら" };
        default: return { left: "", right: "", op: "" };
    }
}

function buildConditionCardHtml(condition, conditionValue, scope) {
    const cmp = parseComparison(condition);
    const badgeClass = conditionValue ? "bool-true" : "bool-false";
    const badge = conditionValue ? "✓ 真（true）" : "✗ 偽（false）";

    const dataset = { "cond-result": conditionValue ? "true" : "false" };

    if (cmp) {
        // 各オペランドを concat-chip（ラベル＝式・値）で見せる
        const row = `${operandChip(cmp.left, scope)}${calcOp(cmp.op)}${operandChip(cmp.right, scope)}`;

        const parts = conditionPhraseParts(cmp);
        return buildStepCard({
            title: "条件をチェック",
            cardClass: "step-card-cond",
            rows: [row],
            badge,
            badgeClass,
            dataset: { ...dataset, "cond-left": parts.left, "cond-right": parts.right, "cond-op": parts.op + "真(true)" }
        });
    }

    return buildStepCard({
        title: "条件をチェック",
        cardClass: "step-card-cond",
        rows: [exprToTokensHtml(condition)],
        badge,
        badgeClass,
        dataset
    });
}

function buildConditionParts(condition, conditionValue, scope) {
    return {
        text: buildConditionText(condition, conditionValue, scope),
        html: buildConditionCardHtml(condition, conditionValue, scope),
        highlightVars: collectVarNames(condition, scope)
    };
}

function buildConditionExplanation(condition, conditionValue, scope) {
    const parts = buildConditionParts(condition, conditionValue, scope);
    return buildStepDetails(parts.text, { html: parts.html, highlightVars: parts.highlightVars });
}

// 文字列連結（a + "×" + b ...）を、トップレベルの + ごとの被演算子に分解する
function splitConcatOperands(expr) {
    const tokens = tokenize(expr.trim());
    const operands = [];
    let bracketDepth = 0;
    let parenDepth = 0;
    let current = [];

    for (const token of tokens) {
        if (token === "[") bracketDepth += 1;
        if (token === "]") bracketDepth -= 1;
        if (token === "(") parenDepth += 1;
        if (token === ")") parenDepth -= 1;

        if (token === "+" && bracketDepth === 0 && parenDepth === 0) {
            operands.push(current.join("").trim());
            current = [];
        } else {
            current.push(token);
        }
    }
    operands.push(current.join("").trim());
    return operands.filter(Boolean);
}

// 式中の * や / を、子ども向けに ×・÷ で見せる
function prettyExpr(expr) {
    return String(expr).replaceAll("*", "×").replaceAll("/", "÷");
}

function describeConcatOperand(expr) {
    const t = expr.trim();
    if ((t.startsWith('"') && t.endsWith('"')) || (t.startsWith('“') && t.endsWith('”'))) {
        return `「${t.slice(1, -1)}」`;
    }
    if (isSimpleVariable(t)) {
        return `${t}の値`;
    }
    return `${prettyExpr(t)}の値`;
}

// ─── 図解カード（案1: 図解中心）のための部品 ───────────────
function isStringLiteral(expr) {
    const t = String(expr).trim();
    // 先頭と末尾が引用符でも、中身が連結式（例: " " + x + "…"）の場合があるので、
    // トークン化して「文字列リテラル1個だけ」のときのみ true とする。
    const tokens = tokenize(t);
    return tokens.length === 1 && (tokens[0].startsWith('"') || tokens[0].startsWith('“'));
}

function stripQuotes(expr) {
    return String(expr).trim().slice(1, -1);
}

// 式に出てくる変数名（scope に存在するもの）を集めてハイライト対象にする
function collectVarNames(expr, scope) {
    const names = new Set();
    for (const token of tokenize(String(expr))) {
        if (/^[a-zA-Z_]\w*$/.test(token) && scope && Object.prototype.hasOwnProperty.call(scope, token)) {
            names.add(token);
        }
    }
    return [...names];
}

function calcToken(text, cls = "") {
    return `<span class="calc-token ${cls}">${escapeHtml(String(text))}</span>`;
}

function calcOp(symbol) {
    const pretty = { "*": "×", "/": "÷" }[symbol] || symbol;
    return `<span class="calc-op">${escapeHtml(pretty)}</span>`;
}

// 演算を子ども向けの言葉で説明する（例: 0 を 2 で わったあまり）
function opPhrase(op, leftValue, rightValue) {
    const l = formatVarValue(leftValue);
    const r = formatVarValue(rightValue);
    switch (op) {
        case "+": return `${l} と ${r} を たした`;
        case "-": return `${l} から ${r} を ひいた`;
        case "*": return `${l} と ${r} を かけた`;
        case "/": return `${l} を ${r} で わった`;
        case "%": return `${l} を ${r} で わった あまり`;
        default: return "";
    }
}

function buildStepCard({ title, rows = [], badge = "", badgeClass = "", cardClass = "", dataset = null }) {
    const rowsHtml = rows.filter(Boolean).map(r => `<div class="calc-row">${r}</div>`).join("");
    // バッジのみ表示（ノートは出さない）
    const captionHtml = badge
        ? `<div class="step-card-caption"><span class="result-badge ${badgeClass}">${badge}</span></div>`
        : "";
    const dataAttrs = dataset
        ? Object.entries(dataset).map(([k, v]) => ` data-${k}="${escapeHtml(String(v))}"`).join("")
        : "";
    return `<div class="step-card ${cardClass}"${dataAttrs}>`
        + `<div class="step-card-title">${escapeHtml(title)}</div>`
        + rowsHtml + captionHtml
        + `</div>`;
}

// 1つの被演算子（オペランド）を「表示する(結合)」と同じ concat-chip で見せる。
// 変数や配列要素は ラベル(式)＋値 のチップ、定数・文字列はそのままのトークン。
function operandChip(exprText, scope) {
    const t = String(exprText).trim();
    if (isNumericConstant(t)) {
        return calcToken(t);
    }
    if (isStringLiteral(t)) {
        return calcToken(`「${stripQuotes(t)}」`, "calc-token-str");
    }
    const value = safeEvalWithScope(t, scope);
    return `<span class="concat-chip">`
        + `<span class="chip-label">${escapeHtml(prettyExpr(t))}</span>`
        + `<span class="chip-val">${escapeHtml(formatVarValue(value))}</span>`
        + `</span>`;
}

// 1つの式を、変数/値が見えるトークン列の HTML にする（i % 2 → i % 2）
// 配列アクセス（a[i] や a[i][j]）は1つのトークンにまとめる
function exprToTokensHtml(expr) {
    const tokens = tokenize(String(expr));
    const parts = [];

    for (let i = 0; i < tokens.length; i += 1) {
        const t = tokens[i];

        if (/^[a-zA-Z_]\w*$/.test(t) && tokens[i + 1] === "[") {
            let buf = t;
            let j = i + 1;
            let depth = 0;
            while (j < tokens.length) {
                const tj = tokens[j];
                if (tj === "[") depth += 1;
                if (tj === "]") depth -= 1;
                buf += tj;
                j += 1;
                if (depth === 0 && tokens[j] !== "[") break;
            }
            parts.push(calcToken(buf));
            i = j - 1;
            continue;
        }

        if (["+", "-", "*", "/", "%"].includes(t)) parts.push(calcOp(t));
        else if (["(", ")"].includes(t)) parts.push(`<span class="calc-bracket">${escapeHtml(t)}</span>`);
        else if (isStringLiteral(t)) parts.push(calcToken(`「${stripQuotes(t)}」`, "calc-token-str"));
        else parts.push(calcToken(t));
    }

    return parts.join("");
}

// exprToTokensHtml の「値が見える」版。式の中の変数・配列要素を
// concat-chip（名前＋値、配列は a[i]→a[0]→値 の段階表示）で見せる。
// 例: (i+1)*(j+1) → ( [i/0] + 1 ) × ( [j/2] + 1 )
function exprToValueTokensHtml(expr, scope) {
    const tokens = tokenize(String(expr));
    const parts = [];

    for (let i = 0; i < tokens.length; i += 1) {
        const t = tokens[i];

        // 配列アクセス name[...] をひとかたまりにして段階表示チップに
        if (/^[a-zA-Z_]\w*$/.test(t) && tokens[i + 1] === "[") {
            let buf = t;
            let j = i + 1;
            let depth = 0;
            while (j < tokens.length) {
                const tj = tokens[j];
                if (tj === "[") depth += 1;
                if (tj === "]") depth -= 1;
                buf += tj;
                j += 1;
                if (depth === 0 && tokens[j] !== "[") break;
            }
            parts.push(operandChip(buf, scope));
            i = j - 1;
            continue;
        }

        // scope にある変数は値つきチップ、関数名など未定義の識別子はプレーン
        if (/^[a-zA-Z_]\w*$/.test(t)) {
            if (scope && Object.prototype.hasOwnProperty.call(scope, t)) {
                parts.push(operandChip(t, scope));
            } else {
                parts.push(calcToken(t));
            }
            continue;
        }

        if (["+", "-", "*", "/", "%"].includes(t)) parts.push(calcOp(t));
        else if (["(", ")"].includes(t)) parts.push(`<span class="calc-bracket">${escapeHtml(t)}</span>`);
        else if (isStringLiteral(t)) parts.push(calcToken(`「${stripQuotes(t)}」`, "calc-token-str"));
        else parts.push(calcToken(t));
    }

    return parts.join("");
}

function buildArrayAccessExplanation(access) {
    if (!access) return "";

    if (access.indexExpr2 !== undefined) {
        return `配列 ${access.arrayName}[${access.indexExpr}][${access.indexExpr2}] は、配列 ${access.arrayName} の ${access.indexValue} 行 ${access.indexValue2} 列の値です。${access.arrayName} の ${access.indexValue} 行 ${access.indexValue2} 列の値は ${formatVarValue(access.itemValue)} です。`;
    }

    return `配列 ${access.arrayName}[${access.indexExpr}] は、配列 ${access.arrayName} の ${access.indexValue} 番目の値です。${access.arrayName} の ${access.indexValue} 番目の値は ${formatVarValue(access.itemValue)} です。`;
}

function toArrayAccessKey(access) {
    if (!access) return null;
    if (access.indexExpr2 !== undefined) {
        return `${access.arrayName}:${access.indexValue}:${access.indexValue2}`;
    }
    return `${access.arrayName}:${access.indexValue}`;
}

// 第2引数は後方互換: 配列を渡すと arrayAccesses として扱う。
// オブジェクトなら { arrayAccesses, html, highlightVars } を受け取る。
// text は動画作成用に常に残し、html があれば画面では図解を表示する（text は alt 扱い）。
function buildStepDetails(text, optionsOrArrayAccesses = {}) {
    const options = Array.isArray(optionsOrArrayAccesses)
        ? { arrayAccesses: optionsOrArrayAccesses }
        : optionsOrArrayAccesses;
    return {
        text,
        html: options.html || null,
        arrayAccesses: (options.arrayAccesses || []).filter(Boolean),
        highlightVars: (options.highlightVars || []).filter(Boolean)
    };
}

function insertTraceAtCurrentPosition(ast) {
    const insertedSteps = [];
    buildTrace(ast, insertedSteps);
    trace.splice(stepIndex, 0, ...insertedSteps);
}

function assignBadge(targetName, value) {
    return `${escapeHtml(targetName)} に <b>${escapeHtml(formatVarValue(value))}</b> を入れる`;
}

function buildAssignExplanation(node, scope, result) {
    const target = parseAssignmentTarget(node.name, scope);

    // 同じ変数を上書きする代入のとき、元の値をアニメで見せるためのデータ。
    // 代入前のスコープ(varsBefore)に値があればそれが「元の値」。
    const simpleTargetName = isSimpleVariable(node.name) ? node.name.trim() : null;
    const hasPrevValue = simpleTargetName
        && scope
        && Object.prototype.hasOwnProperty.call(scope, simpleTargetName)
        && scope[simpleTargetName] !== undefined
        && !Array.isArray(scope[simpleTargetName]);
    const assignDataset = hasPrevValue
        ? { "prev-value": formatVarValue(scope[simpleTargetName]) }
        : null;

    if (target) {
        const assignedValue = result?.assignedValue ?? safeEvalWithScope(node.value, scope);
        const base = target.baseName;
        const i = target.indices[0]?.indexValue;
        const j = target.indices[1]?.indexValue;
        const key = target.indices.length === 2 ? `${base}:${i}:${j}` : `${base}:${i}`;
        const posText = target.indices.length === 2 ? `${i} 行 ${j} 列` : `${i} 番目`;
        const targetLabel = target.indices.length === 2
            ? `${base}[${target.indices[0].indexExpr}][${target.indices[1].indexExpr}]`
            : `${base}[${target.indices[0].indexExpr}]`;
        // 添字を値に解決したラベル（バッジ用）: a[i][j] → a[0][2]
        const resolvedLabel = target.indices.length === 2
            ? `${base}[${i}][${j}]`
            : `${base}[${i}]`;
        const targetText = `配列 ${targetLabel}（${posText}）`;

        // 計算式（+,-,*,/,% を含む）なら → 結果 を付ける
        const isCompound = !!parseSimpleBinaryExpression(node.value);
        const resultArrow = isCompound
            ? `<span class="calc-result-arrow">→</span>${calcToken(formatVarValue(assignedValue), "calc-result")}`
            : "";

        const html = buildStepCard({
            title: "今のステップ",
            rows: [`${calcToken(targetLabel, "calc-target")}${calcOp("=")}${exprToValueTokensHtml(node.value, scope)}${resultArrow}`],
            note: `${targetLabel} は配列 ${base} の ${posText}`,
            badge: assignBadge(resolvedLabel, assignedValue)
        });

        return buildStepDetails(
            `${targetText} に ${formatVarValue(assignedValue)} を代入しました。`,
            { arrayAccesses: [key], html, highlightVars: collectVarNames(node.value, scope) }
        );
    }

    const binary = parseSimpleBinaryExpression(node.value);

    if (binary) {
        const leftValue = safeEvalWithScope(binary.left, scope);
        const rightValue = safeEvalWithScope(binary.right, scope);
        const resultValue = result?.assignedValue ?? safeEvalWithScope(node.value, scope);
        const rightArrayAccess = parseSimpleArrayAccess(binary.right, scope);
        const rightText = rightArrayAccess
            ? (
                rightArrayAccess.indexExpr2 !== undefined
                    ? `${binary.right} は ${rightArrayAccess.arrayName}[${rightArrayAccess.indexValue}][${rightArrayAccess.indexValue2}] つまり 配列 ${rightArrayAccess.arrayName} の ${rightArrayAccess.indexValue} 行 ${rightArrayAccess.indexValue2} 列の値なので、${formatVarValue(rightValue)} です。`
                    : `${binary.right} は ${rightArrayAccess.arrayName}[${rightArrayAccess.indexValue}] つまり 配列 ${rightArrayAccess.arrayName} の ${rightArrayAccess.indexValue} 番目の値なので、${formatVarValue(rightValue)} です。`
            )
            : `${binary.right} は ${formatVarValue(rightValue)} です。`;

        let opExplanation = "";

        switch (binary.op) {
            case "*":
                opExplanation = ` (${formatVarValue(leftValue)} かける ${formatVarValue(rightValue)})`
                break;
            case "/":
                opExplanation = `(${formatVarValue(leftValue)} わる ${formatVarValue(rightValue)})`
                break;
            case "%":
                opExplanation = `(${formatVarValue(leftValue)} わる ${formatVarValue(rightValue)} のあまり)`
                break;
        }

        // 右側がただの定数（数値リテラル）のときは「2 は 2 です」のような説明を省く
        const intro = isNumericConstant(binary.right)
            ? `これを実行する前の ${binary.left} は ${formatVarValue(leftValue)} です。`
            : `これを実行する前の ${binary.left} は ${formatVarValue(leftValue)}、${rightText}`;

        const row = `${calcToken(node.name, "calc-target")}${calcOp("=")}`
            + `${exprToValueTokensHtml(node.value, scope)}`
            + `<span class="calc-result-arrow">→</span>${calcToken(formatVarValue(resultValue), "calc-result")}`;
        const html = buildStepCard({
            title: "今のステップ",
            rows: [row],
            note: opPhrase(binary.op, leftValue, rightValue),
            badge: assignBadge(node.name, resultValue),
            dataset: assignDataset
        });

        return buildStepDetails(
            `${intro} ${binary.left}${binary.op}${binary.right} は ${formatVarValue(leftValue)}${binary.op}${formatVarValue(rightValue)}${opExplanation}です。この計算結果を ${node.name} に代入します。`,
            {
                arrayAccesses: [toArrayAccessKey(rightArrayAccess)],
                html,
                highlightVars: [...collectVarNames(node.value, scope), ...(isSimpleVariable(node.name) ? [node.name.trim()] : [])]
            }
        );
    }

    const arrayAccess = parseSimpleArrayAccess(node.value, scope);
    const arrayExplanation = buildArrayAccessExplanation(arrayAccess);
    const value = result?.assignedValue ?? safeEvalWithScope(node.value, scope);
    const arrayTag = Array.isArray(value) ? "(配列)" : "";
    const highlightVars = [...collectVarNames(node.value, scope), ...(isSimpleVariable(node.name) ? [node.name.trim()] : [])];

    // 別の変数をそのまま代入したとき（例: a = b）は concat-chip で値を見せる
    if (isSimpleVariable(node.value) && !arrayAccess) {
        const row = `${calcToken(node.name, "calc-target")}${calcOp("=")}${operandChip(node.value, scope)}`;
        const html = buildStepCard({
            title: "今のステップ",
            rows: [row],
            badge: assignBadge(node.name, value),
            dataset: assignDataset
        });
        return buildStepDetails(
            `変数 ${node.name}${arrayTag} に ${node.value.trim()}の値、${formatVarValue(value)}を代入しました。`,
            { html, highlightVars }
        );
    }

    // 配列リテラルを代入（a = [20,69,...]）は中身を1つのトークンでまとめて見せる
    // 配列の要素を取り出して代入（x = a[i]）は a[i] を concat-chip で見せる
    let rowHtml;
    if (Array.isArray(value)) {
        rowHtml = `${calcToken(`${node.name}${arrayTag}`, "calc-target")}${calcOp("=")}${calcToken(formatVarValue(value))}`;
    } else {
        rowHtml = `${calcToken(`${node.name}${arrayTag}`, "calc-target")}${calcOp("=")}${operandChip(node.value, scope)}`;
    }
    const html = buildStepCard({
        title: "今のステップ",
        rows: [rowHtml],
        note: arrayAccess ? `${node.value.trim()} は配列 ${arrayAccess.arrayName} の ${arrayAccess.indexValue} 番目` : "",
        badge: Array.isArray(value)
            ? `${escapeHtml(node.name)} に <b>配列</b> を入れる`
            : assignBadge(`${node.name}${arrayTag}`, value),
        dataset: Array.isArray(value) ? null : assignDataset
    });

    return buildStepDetails(
        [
            arrayExplanation,
            `変数 ${node.name}${arrayTag} に ${formatVarValue(value)} を代入しました。`
        ].filter(Boolean).join(" "),
        { arrayAccesses: [toArrayAccessKey(arrayAccess)], html, highlightVars }
    );
}

// 連結の各パーツを「チップ」にして並べる図解
function buildConcatChip(operand, scope) {
    const t = operand.trim();
    if (isStringLiteral(t)) {
        // 「文字列」ラベルを上に出して、書いた文字をそのまま表示することを伝える
        return `<span class="concat-chip concat-chip-str">`
            + `<span class="chip-label">文字列</span>`
            + `<span class="chip-val">${escapeHtml(stripQuotes(t))}</span>`
            + `</span>`;
    }
    const v = safeEvalWithScope(t, scope);
    const label = isSimpleVariable(t) ? t : prettyExpr(t);
    return `<span class="concat-chip">`
        + `<span class="chip-label">${escapeHtml(label)}</span>`
        + `<span class="chip-val">${escapeHtml(formatVarValue(v))}</span>`
        + `</span>`;
}

function buildPrintExplanation(node, scope, result) {
    const arrayAccess = parseSimpleArrayAccess(node.value, scope);
    const arrayExplanation = buildArrayAccessExplanation(arrayAccess);
    const value = result?.printedValue ?? safeEvalWithScope(node.value, scope);

    if (isSimpleVariable(node.value)) {
        const html = buildStepCard({
            title: "表示する",
            rows: [operandChip(node.value, scope)],
            badge: `<b>${escapeHtml(formatVarValue(value))}</b> を出力`
        });
        return buildStepDetails(
            `変数 ${node.value.trim()} の値 ${formatVarValue(value)} を表示しました。`,
            { html, highlightVars: collectVarNames(node.value, scope) }
        );
    }

    // ただの文字列（連結なし）の表示は簡潔に説明する（例: "合格" を表示しました。）
    if (isStringLiteral(node.value.trim())) {
        const html = buildStepCard({
            title: "表示する",
            rows: [operandChip(node.value, scope)],
            badge: `<b>${escapeHtml(formatVarValue(value))}</b> を出力`
        });
        return buildStepDetails(
            `${node.value.trim()} を表示しました。`,
            { html, highlightVars: [] }
        );
    }

    // 文字列の連結（例: i + "×" + j + "=" + i*j）は各パーツをチップで並べて説明する
    if (typeof value === "string") {
        const operands = splitConcatOperands(node.value);
        if (operands.length >= 2) {
            const parts = operands.map(describeConcatOperand).join("と");
            const chips = operands
                .map(o => buildConcatChip(o, scope))
                .join(`<span class="concat-plus">＋</span>`);
            const html = buildStepCard({
                title: "表示する（つなげる）",
                rows: [`<span class="concat-chips">${chips}</span>`],
                badge: `「${escapeHtml(String(value))}」を出力`
            });
            return buildStepDetails(
                `${parts}を結合した、「${value}」を出力に表示しました。`,
                { html, highlightVars: collectVarNames(node.value, scope) }
            );
        }
    }

    const html = buildStepCard({
        title: "表示する",
        rows: [operandChip(node.value, scope)],
        badge: `<b>${escapeHtml(formatVarValue(value))}</b> を出力`
    });
    return buildStepDetails(
        [
            arrayExplanation,
            `${node.value} の値 ${formatVarValue(value)} を表示しました。`
        ].filter(Boolean).join(" "),
        { arrayAccesses: [toArrayAccessKey(arrayAccess)], html, highlightVars: collectVarNames(node.value, scope) }
    );
}

function buildForExplanation(node, current, end, step, isLast, start) {
    if (current === start) {
        return `繰り返しが始まりました。変数 ${node.varName} を用意します。${node.varName} は、いま何回目かを数えて繰り返しを制御するための変数です。最初の値は ${current} です。${end} まで繰り返します。`;
    }

    const previousValue = current - step;

    if (isLast) {
        return `繰り返しを続けます。${node.varName} の値は ${previousValue} でしたが、${step}ずつ増えるので次の値は ${current} です。${end} まで繰り返すので、光っているブロックの繰り返しはこれが最後です。`;
    }

    return `繰り返しを続けます。${node.varName} の値は ${previousValue} でしたが、${step}ずつ増えるので次の値は ${current} です。${end} まで繰り返すので、まだ繰り返しは続きます。`;
}

function buildForDetails(node, current, end, step, isLast, start) {
    const text = buildForExplanation(node, current, end, step, isLast, start);
    const rangeNote = `${start}〜${end} を ${step} ずつ`;

    let rows;
    let note;
    let badge;
    let dataset = null;
    if (current === start) {
        rows = [`${calcToken(node.varName, "calc-target")}${calcOp("=")}${calcToken(formatVarValue(current), "calc-result")}`];
        note = rangeNote;
        badge = `スタート (${end} まで ${step} ずつ増やす)`;
    } else {
        const previousValue = current - step;
        rows = [`${calcToken(node.varName, "calc-target")}${calcOp("=")}${calcToken(formatVarValue(current), "calc-result")}`];
        note = rangeNote;
        badge = `${end} までなので` + (isLast ? "これがさいご" : `まだつづく。${step}ずつ増やす`);
        // 2回目以降は「前の値 + ステップ → 新しい値」のアニメ用データを持たせる
        dataset = {
            "loop-prev": formatVarValue(previousValue),
            "loop-step": step,
            "loop-current": formatVarValue(current)
        };
    }

    const html = buildStepCard({
        title: "くりかえし（ループ）",
        cardClass: "step-card-loop",
        rows,
        note,
        badge,
        dataset
    });

    return buildStepDetails(text, { html, highlightVars: [node.varName] });
}

// ----------------
// 式評価（そのまま）
// ----------------
function tokenize(expr) {
    const tokens = [];
    const regex = /\s*("(?:[^"\\]|\\.)*"|“[^”]*”|乱数|切り捨て|切り上げ|四捨五入|[0-9]+(?:\.[0-9]+)?|==|!=|<=|>=|[\[\],+\-*/%()<>]|[a-zA-Z_]\w*)\s*/g;
    let match;
    while ((match = regex.exec(expr)) !== null) {
        tokens.push(match[1]);
    }
    return tokens;
}

function parseExpression(tokens) {
    let pos = 0;
    function peek() { return tokens[pos]; }
    function consume() { return tokens[pos++]; }

    function primary() {
        const t = consume();

        if (!t) throw new Error("式エラー");

        // 文字列
        if (
            (t.startsWith('"') && t.endsWith('"')) ||
            (t.startsWith('“') && t.endsWith('”'))
        ) {
            return t.slice(1, -1);
        }

        // 数値（整数/小数）
        if (/^\d+(\.\d+)?$/.test(t)) return Number(t);

        // 乱数()
        if (t === "乱数") {
            if (peek() !== "(") {
                return Math.random();
            }
            if (consume() !== "(") throw new Error("乱数のカッコ不足");
            if (consume() !== ")") throw new Error("乱数のカッコ不足");
            return Math.random();
        }

        // 切り捨て/切り上げ/四捨五入
        if (["切り捨て", "切り上げ", "四捨五入"].includes(t)) {
            if (consume() !== "(") throw new Error(`${t}のカッコ不足`);
            const value = comparison();
            if (consume() !== ")") throw new Error(`${t}のカッコ不足`);

            if (t === "切り捨て") return Math.floor(value);
            if (t === "切り上げ") return Math.ceil(value);
            return Math.round(value);
        }

        // =========================
        // 配列（完全版🔥）
        // =========================
        if (t === "[") {
            const arr = [];

            // ★ 空配列対応
            if (peek() === "]") {
                consume();
                return arr;
            }

            while (true) {

                // ★ 再帰（ネスト対応）
                arr.push(comparison());

                if (peek() === ",") {
                    consume();
                    continue;
                }

                if (peek() === "]") {
                    consume();
                    break;
                }

                // ★ 不正検出
                throw new Error("配列構文エラー");
            }

            return arr;
        }

        // =========================
        // 変数 + 添字
        // =========================
        // =========================
        // 変数 + 添字（完全修正版🔥）
        // =========================
        if (/^[a-zA-Z_]\w*$/.test(t)) {

            // ★ここ重要
            if (!(t in vars)) return 0;

            let val = vars[t];

            while (peek() === "[") {
                consume();

                const index = comparison();

                if (consume() !== "]") {
                    throw new Error("]不足");
                }

                if (!Array.isArray(val)) {
                    throw new Error("配列ではない値に添字アクセス");
                }

                val = val[index];

                if (val === undefined) return 0;
            }

            return val;
        }

        // ()
        if (t === "(") {
            const v = comparison();
            if (consume() !== ")") throw new Error("カッコ不一致");
            return v;
        }

        throw new Error("不正: " + t);
    }

    function mul() {
        let v = primary();
        while (peek() === "*" || peek() === "/" || peek() === "%") {
            const op = consume();
            const r = primary();

            if (op === "*") v *= r;
            if (op === "/") v /= r;
            if (op === "%") v %= r;
        }
        return v;
    }

    function add() {
        let v = mul();
        while (peek() === "+" || peek() === "-") {
            const op = consume();
            const r = mul();
            v = op === "+" ? v + r : v - r;
        }
        return v;
    }

    function comparison() {
        let v = add();
        while (["==", "!=", "<", ">", "<=", ">="].includes(peek())) {
            const op = consume();
            const r = add();

            if (op === "==") v = v == r;
            if (op === "!=") v = v != r;
            if (op === "<") v = v < r;
            if (op === ">") v = v > r;
            if (op === "<=") v = v <= r;
            if (op === ">=") v = v >= r;
        }
        return v;
    }

    return comparison();
}

function safeEval(expr) {
    return parseExpression(tokenize(expr));
}

// ----------------
// 正しいトレース生成（事前展開🔥）
// ----------------
function buildTrace(ast, targetTrace = trace) {
    if (targetTrace === trace && trace.length === 0 && stepIndex === 0) {
        whileIterationCounts = new Map();
    }

    for (let node of ast) {

        if (node.type === "assign") {
            targetTrace.push({
                blockId: node.blockId,
                run: () => {
                    const assignedValue = safeEval(node.value);
                    const target = parseAssignmentTarget(node.name, vars);
                    if (target) {
                        setIndexedVar(target, assignedValue);
                    } else {
                        setVar(node.name, assignedValue);
                    }
                    return { assignedValue };
                },
                getDetails: (scope, result) => buildAssignExplanation(node, scope, result)
            });
        }

        if (node.type === "print") {
            targetTrace.push({
                blockId: node.blockId,
                run: () => {
                    const val = safeEval(node.value);
                    output += (
                        Array.isArray(val)
                            ? JSON.stringify(val)
                            : val
                    ) + "\n";
                    return { printedValue: val };
                },
                getDetails: (scope, result) => buildPrintExplanation(node, scope, result)
            });
        }

        if (node.type === "if") {
            targetTrace.push({
                blockId: node.blockId,
                run: () => {
                    const conditionValue = safeEval(node.condition);
                    if (conditionValue) {
                        insertTraceAtCurrentPosition(node.body);
                    }
                    return { conditionValue };
                },
                getDetails: (scope, result) => buildConditionExplanation(node.condition, result?.conditionValue, scope)
            });
        }

        if (node.type === "ifelse") {
            targetTrace.push({
                blockId: node.blockId,
                run: () => {
                    const conditionValue = safeEval(node.condition);
                    if (conditionValue) {
                        insertTraceAtCurrentPosition(node.ifBody);
                    } else {
                        insertTraceAtCurrentPosition(node.elseBody);
                    }
                    return { conditionValue };
                },
                getDetails: (scope, result) => buildConditionExplanation(node.condition, result?.conditionValue, scope)
            });
        }

        if (node.type === "for") {
            const start = safeEval(node.start);
            const end = safeEval(node.end);
            const step = safeEval(node.step);

            for (let i = start; i <= end; i += step) {
                const current = i;
                const isLast = current + step > end;

                targetTrace.push({
                    blockId: node.blockId,
                    run: () => {
                        setVar(node.varName, current);
                        return { current };
                    },
                    getDetails: () => buildForDetails(node, current, end, step, isLast, start)
                });

                // ★ここが重要：展開する
                buildTrace(node.body, targetTrace);
            }
        }

        if (node.type === "while") {
            targetTrace.push({
                blockId: node.blockId,
                run: () => {
                    const conditionValue = safeEval(node.condition);

                    if (!conditionValue) {
                        return { conditionValue, ended: true };
                    }

                    const whileKey = node.blockId || node;
                    const nextCount = (whileIterationCounts.get(whileKey) || 0) + 1;
                    whileIterationCounts.set(whileKey, nextCount);

                    if (nextCount > MAX_WHILE_ITERATIONS_PER_BLOCK) {
                        return { conditionValue, stopped: true, iterationCount: nextCount };
                    }

                    insertTraceAtCurrentPosition([...node.body, node]);
                    return { conditionValue, continued: true, iterationCount: nextCount };
                },
                getDetails: (scope, result) => {
                    const parts = buildConditionParts(node.condition, result?.conditionValue, scope);

                    let suffix;
                    if (result?.stopped) {
                        suffix = `繰り返し回数が多すぎるため（上限 ${MAX_WHILE_ITERATIONS_PER_BLOCK} 回）停止しました。`;
                    } else if (result?.ended) {
                        suffix = `繰り返しを終了します。`;
                    } else {
                        const countText = typeof result?.iterationCount === "number" ? `（${result.iterationCount} 回目）` : "";
                        suffix = `繰り返しを続けます${countText}。`;
                    }

                    // 補足ノートはカードに出さず、説明文（data-alt/動画用）にだけ残す
                    return buildStepDetails(`${parts.text} ${suffix}`, { html: parts.html, highlightVars: parts.highlightVars });
                }
            });
        }
    }
}

// ----------------
// 即時実行（if用）
// ----------------
function executeImmediate(ast) {
    for (let node of ast) {

        if (node.type === "assign") {
            const assignedValue = safeEval(node.value);
            const target = parseAssignmentTarget(node.name, vars);
            if (target) {
                setIndexedVar(target, assignedValue);
            } else {
                setVar(node.name, assignedValue);
            }
        }

        if (node.type === "print") {
            const val = safeEval(node.value);
            output += (
                Array.isArray(val)
                    ? JSON.stringify(val)
                    : val
            ) + "\n";
        }

        if (node.type === "if") {
            if (safeEval(node.condition)) {
                executeImmediate(node.body);
            }
        }

        if (node.type === "ifelse") {
            if (safeEval(node.condition)) {
                executeImmediate(node.ifBody);
            } else {
                executeImmediate(node.elseBody);
            }
        }

        if (node.type === "for") {
            const start = safeEval(node.start);
            const end = safeEval(node.end);
            const step = safeEval(node.step);

            for (let i = start; i <= end; i += step) {
                setVar(node.varName, i);
                executeImmediate(node.body);
            }
        }

        if (node.type === "while") {
            let count = 0;
            while (safeEval(node.condition)) {
                count += 1;
                if (count > MAX_WHILE_ITERATIONS_PER_BLOCK) break;
                executeImmediate(node.body);
            }
        }
    }
}

// ----------------
// ステップ制御
// ----------------
const STEP_INTRO_TEXT = "ステップ実行を始めると、ここに今の処理の説明が表示されます。「次へ」を押してステップ実行を開始してください。";

// 「前へ」用に、ステップ実行前の状態をまるごと記録/復元する
function snapshotState() {
    return {
        vars: structuredClone(vars),
        output,
        trace: trace.slice(),
        stepIndex,
        changedVars: new Set(changedVars),
        currentExplanation,
        currentExplanationHtml,
        highlightedArrayAccesses: new Set(highlightedArrayAccesses),
        highlightedVars: new Set(highlightedVars),
        whileIterationCounts: new Map(whileIterationCounts),
        activeBlockId: document.querySelector(".step-active")?.dataset.blockId || null
    };
}

function restoreState(s) {
    vars = structuredClone(s.vars);
    output = s.output;
    trace = s.trace.slice();
    stepIndex = s.stepIndex;
    changedVars = new Set(s.changedVars);
    currentExplanation = s.currentExplanation;
    currentExplanationHtml = s.currentExplanationHtml;
    highlightedArrayAccesses = new Set(s.highlightedArrayAccesses);
    highlightedVars = new Set(s.highlightedVars);
    whileIterationCounts = new Map(s.whileIterationCounts);
    if (s.activeBlockId) {
        highlightBlock(s.activeBlockId);
    } else {
        clearStepHighlight();
    }
}

function setStepButtonsVisible(visible) {
    const prev = document.getElementById("step-prev-button");
    const next = document.getElementById("step-next-button");
    const skip = document.getElementById("step-skip-button");
    if (prev) prev.hidden = !visible;
    if (next) next.hidden = !visible;
    if (skip) skip.hidden = !visible;
}

function updateStepButtons() {
    const prev = document.getElementById("step-prev-button");
    const next = document.getElementById("step-next-button");
    if (prev) prev.disabled = stepHistory.length === 0;
    if (next) next.disabled = stepIndex >= trace.length;
}

function stepStart() {
    vars = {};
    output = "";
    trace = [];
    stepIndex = 0;
    stepHistory = [];
    changedVars = new Set();
    whileIterationCounts = new Map();
    currentExplanation = STEP_INTRO_TEXT;
    currentExplanationHtml = null;
    highlightedArrayAccesses = new Set();
    highlightedVars = new Set();
    clearStepHighlight();

    buildTrace(window.currentAST || []);
    executionActive = true;
    setStepButtonsVisible(true);   // 「次へ」「前へ」はここで初めて出す
    updateUI();
    updateStepButtons();
}

function stepNext() {
    if (stepIndex >= trace.length) return;
    stepHistory.push(snapshotState());
    runTraceStep(trace[stepIndex++]);
    updateUI();
    updateStepButtons();
}

function stepPrev() {
    if (stepHistory.length === 0) return;
    restoreState(stepHistory.pop());
    updateUI();
    updateStepButtons();
}

// プログラムが変更されたら、進行中の実行（ステップ/一括）をキャンセルして初期状態に戻す
function cancelExecution() {
    vars = {};
    output = "";
    trace = [];
    stepIndex = 0;
    stepHistory = [];
    changedVars = new Set();
    whileIterationCounts = new Map();
    currentExplanation = STEP_INTRO_TEXT;
    currentExplanationHtml = null;
    highlightedArrayAccesses = new Set();
    highlightedVars = new Set();
    executionActive = false;
    clearStepHighlight();
    setStepButtonsVisible(false);
    updateUI();

    // 問題モードなどが後片付けに使うフック（選択肢の再表示など）
    if (typeof window.onExecutionCancelled === "function") {
        window.onExecutionCancelled();
    }
}

function onProgramChanged() {
    if (executionActive) {
        cancelExecution();
    }
}

function updateUI() {
    document.getElementById("output").textContent = output;
    renderVars();
    renderExplanation();
}
