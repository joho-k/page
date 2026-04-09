let vars = {};
let output = "";

// ----------------
// トークナイザ
// ----------------
function tokenize(expr) {
    const tokens = [];
    const regex = /\s*([0-9]+|==|!=|<=|>=|[+\-*/()<>]|[a-zA-Z_]\w*)\s*/g;

    let match;
    while ((match = regex.exec(expr)) !== null) {
        tokens.push(match[1]);
    }

    return tokens;
}

// ----------------
// パーサ（再帰下降）
// ----------------
function parseExpression(tokens) {
    let pos = 0;

    function peek() {
        return tokens[pos];
    }

    function consume() {
        return tokens[pos++];
    }

    function parsePrimary() {
        const token = consume();

        if (!token) throw new Error("式エラー");

        if (/^[0-9]+$/.test(token)) {
            return Number(token);
        }

        if (/^[a-zA-Z_]\w*$/.test(token)) {
            return vars[token] ?? 0;
        }

        if (token === "(") {
            const val = parseComparison();
            if (consume() !== ")") throw new Error("カッコ不一致");
            return val;
        }

        throw new Error("不正なトークン: " + token);
    }

    function parseMulDiv() {
        let left = parsePrimary();

        while (peek() === "*" || peek() === "/") {
            const op = consume();
            const right = parsePrimary();

            if (op === "*") left *= right;
            if (op === "/") left /= right;
        }

        return left;
    }

    function parseAddSub() {
        let left = parseMulDiv();

        while (peek() === "+" || peek() === "-") {
            const op = consume();
            const right = parseMulDiv();

            if (op === "+") left += right;
            if (op === "-") left -= right;
        }

        return left;
    }

    function parseComparison() {
        let left = parseAddSub();

        while (
            ["==", "!=", "<", ">", "<=", ">="].includes(peek())
        ) {
            const op = consume();
            const right = parseAddSub();

            if (op === "==") left = left == right;
            if (op === "!=") left = left != right;
            if (op === "<") left = left < right;
            if (op === ">") left = left > right;
            if (op === "<=") left = left <= right;
            if (op === ">=") left = left >= right;
        }

        return left;
    }

    return parseComparison();
}

// ----------------
// 安全評価
// ----------------
function safeEval(expr) {
    if (!expr || typeof expr !== "string") {
        throw new Error("式が不正です");
    }

    const tokens = tokenize(expr);

    if (tokens.length === 0) {
        throw new Error("空の式");
    }

    return parseExpression(tokens);
}

// ----------------
// 実行エンジン
// ----------------
function executeAST(ast) {
    for (let node of ast) {

        if (node.type === "assign") {
            vars[node.name] = safeEval(node.value);
        }

        if (node.type === "print") {
            output += safeEval(node.value) + "\n";
        }

        if (node.type === "if") {
            if (safeEval(node.condition)) {
                executeAST(node.body);
            }
        }

        if (node.type === "ifelse") {
            if (safeEval(node.condition)) {
                executeAST(node.ifBody);
            } else {
                executeAST(node.elseBody);
            }
        }

        if (node.type === "for") {
            const start = safeEval(node.start);
            const end = safeEval(node.end);
            const step = safeEval(node.step);

            for (let i = start; i <= end; i += step) {
                vars[node.varName] = i;
                executeAST(node.body);
            }
        }
    }
}