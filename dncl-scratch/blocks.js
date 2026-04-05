const workspace = document.getElementById("workspace");

// ----------------
// 削除ボタン
// ----------------
function addDeleteButton(div) {
    const btn = document.createElement("span");
    btn.textContent = "×";
    btn.className = "delete-btn";

    btn.onclick = (e) => {
        e.stopPropagation();
        div.remove();
        updateCode();
    };

    div.appendChild(btn);

    div.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        div.remove();
        updateCode();
    });
}

// ----------------
// ブロック追加
// ----------------
function addBlock(type) {
    let el;

    if (type === "assign") el = createAssignBlock();
    if (type === "print") el = createPrintBlock();
    if (type === "if") el = createIfBlock();
    if (type === "for") el = createForBlock();

    workspace.appendChild(el);
    updateCode();
}

// ----------------
// 各ブロック
// ----------------

function createAssignBlock() {
    const div = document.createElement("div");
    div.className = "block";
    div.dataset.type = "assign";

    div.innerHTML = `<input value="x"> = <input value="0">`;

    div.querySelectorAll("input").forEach(i =>
        i.addEventListener("input", updateCode)
    );

    addDeleteButton(div);
    return div;
}

function createPrintBlock() {
    const div = document.createElement("div");
    div.className = "block";
    div.dataset.type = "print";

    div.innerHTML = `表示する(<input value="x">)`;

    div.querySelector("input").addEventListener("input", updateCode);

    addDeleteButton(div);
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
    addDeleteButton(div);

    return div;
}

function createForBlock() {
    const div = document.createElement("div");
    div.className = "block for";
    div.dataset.type = "for";

    const header = document.createElement("div");
    header.innerHTML = `
    <input value="i"> を 
    <input value="1"> から 
    <input value="10"> まで 
    <input value="1"> ずつ増やしながら繰り返す:
  `;

    header.querySelectorAll("input").forEach(i =>
        i.addEventListener("input", updateCode)
    );

    const children = document.createElement("div");
    children.className = "children dropzone";

    div.appendChild(header);
    div.appendChild(children);

    enableDrop(children);
    addDeleteButton(div);

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
// AST生成
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
                body: buildAST(child)
            });
        }

        if (type === "for") {
            const inputs = node.querySelectorAll("input");
            const child = node.querySelector(".children");

            ast.push({
                type: "for",
                varName: inputs[0].value,
                start: inputs[1].value,
                end: inputs[2].value,
                step: inputs[3].value,
                body: buildAST(child)
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

        if (node.type === "for") {
            code += `${indent}${node.varName} を ${node.start} から ${node.end} まで ${node.step} ずつ増やしながら繰り返す:\n`;
            code += buildCode(node.body, indent + "  ");
        }
    });

    return code;
}

function updateCode() {
    const ast = buildAST(workspace);
    const code = buildCode(ast);

    document.getElementById("code").textContent = code;
    window.currentAST = ast;
}