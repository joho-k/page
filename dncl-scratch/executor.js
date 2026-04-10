// =========================
// 状態
// =========================
let vars = {};
let output = "";

// ステップ
let trace = [];
let stepIndex = 0;

// =========================
// トークナイザ
// =========================
function tokenize(expr) {
    const tokens = [];
    const regex = /\s*([0-9]+|==|!=|<=|>=|[+\-*/()<>]|[a-zA-Z_]\w*)\s*/g;

    let match;
    while ((match = regex.exec(expr)) !== null) {
        tokens.push(match[1]);
    }

    return tokens;
}

// =========================
// パーサ
// =========================
function parseExpression(tokens) {
    let pos = 0;

    function peek() { return tokens[pos]; }
    function consume() { return tokens[pos++]; }

    function primary() {
        const t = consume();
        if (!t) throw new Error("式エラー");

        if (/^\d+$/.test(t)) return Number(t);
        if (/^[a-zA-Z_]\w*$/.test(t)) return vars[t] ?? 0;

        if (t === "(") {
            const v = comparison();
            if (consume() !== ")") throw new Error("カッコ不一致");
            return v;
        }

        throw new Error("不正: " + t);
    }

    function mul() {
        let v = primary();
        while (peek() === "*" || peek() === "/") {
            const op = consume();
            const r = primary();
            v = op === "*" ? v * r : v / r;
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
    const tokens = tokenize(expr);
    return parseExpression(tokens);
}

// =========================
// トレース生成（ここが本質🔥）
// =========================
function buildTrace(ast) {
    for (let node of ast) {

        // 代入
        if (node.type === "assign") {
            trace.push(() => {
                vars[node.name] = safeEval(node.value);
            });
        }

        // 表示
        if (node.type === "print") {
            trace.push(() => {
                output += safeEval(node.value) + "\n";
            });
        }

        // if
        if (node.type === "if") {
            trace.push(() => {
                node._cond = safeEval(node.condition);
            });

            trace.push(() => {
                if (node._cond) {
                    buildTrace(node.body);
                }
            });
        }

        // if-else
        if (node.type === "ifelse") {
            trace.push(() => {
                node._cond = safeEval(node.condition);
            });

            trace.push(() => {
                if (node._cond) {
                    buildTrace(node.ifBody);
                } else {
                    buildTrace(node.elseBody);
                }
            });
        }

        // for
        if (node.type === "for") {
            trace.push(() => {
                node._i = safeEval(node.start);
                node._end = safeEval(node.end);
                node._step = safeEval(node.step);
            });

            trace.push(() => loopTrace(node));
        }
    }
}

// =========================
// forのループ展開
// =========================
function loopTrace(node) {
    if (node._i > node._end) return;

    vars[node.varName] = node._i;

    // 本体
    buildTrace(node.body);

    node._i += node._step;

    // 次のループも予約
    trace.push(() => loopTrace(node));
}

// =========================
// ステップ操作
// =========================
function stepStart() {
    vars = {};
    output = "";
    trace = [];
    stepIndex = 0;

    buildTrace(window.currentAST || []);
    updateUI();
}

function stepNext() {
    if (stepIndex >= trace.length) return;

    trace[stepIndex++]();
    updateUI();
}

// =========================
// UI更新
// =========================
function updateUI() {
    document.getElementById("output").textContent = output;
    document.getElementById("vars").textContent =
        JSON.stringify(vars, null, 2);
}

// =========================
// 通常実行
// =========================
function run() {
    vars = {};
    output = "";

    buildTrace(window.currentAST || []);

    while (trace.length > 0) {
        const fn = trace.shift();
        fn();
    }

    updateUI();
}