const workspace = document.getElementById("workspace");

// ----------------
// ブロック追加
// ----------------
function addBlock(type) {
    let el;

    if (type === "assign") {
        el = createAssignBlock();
    }

    if (type === "print") {
        el = createPrintBlock();
    }

    if (type === "if") {
        el = createIfBlock();
    }

    workspace.appendChild(el);
    updateCode();
}

// ----------------
// 各ブロック
// ----------------

// 代入
function createAssignBlock() {
    const div = document.createElement("div");
    div.className = "block";
    div.dataset.type = "assign";

    div.innerHTML = `
    <input value="x"> = <input value="0">
  `;

    div.querySelectorAll("input").forEach(input => {
        input.addEventListener("input", updateCode);
    });

    return div;
}

// 表示
function createPrintBlock() {
    const div = document.createElement("div");
    div.className = "block";
    div.dataset.type = "print";

    div.innerHTML = `
    表示する(<input value="x">)
  `;

    div.querySelector("input").addEventListener("input", updateCode);

    return div;
}

// if（条件入力🔥）
function createIfBlock() {
    const div = document.createElement("div");
    div.className = "block if";
    div.dataset.type = "if";

    const header = document.createElement("div");
    header.innerHTML = `
    もし <input value="x > 0"> ならば:
  `;

    const input = header.querySelector("input");
    input.addEventListener("input", updateCode);

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
// コード生成（再帰🔥）
// ----------------
function buildCode(container, indent = "") {
    let code = "";

    container.childNodes.forEach(node => {
        if (!node.classList) return;

        const type = node.dataset.type;

        if (type === "assign") {
            const inputs = node.querySelectorAll("input");
            code += `${indent}${inputs[0].value} = ${inputs[1].value}\n`;
        }

        if (type === "print") {
            const input = node.querySelector("input");
            code += `${indent}表示する(${input.value})\n`;
        }

        if (type === "if") {
            const cond = node.querySelector("input").value;
            code += `${indent}もし ${cond} ならば:\n`;

            const child = node.querySelector(".children");
            code += buildCode(child, indent + "  ");
        }
    });

    return code;
}

function updateCode() {
    const code = buildCode(workspace);
    document.getElementById("code").value = code;
}