const workspace = document.getElementById("workspace");

// ----------------
// プレースホルダー
// ----------------
function updatePlaceholder(container) {
    const hasBlock = Array.from(container.children)
        .some(el => el.classList.contains("block"));

    let ph = container.querySelector(".placeholder");

    if (!hasBlock && !ph) {
        ph = document.createElement("div");
        ph.className = "placeholder";
        ph.textContent = "ここに処理を入れてください";
        container.appendChild(ph);
    }

    if (hasBlock && ph) ph.remove();
}

// ----------------
// 入力幅
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
    if (type === "array") el = createArrayBlock();
    if (type === "expr") el = createExprBlock();

    workspace.appendChild(el);
    updateCode();
}

// ----------------
// 配列ブロック ★
// ----------------
function createArrayBlock() {
    const div = document.createElement("div");
    div.className = "block";
    div.dataset.type = "array";

    div.innerHTML = `
<input value="a"> = [
  <span class="array-items"></span>
  <button class="add-item">＋</button>
]
`;

    const items = div.querySelector(".array-items");
    const addBtn = div.querySelector(".add-item");

    function addItem(val = "0") {
        const item = document.createElement("div");
        item.className = "array-item";

        const input = document.createElement("input");
        input.value = val;
        autoResizeInput(input);
        input.addEventListener("blur", () => {
            if (input.value.trim() === "") {
                item.remove();
                updateCode();
            }
        });

        item.appendChild(input);
        items.appendChild(item);
        updateCode();
    }

    addBtn.onclick = () => addItem();

    addItem(); // 初期1個

    autoResizeInput(div.querySelector("input"));

    addDeleteButton(div);
    return div;
}

function createExprBlock() {
    const div = document.createElement("div");
    div.className = "block expr";
    div.dataset.type = "expr";

    div.innerHTML = `
      <input value="x">
      <select>
        <option value="+">＋</option>
        <option value="-">－</option>
        <option value="*">×</option>
        <option value="/">÷</option>
        <option value="%">あまり</option>
      </select>
      <input value="1">
    `;

    const inputs = div.querySelectorAll("input");
    inputs.forEach(autoResizeInput);

    div.querySelector("select").addEventListener("change", updateCode);

    addDeleteButton(div);
    return div;
}

// ----------------
// 既存ブロック
// ----------------
function createAssignBlock() {
    const div = document.createElement("div");
    div.className = "block";
    div.dataset.type = "assign";

    div.innerHTML = `
      <div class="assign-inline">
        <input value="x"> =
        <div class="children dropzone expr-zone"></div>
      </div>
    `;

    const zone = div.querySelector(".expr-zone");

    autoResizeInput(div.querySelector("input"));
    enableDrop(zone, { onlyExpr: true, singleBlock: true });

    updatePlaceholder(zone);

    addDeleteButton(div);
    return div;
}

function createPrintBlock() {
    const div = document.createElement("div");
    div.className = "block";
    div.dataset.type = "print";

    div.innerHTML = `
      表示する(
        <input value="x">
      )
    `;

    autoResizeInput(div.querySelector("input"));

    addDeleteButton(div);
    return div;
}

function createIfBlock() {
    const div = document.createElement("div");
    div.className = "block if";
    div.dataset.type = "if";

    div.innerHTML = `
    もし <input value="x > 0"> ならば:
    <div class="children dropzone"></div>
  `;

    const child = div.querySelector(".children");

    autoResizeInput(div.querySelector("input"));
    enableDrop(child);

    updatePlaceholder(child);
    addDeleteButton(div);
    return div;
}

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

    const ifBody = div.querySelector(".if-body");
    const elseBody = div.querySelector(".else-body");

    autoResizeInput(div.querySelector("input"));

    enableDrop(ifBody);
    enableDrop(elseBody);

    updatePlaceholder(ifBody);
    updatePlaceholder(elseBody);

    addDeleteButton(div);
    return div;
}

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

    const child = div.querySelector(".children");

    div.querySelectorAll("input").forEach(autoResizeInput);

    enableDrop(child);
    updatePlaceholder(child);

    addDeleteButton(div);
    return div;
}

// ----------------
// ドラッグ
// ----------------
function enableDrop(el, options = {}) {
    new Sortable(el, {
        group: {
            name: "shared",
            put: (_to, _from, dragged) => {
                if (options.onlyExpr && dragged.dataset.type !== "expr") {
                    return false;
                }

                if (options.singleBlock) {
                    const blocks = Array.from(el.children)
                        .filter(child => child.classList && child.classList.contains("block"));

                    if (blocks.length > 0 && !blocks.includes(dragged)) {
                        return false;
                    }
                }

                return true;
            }
        },
        animation: 150,
        onSort: () => {
            updatePlaceholder(el);
            updateCode();
        }
    });
}
enableDrop(workspace);

// ----------------
// AST（配列対応）
// ----------------
function buildAST(container) {
    const ast = [];

    container.childNodes.forEach(node => {
        if (!node.classList) return;

        const type = node.dataset.type;

        if (type === "array") {
            const name = node.querySelector("input").value;

            const values = Array.from(
                node.querySelectorAll(".array-items input")
            )
                .map(i => i.value.trim())
                .filter(Boolean);

            ast.push({
                type: "assign",
                name,
                value: `[${values.join(",")}]`
            });
        }

        if (type === "assign") {

            const name = node.querySelector("input").value;

            const exprZone = node.querySelector(".expr-zone");

            const child = exprZone.querySelector(".block");

            if (child) {
                ast.push({
                    type,
                    name,
                    value: buildExpression(child)
                });
            } else {
                ast.push({
                    type,
                    name,
                    value: "0"
                });
            }
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

        if (type === "expr") {
            const i = node.querySelectorAll("input");
            const op = node.querySelector("select").value;

            ast.push({
                type: "expr",
                left: i[0].value,
                op,
                right: i[1].value
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

        if (node.type === "expr")
            code += `${indent}${node.left} ${node.op} ${node.right}\n`;
    });

    return code;
}

function buildExpression(node) {

    const type = node.dataset.type;

    if (type === "expr") {
        const i = node.querySelectorAll("input");
        const op = node.querySelector("select").value;

        return `${i[0].value} ${op} ${i[1].value}`;
    }

    if (type === "assign") {
        return node.querySelectorAll("input")[1].value;
    }

    return "0";
}

function updateCode() {
    const ast = buildAST(workspace);
    document.getElementById("code").textContent = buildCode(ast);

    document.querySelectorAll(".children").forEach(updatePlaceholder);

    window.currentAST = ast;
}
