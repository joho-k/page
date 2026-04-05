const workspace = document.getElementById("workspace");

// ----------------
// 入力幅自動調整 ★追加
// ----------------
function autoResizeInput(input) {
    const resize = () => {
        input.style.width = (input.value.length + 1) + "ch";
    };

    input.addEventListener("input", () => {
        resize();
        updateCode();
    });

    resize();
}

// ----------------
// 削除
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
}

// ----------------
// 追加
// ----------------
function addBlock(type) {
    let el;

    if (type === "assign") el = createAssignBlock();
    if (type === "print") el = createPrintBlock();
    if (type === "if") el = createIfBlock();
    if (type === "ifelse") el = createIfElseBlock();
    if (type === "for") el = createForBlock();

    workspace.appendChild(el);
    updateCode();
}

// ----------------
// 代入
// ----------------
function createAssignBlock() {
    const div = document.createElement("div");
    div.className = "block";
    div.dataset.type = "assign";

    div.innerHTML = `<input value="x"> = <input value="0">`;

    div.querySelectorAll("input").forEach(autoResizeInput);

    addDeleteButton(div);
    return div;
}

// ----------------
// 表示
// ----------------
function createPrintBlock() {
    const div = document.createElement("div");
    div.className = "block";
    div.dataset.type = "print";

    div.innerHTML = `表示する(<input value="x">)`;

    autoResizeInput(div.querySelector("input"));

    addDeleteButton(div);
    return div;
}

// ----------------
// if
// ----------------
function createIfBlock() {
    const div = document.createElement("div");
    div.className = "block if";
    div.dataset.type = "if";

    div.innerHTML = `
    もし <input value="x > 0"> ならば:
    <div class="children dropzone"></div>
  `;

    autoResizeInput(div.querySelector("input"));
    enableDrop(div.querySelector(".children"));

    addDeleteButton(div);
    return div;
}

// ----------------
// if-else
// ----------------
function createIfElseBlock() {
    const div = document.createElement("div");
    div.className = "block ifelse";
    div.dataset.type = "ifelse";

    div.innerHTML = `
    もし <input value="x > 0"> ならば:
    <div class="children dropzone if-body"></div>

    <div class="else-area">
      そうでなければ:
      <div class="children dropzone else-body"></div>
    </div>
  `;

    autoResizeInput(div.querySelector("input"));

    enableDrop(div.querySelector(".if-body"));
    enableDrop(div.querySelector(".else-body"));

    addDeleteButton(div);
    return div;
}

// ----------------
// for
// ----------------
function createForBlock() {
    const div = document.createElement("div");
    div.className = "block for";
    div.dataset.type = "for";

    div.innerHTML = `
    <input value="i"> を 
    <input value="1"> から 
    <input value="10"> まで 
    <input value="1"> ずつ増やしながら繰り返す:
    <div class="children dropzone"></div>
  `;

    div.querySelectorAll("input").forEach(autoResizeInput);

    enableDrop(div.querySelector(".children"));

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
// AST
// ----------------
function buildAST(container) {
    const ast = [];

    container.childNodes.forEach(node => {
        if (!node.classList) return;

        const type = node.dataset.type;

        if (type === "assign") {
            const i = node.querySelectorAll("input");
            ast.push({ type, name: i[0].value, value: i[1].value });
        }

        if (type === "print") {
            ast.push({ type, value: node.querySelector("input").value });
        }

        if (type === "if") {
            ast.push({
                type,
                condition: node.querySelector("input").value,
                body: buildAST(node.querySelector(".children"))
            });
        }

        if (type === "ifelse") {
            ast.push({
                type,
                condition: node.querySelector("input").value,
                ifBody: buildAST(node.querySelector(".if-body")),
                elseBody: buildAST(node.querySelector(".else-body"))
            });
        }

        if (type === "for") {
            const i = node.querySelectorAll("input");

            ast.push({
                type,
                varName: i[0].value,
                start: i[1].value,
                end: i[2].value,
                step: i[3].value,
                body: buildAST(node.querySelector(".children"))
            });
        }
    });

    return ast;
}

// ----------------
// コード生成
// ----------------
function buildCode(ast, indent = "") {
    let code = "";

    ast.forEach(node => {

        if (node.type === "assign")
            code += `${indent}${node.name} = ${node.value}\n`;

        if (node.type === "print")
            code += `${indent}表示する(${node.value})\n`;

        if (node.type === "if")
            code += `${indent}もし ${node.condition} ならば:\n` +
                buildCode(node.body, indent + "  ");

        if (node.type === "ifelse")
            code += `${indent}もし ${node.condition} ならば:\n` +
                buildCode(node.ifBody, indent + "  ") +
                `${indent}そうでなければ:\n` +
                buildCode(node.elseBody, indent + "  ");

        if (node.type === "for")
            code += `${indent}${node.varName} を ${node.start} から ${node.end} まで ${node.step} ずつ増やしながら繰り返す:\n` +
                buildCode(node.body, indent + "  ");
    });

    return code;
}

function updateCode() {
    const ast = buildAST(workspace);
    document.getElementById("code").textContent = buildCode(ast);
    window.currentAST = ast;
}