let vars = {};
let output = "";

function evaluate(expr) {
    return Function(...Object.keys(vars), `return ${expr}`)(...Object.values(vars));
}

function executeAST(ast) {
    for (let node of ast) {

        if (node.type === "assign") {
            vars[node.name] = evaluate(node.value);
        }

        if (node.type === "print") {
            output += evaluate(node.value) + "\n";
        }

        if (node.type === "if") {
            if (evaluate(node.condition)) {
                executeAST(node.body);
            }
        }

        // ★for追加
        if (node.type === "for") {
            const start = evaluate(node.start);
            const end = evaluate(node.end);
            const step = evaluate(node.step);

            for (let i = start; i <= end; i += step) {
                vars[node.varName] = i;
                executeAST(node.body); // ← ネスト実行🔥
            }
        }
    }
}