let vars = {};
let output = "";

function evaluate(expr) {
    return Function(...Object.keys(vars), `return ${expr}`)(...Object.values(vars));
}

function executeAST(ast) {
    for (let node of ast) {

        if (node.type === "assign")
            vars[node.name] = evaluate(node.value);

        if (node.type === "print")
            output += evaluate(node.value) + "\n";

        if (node.type === "if") {
            if (evaluate(node.condition)) {
                executeAST(node.body);
            }
        }

        if (node.type === "ifelse") {
            if (evaluate(node.condition)) {
                executeAST(node.ifBody);
            } else {
                executeAST(node.elseBody);
            }
        }

        if (node.type === "for") {
            for (
                let i = evaluate(node.start);
                i <= evaluate(node.end);
                i += evaluate(node.step)
            ) {
                vars[node.varName] = i;
                executeAST(node.body);
            }
        }
    }
}