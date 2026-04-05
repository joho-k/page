const workspace = document.getElementById("workspace");

// ----------------
// ブロック追加
// ----------------
function addBlock(type) {
    let el;

    if (type === "assign") el = createAssignBlock();
    if (type === "print") el = createPrintBlock();
    if (type === "if") el = createIfBlock();

    workspace.appendChild(el);
    updateCode();
}

// ----------------
// ブロック定義
// ----------------

function createAssignBlock() {
    const div = document.createElement("div");
    div.className = "block";
    div.dataset.type = "assign";

    div.innerHTML = `<input value="x"> = <input value="0">`;

    div.querySelectorAll("input").forEach(i =>
        i.addEventListener("input", updateCode)
    );

    return div;
}

function createPrintBlock() {
    const div = document.createElement("div");
    div.className = "block";
    div.dataset.type = "print";

    div.innerHTML = `表示する(<input value="x">)`;

    div.querySelector("input").addEventListener("input", updateCode);

    return div;
}

function createIfBlock() {
    const div = document.createElement("div");
    div.className = "block if";
    div.dataset.type = "if";

    const header = document.createElement("div");
    header.innerHTML = `もし <input value="x > 0"> ならば:`;

    header.querySelector("input").addEventListener("input", updateCode);

    const children = document.createElement("div");
    children.className = "children dropzone";

    div.appendChild(header);
    div.appendChild(children);

    enableDrop(children);

    return div;
}

// ----------------
// ドラッグ
// ----------------
function enableDrop(el) {
    new Sortable(el, {
        group: "shared",
        animation: 150,
        onSort: updateCode
    });
}

enableDrop(workspace);

// ----------------
// AST生成（超重要🔥）
// ----------------

function buildAST(container) {
    const ast = [];

    container.childNodes.forEach(node => {
        if (!node.classList) return;

        const type = node.dataset.type;

        if (type === "assign") {
            const inputs = node.querySelectorAll("input");
            ast.push({
                type: "assign",
                name: inputs[0].value,
                value: inputs[1].value
            });
        }

        if (type === "print") {
            const input = node.querySelector("input");
            ast.push({
                type: "print",
                value: input.value
            });
        }

        if (type === "if") {
            const cond = node.querySelector("input").value;
            const child = node.querySelector(".children");

            ast.push({
                type: "if",
                condition: cond,
                body: buildAST(child) // ← 再帰🔥
            });
        }
    });

    return ast;
}

// ----------------
// コード表示
// ----------------
function buildCode(ast, indent = "") {
    let code = "";

    ast.forEach(node => {
        if (node.type === "assign") {
            code += `${indent}${node.name} = ${node.value}\n`;
        }

        if (node.type === "print") {
            code += `${indent}表示する(${node.value})\n`;
        }

        if (node.type === "if") {
            code += `${indent}もし ${node.condition} ならば:\n`;
            code += buildCode(node.body, indent + "  ");
        }
    });

    return code;
}

function updateCode() {
    const ast = buildAST(workspace);
    const code = buildCode(ast);

    document.getElementById("code").textContent = code;

    window.currentAST = ast; // ★ 実行用
}