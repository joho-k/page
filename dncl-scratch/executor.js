let vars = {};
let output = "";

let trace = [];
let stepIndex = 0;
let changedVars = new Set();
let currentExplanation = "ステップ実行を始めると、ここに今の処理の説明が表示されます。「次へ」を押してステップ実行を開始してください。";
let highlightedArrayAccesses = new Set();
let whileIterationCounts = new Map();

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
    highlightedArrayAccesses = new Set(details?.arrayAccesses || []);
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
        return `
            <div class="array-var">
                <table class="array-var-table">
                    <tr class="array-var-index-row">
                        ${value.map((_, index) => {
            const highlightClass = highlightedArrayAccesses.has(`${name}:${index}`) ? " array-var-cell-highlight" : "";
            return `<th class="array-var-cell${highlightClass}">${index}</th>`;
        }).join("")}
                    </tr>
                    <tr class="array-var-value-row">
                        ${value.map((item, index) => {
            const highlightClass = highlightedArrayAccesses.has(`${name}:${index}`) ? " array-var-cell-highlight" : "";
            return `<td class="array-var-cell${highlightClass}">${escapeHtml(formatVarValue(item))}</td>`;
        }).join("")}
                    </tr>
                </table>
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
        const kind = Array.isArray(value) ? "配列" : "値";
        const valueHtml = Array.isArray(value)
            ? (
                isRectangular2DArray(value)
                    ? render2DArray(name, value)
                    : render1DArray(name, value)
            )
            : `<div class="var-value">${escapeHtml(formatVarValue(value))}</div>`;

        return `
            <div class="var-card${activeClass}${Array.isArray(value) ? " var-card-array" : ""}">
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
    explanationEl.textContent = currentExplanation || "このステップの説明はありません。";
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

function buildStepDetails(text, arrayAccesses = []) {
    return {
        text,
        arrayAccesses: arrayAccesses.filter(Boolean)
    };
}

function insertTraceAtCurrentPosition(ast) {
    const insertedSteps = [];
    buildTrace(ast, insertedSteps);
    trace.splice(stepIndex, 0, ...insertedSteps);
}

