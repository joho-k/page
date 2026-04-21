let vars = {};
let output = "";

let trace = [];
let stepIndex = 0;
let changedVars = new Set();
let currentExplanation = "ステップ実行を始めると、ここに今の処理の説明が表示されます。";
let highlightedArrayAccesses = new Set();

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

    varsEl.innerHTML = entries.map(([name, value]) => {
        const activeClass = changedVars.has(name) ? " var-card-active" : "";
        const kind = Array.isArray(value) ? "配列" : "値";
        const valueHtml = Array.isArray(value)
            ? `
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
            `
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
    const match = expr.trim().match(/^([a-zA-Z_]\w*)\[(.+)\]$/);
    if (!match) return null;

    const arrayName = match[1];
    const indexExpr = match[2].trim();
    const indexValue = safeEvalWithScope(indexExpr, scope);
    const arrayValue = scope[arrayName];
    const itemValue = Array.isArray(arrayValue) ? arrayValue[indexValue] : undefined;

    return {
        arrayName,
        indexExpr,
        indexValue,
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

    return `配列 ${access.arrayName}[${access.indexExpr}] は、配列 ${access.arrayName} の ${access.indexValue} 番目の値です。${access.arrayName} の ${access.indexValue} 番目の値は ${formatVarValue(access.itemValue)} です。`;
}

function toArrayAccessKey(access) {
    if (!access) return null;
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
    const binary = parseSimpleBinaryExpression(node.value);

    if (binary) {
        const leftValue = safeEvalWithScope(binary.left, scope);
        const rightValue = safeEvalWithScope(binary.right, scope);
        const rightArrayAccess = parseSimpleArrayAccess(binary.right, scope);
        const rightText = rightArrayAccess
            ? `${binary.right} は ${rightArrayAccess.arrayName}[${rightArrayAccess.indexValue}] つまり 配列 ${rightArrayAccess.arrayName} の ${rightArrayAccess.indexValue} 番目の値なので、${formatVarValue(rightValue)} です。`
            : `${binary.right} は ${formatVarValue(rightValue)} です。`;

        return buildStepDetails(
            `これを実行する前の ${binary.left} は ${formatVarValue(leftValue)}、${rightText} ${binary.left}${binary.op}${binary.right} は ${formatVarValue(leftValue)}${binary.op}${formatVarValue(rightValue)} です。この計算結果を ${node.name} に代入します。`,
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
    const regex = /\s*("(?:[^"\\]|\\.)*"|“[^”]*”|乱数|[0-9]+|==|!=|<=|>=|[\[\],+\-*/%()<>]|[a-zA-Z_]\w*)\s*/g;
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

        // 数値
        if (/^\d+$/.test(t)) return Number(t);

        // 乱数()
        if (t === "乱数") {
            if (consume() !== "(") throw new Error("乱数のカッコ不足");
            if (consume() !== ")") throw new Error("乱数のカッコ不足");
            return Math.random();
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
    for (let node of ast) {

        if (node.type === "assign") {
            targetTrace.push({
                blockId: node.blockId,
                run: () => {
                    const assignedValue = safeEval(node.value);
                    setVar(node.name, assignedValue);
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
    }
}

// ----------------
// 即時実行（if用）
// ----------------
function executeImmediate(ast) {
    for (let node of ast) {

        if (node.type === "assign") {
            setVar(node.name, safeEval(node.value));
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
    currentExplanation = "ステップ実行を始めると、ここに今の処理の説明が表示されます。";
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
