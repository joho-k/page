let vars = {};
let output = "";

let trace = [];
let stepIndex = 0;
let changedVars = new Set();

function pushTraceStep(blockId, fn) {
    trace.push({
        blockId,
        run: fn
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
    step.run();
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

        return `
            <div class="var-card${activeClass}">
                <div class="var-card-head">
                    <span class="var-name">${escapeHtml(name)}</span>
                    <span class="var-kind">${kind}</span>
                </div>
                <div class="var-value">${escapeHtml(formatVarValue(value))}</div>
            </div>
        `;
    }).join("");
}

// ----------------
// 式評価（そのまま）
// ----------------
function tokenize(expr) {
    const tokens = [];
    const regex = /\s*("(?:[^"\\]|\\.)*"|“[^”]*”|[0-9]+|==|!=|<=|>=|[\[\],+\-*/%()<>]|[a-zA-Z_]\w*)\s*/g;
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
function buildTrace(ast) {
    for (let node of ast) {

        if (node.type === "assign") {
            pushTraceStep(node.blockId, () => {
                setVar(node.name, safeEval(node.value));
            });
        }

        if (node.type === "print") {
            pushTraceStep(node.blockId, () => {
                const val = safeEval(node.value);
                output += (
                    Array.isArray(val)
                        ? JSON.stringify(val)
                        : val
                ) + "\n";
            });
        }

        if (node.type === "if") {
            pushTraceStep(node.blockId, () => {
                if (safeEval(node.condition)) {
                    // ★ここで「その場で」実行ではなく
                    executeImmediate(node.body);
                }
            });
        }

        if (node.type === "ifelse") {
            pushTraceStep(node.blockId, () => {
                if (safeEval(node.condition)) {
                    executeImmediate(node.ifBody);
                } else {
                    executeImmediate(node.elseBody);
                }
            });
        }

        if (node.type === "for") {
            const start = safeEval(node.start);
            const end = safeEval(node.end);
            const step = safeEval(node.step);

            for (let i = start; i <= end; i += step) {

                pushTraceStep(node.blockId, () => {
                    setVar(node.varName, i);
                });

                // ★ここが重要：展開する
                buildTrace(node.body);
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
}