function buildAssignExplanation(node, scope, result) {
    const target = parseAssignmentTarget(node.name, scope);

    if (target) {
        const assignedValue = result?.assignedValue ?? safeEvalWithScope(node.value, scope);
        const base = target.baseName;
        const i = target.indices[0]?.indexValue;
        const j = target.indices[1]?.indexValue;
        const key = target.indices.length === 2 ? `${base}:${i}:${j}` : `${base}:${i}`;
        const targetText = target.indices.length === 2
            ? `配列 ${base}[${target.indices[0].indexExpr}][${target.indices[1].indexExpr}]（${i} 行 ${j} 列）`
            : `配列 ${base}[${target.indices[0].indexExpr}]（${i} 番目）`;

        return buildStepDetails(
            `${targetText} に ${formatVarValue(assignedValue)} を代入しました。`,
            [key]
        );
    }

    const binary = parseSimpleBinaryExpression(node.value);

    if (binary) {
        const leftValue = safeEvalWithScope(binary.left, scope);
        const rightValue = safeEvalWithScope(binary.right, scope);
        const rightArrayAccess = parseSimpleArrayAccess(binary.right, scope);
        const rightText = rightArrayAccess
            ? (
                rightArrayAccess.indexExpr2 !== undefined
                    ? `${binary.right} は ${rightArrayAccess.arrayName}[${rightArrayAccess.indexValue}][${rightArrayAccess.indexValue2}] つまり 配列 ${rightArrayAccess.arrayName} の ${rightArrayAccess.indexValue} 行 ${rightArrayAccess.indexValue2} 列の値なので、${formatVarValue(rightValue)} です。`
                    : `${binary.right} は ${rightArrayAccess.arrayName}[${rightArrayAccess.indexValue}] つまり 配列 ${rightArrayAccess.arrayName} の ${rightArrayAccess.indexValue} 番目の値なので、${formatVarValue(rightValue)} です。`
            )
            : `${binary.right} は ${formatVarValue(rightValue)} です。`;

        let opExplanation = binary.op;

        switch (opExplanation) {
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

        return buildStepDetails(
            `これを実行する前の ${binary.left} は ${formatVarValue(leftValue)}、${rightText} ${binary.left}${binary.op}${binary.right} は ${formatVarValue(leftValue)}${binary.op}${formatVarValue(rightValue)}${opExplanation}です。この計算結果を ${node.name} に代入します。`,
            [toArrayAccessKey(rightArrayAccess)]
        );
    }

    const arrayAccess = parseSimpleArrayAccess(node.value, scope);
    const arrayExplanation = buildArrayAccessExplanation(arrayAccess);
    const value = result?.assignedValue ?? safeEvalWithScope(node.value, scope);

    return buildStepDetails(
        [
            arrayExplanation,
            `変数 ${node.name} に ${formatVarValue(value)} を代入しました。`
        ].filter(Boolean).join(" "),
        [toArrayAccessKey(arrayAccess)]
    );
}

function buildPrintExplanation(node, scope, result) {
    const arrayAccess = parseSimpleArrayAccess(node.value, scope);
    const arrayExplanation = buildArrayAccessExplanation(arrayAccess);
    const value = result?.printedValue ?? safeEvalWithScope(node.value, scope);

    if (isSimpleVariable(node.value)) {
        return buildStepDetails(`変数 ${node.value.trim()} の値 ${formatVarValue(value)} を表示しました。`);
    }

    return buildStepDetails(
        [
            arrayExplanation,
            `${node.value} の値 ${formatVarValue(value)} を表示しました。`
        ].filter(Boolean).join(" "),
        [toArrayAccessKey(arrayAccess)]
    );
}

function buildForExplanation(node, current, end, step, isLast, start) {
    if (current === start) {
        return `繰り返しが始まりました。変数 ${node.varName} を用意します。最初の値は ${current} です。${end} まで繰り返します。`;
    }

    const previousValue = current - step;

    if (isLast) {
        return `繰り返しを続けます。${node.varName} の値は ${previousValue} でしたが、${step}ずつ増えるので次の値は ${current} です。${end} まで繰り返すので、光っているブロックの繰り返しはこれが最後です。`;
    }

    return `繰り返しを続けます。${node.varName} の値は ${previousValue} でしたが、${step}ずつ増えるので次の値は ${current} です。${end} まで繰り返すので、まだ繰り返しは続きます。`;
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
                getDetails: (_scope, result) => buildStepDetails(`条件 ${node.condition} を確認しました。今は ${formatVarValue(result?.conditionValue)} です。`)
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
                getDetails: (_scope, result) => buildStepDetails(`条件 ${node.condition} を確認して、分岐を実行しました。今は ${formatVarValue(result?.conditionValue)} です。`)
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
                    getDetails: () => buildStepDetails(buildForExplanation(node, current, end, step, isLast, start))
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
                getDetails: (_scope, result) => {
                    if (result?.stopped) {
                        return buildStepDetails(
                            `条件 ${node.condition} を確認しました。今は ${formatVarValue(result?.conditionValue)} です。繰り返し回数が多すぎるため（上限 ${MAX_WHILE_ITERATIONS_PER_BLOCK} 回）停止しました。`
                        );
                    }

                    if (result?.ended) {
                        return buildStepDetails(
                            `条件 ${node.condition} を確認しました。今は ${formatVarValue(result?.conditionValue)} なので、繰り返しを終了します。`
                        );
                    }

                    const countText = typeof result?.iterationCount === "number" ? `（${result.iterationCount} 回目）` : "";
                    return buildStepDetails(
                        `条件 ${node.condition} を確認しました。今は ${formatVarValue(result?.conditionValue)} なので、繰り返しを続けます${countText}。`
                    );
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
function stepStart() {
    vars = {};
    output = "";
    trace = [];
    stepIndex = 0;
    changedVars = new Set();
    currentExplanation = "ステップ実行を始めると、ここに今の処理の説明が表示されます。「次へ」を押してステップ実行を開始してください。";
    clearStepHighlight();

    buildTrace(window.currentAST || []);
    updateUI();
}

function stepNext() {
    if (stepIndex >= trace.length) return;
    runTraceStep(trace[stepIndex++]);
    updateUI();
}

function updateUI() {
    document.getElementById("output").textContent = output;
    renderVars();
    renderExplanation();
}
