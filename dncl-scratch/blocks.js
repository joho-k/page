const workspace = document.getElementById("workspace");
let programViewMode = "block";
let blockIdCounter = 0;
let activePaletteButton = null;
let palettePreviewVisible = true;

const BLOCK_PREVIEWS = {
    assign: {
        title: "代入",
        code: `x = 0`,
        text: "変数に値や計算結果を入れます。右側には直接入力も、計算ブロックの配置もできます。"
    },
    print: {
        title: "表示",
        code: `表示する(x)`,
        text: "変数や計算結果を出力します。"
    },
    if: {
        title: "もし",
        code: `もし x > 0 ならば:\n  表示する(x)`,
        text: "条件が正しいときだけ中の処理を実行します。"
    },
    ifelse: {
        title: "もし＋そうでなければ",
        code: `もし x > 0 ならば:\n  表示する("正")\nそうでなければ:\n  表示する("負か0")`,
        text: "条件によって2通りの処理を使い分けます。"
    },
    for: {
        title: "繰り返し",
        code: `i を 1 から 5 まで 1 ずつ増やしながら繰り返す:\n  表示する(i)`,
        text: "回数を決めて、同じ処理を何度も行います。"
    },
    while: {
        title: "繰り返し（条件）",
        code: `x < 10 の間繰り返す:\n  x = x + 1`,
        text: "条件が正しい間、同じ処理を繰り返します。"
    },
    array: {
        title: "配列",
        code: `a = [1, 2, 3]`,
        text: "複数の値をまとめて扱います。行を増やすと2次元配列（表）になります。"
    },
    expr: {
        title: "計算",
        code: `例: x + 1`,
        text: "足し算の他に、引き算、掛け算、割り算、あまりを作れます。"
    },
    random: {
        title: "乱数",
        code: `乱数()`,
        text: "0以上1未満のランダムな値を作れます。"
    },
    floor: {
        title: "切り捨て",
        code: `切り捨て(3.9)`,
        text: "小数を切り捨てて整数にします。"
    },
    ceil: {
        title: "切り上げ",
        code: `切り上げ(3.1)`,
        text: "小数を切り上げて整数にします。"
    },
    round: {
        title: "四捨五入",
        code: `四捨五入(3.5)`,
        text: "小数を四捨五入して整数にします。"
    }
};

function isTouchLikeDevice() {
    return window.matchMedia("(hover: none), (pointer: coarse)").matches;
}

function renderPalettePreview(type = null) {
    const previewEl = document.getElementById("palette-preview-content");
    const previewWrapEl = document.getElementById("palette-preview");

    previewWrapEl.classList.toggle("palette-preview-hidden", !palettePreviewVisible);

    if (!palettePreviewVisible) {
        return;
    }

    if (!type || !BLOCK_PREVIEWS[type]) {
        previewEl.innerHTML = "ブロックにマウスを重ねると説明が表示されます。スマホでは1回目のタップで説明表示・2回目のタップでブロックが追加されます。";
        return;
    }

    const preview = BLOCK_PREVIEWS[type];
    previewEl.innerHTML = `
        <strong>${preview.title}</strong>
        <pre>${preview.code}</pre>
        <div>${preview.text}</div>
    `;
}

function setActivePaletteButton(button) {
    document.querySelectorAll(".palette-block-button")
        .forEach(el => el.classList.remove("palette-block-button-active"));

    activePaletteButton = button;

    if (button) {
        palettePreviewVisible = true;
        button.classList.add("palette-block-button-active");
        renderPalettePreview(button.dataset.blockType);
    } else {
        renderPalettePreview(null);
    }
}

function setupPaletteButtons() {
    const buttons = document.querySelectorAll(".palette-block-button");

    buttons.forEach((button) => {
        const type = button.dataset.blockType;

        button.addEventListener("mouseenter", () => {
            if (isTouchLikeDevice()) return;
            setActivePaletteButton(button);
        });

        button.addEventListener("focus", () => {
            setActivePaletteButton(button);
        });

        button.addEventListener("click", (event) => {
            event.preventDefault();

            if (isTouchLikeDevice()) {
                if (activePaletteButton !== button) {
                    setActivePaletteButton(button);
                    return;
                }
            }

            addBlock(type);
            setActivePaletteButton(button);
        });
    });

    const palette = document.querySelector(".palette");
    palette.addEventListener("mouseleave", () => {
        if (isTouchLikeDevice()) return;
        setActivePaletteButton(null);
    });
}

function hidePalettePreview() {
    palettePreviewVisible = false;
    renderPalettePreview(activePaletteButton?.dataset.blockType || null);
}

function setProgramView(mode) {
    const workspacePanel = document.getElementById("workspace-panel");
    const codePanel = document.getElementById("code-panel");
    const blockButton = document.getElementById("view-block-button");
    const codeButton = document.getElementById("view-code-button");
    if (!workspacePanel || !codePanel || !blockButton || !codeButton) return;

    programViewMode = mode;
    const showBlock = mode === "block";
    workspacePanel.classList.toggle("program-panel-hidden", !showBlock);
    codePanel.classList.toggle("program-panel-hidden", showBlock);
    blockButton.classList.toggle("program-view-button-active", showBlock);
    codeButton.classList.toggle("program-view-button-active", !showBlock);
}

function setupProgramViewSwitch() {
    const blockButton = document.getElementById("view-block-button");
    const codeButton = document.getElementById("view-code-button");
    if (!blockButton || !codeButton) return;

    blockButton.addEventListener("click", () => setProgramView("block"));
    codeButton.addEventListener("click", () => setProgramView("code"));
    setProgramView(programViewMode);
}

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
        if (input.classList.contains("assign-value")) {
            input.style.width = "100%";
            return;
        }

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

function assignBlockId(div) {
    blockIdCounter += 1;
    div.dataset.blockId = `block-${blockIdCounter}`;
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
    if (type === "while") el = createWhileBlock();
    if (type === "array") el = createArrayBlock();
    if (type === "expr") el = createExprBlock();
    if (type === "random") el = createRandomBlock();
    if (type === "floor") el = createRoundingBlock("floor");
    if (type === "ceil") el = createRoundingBlock("ceil");
    if (type === "round") el = createRoundingBlock("round");

    workspace.appendChild(el);
    updateCode();

    if (type === "array") {
        setSelectedArrayBlock(el);
    }
}

function setInputValue(input, value) {
    input.value = value;
    input.dispatchEvent(new Event("input"));
}

function setArray1DValues(arrayBlock, values) {
    const ops = arrayBlock.arrayOps;
    if (!ops) return;

    // 行は1行にする
    while (ops.removeRow()) { }

    const rowItems = arrayBlock.querySelector(".array2d-row-items");
    if (!rowItems) return;

    const current = rowItems.querySelectorAll("input").length;
    while (rowItems.querySelectorAll("input").length < values.length) ops.addElement();
    while (rowItems.querySelectorAll("input").length > values.length && values.length >= 1) ops.removeElement();

    rowItems.querySelectorAll("input").forEach((input, idx) => {
        setInputValue(input, values[idx] ?? "0");
    });
}

function setConditionValue(block, left, op, right) {
    const leftInput = block.querySelector(".condition-left");
    const opSelect = block.querySelector(".condition-op");
    const rightInput = block.querySelector(".condition-right");

    if (!leftInput || !opSelect || !rightInput) return;

    setInputValue(leftInput, left);
    opSelect.value = op;
    opSelect.dispatchEvent(new Event("change"));
    setInputValue(rightInput, right);
}

function readConditionValue(node) {
    const leftInput = node.querySelector(".condition-left");
    const opSelect = node.querySelector(".condition-op");
    const rightInput = node.querySelector(".condition-right");

    if (leftInput && opSelect && rightInput) {
        const left = leftInput.value.trim() || "0";
        const right = rightInput.value.trim() || "0";
        return `${left} ${opSelect.value} ${right}`;
    }

    return node.querySelector("input").value;
}

function loadExample1() {
    workspace.innerHTML = "";

    const sumAAssign = createAssignBlock();
    setInputValue(sumAAssign.querySelector(".assign-inline > input"), "sum_a");
    setInputValue(sumAAssign.querySelector(".assign-value"), "0");
    workspace.appendChild(sumAAssign);

    const sumBAssign = createAssignBlock();
    setInputValue(sumBAssign.querySelector(".assign-inline > input"), "sum_b");
    setInputValue(sumBAssign.querySelector(".assign-value"), "0");
    workspace.appendChild(sumBAssign);

    const arrayAssign = createArrayBlock();
    setInputValue(arrayAssign.querySelector("input"), "a");
    setArray1DValues(arrayAssign, ["20", "69", "20", "98", "30", "63", "18", "93"]);
    workspace.appendChild(arrayAssign);

    const forBlock = createForBlock();
    const forInputs = forBlock.querySelectorAll("input");
    setInputValue(forInputs[0], "i");
    setInputValue(forInputs[1], "0");
    setInputValue(forInputs[2], "7");
    setInputValue(forInputs[3], "1");

    const loopBody = forBlock.querySelector(".children");

    const amariAssign = createAssignBlock();
    setInputValue(amariAssign.querySelector(".assign-inline > input"), "amari");
    const amariExpr = createExprBlock();
    const amariExprInputs = amariExpr.querySelectorAll("input");
    setInputValue(amariExprInputs[0], "i");
    amariExpr.querySelector("select").value = "%";
    amariExpr.querySelector("select").dispatchEvent(new Event("change"));
    setInputValue(amariExprInputs[1], "2");
    amariAssign.querySelector(".expr-zone").appendChild(amariExpr);
    syncAssignZone(amariAssign.querySelector(".expr-zone"));
    loopBody.appendChild(amariAssign);

    const ifElseBlock = createIfElseBlock();
    setConditionValue(ifElseBlock, "amari", "==", "0");

    const ifBody = ifElseBlock.querySelector(".if-body");
    const sumAUpdate = createAssignBlock();
    setInputValue(sumAUpdate.querySelector(".assign-inline > input"), "sum_a");
    const sumAExpr = createExprBlock();
    const sumAExprInputs = sumAExpr.querySelectorAll("input");
    setInputValue(sumAExprInputs[0], "sum_a");
    sumAExpr.querySelector("select").value = "+";
    sumAExpr.querySelector("select").dispatchEvent(new Event("change"));
    setInputValue(sumAExprInputs[1], "a[i]");
    sumAUpdate.querySelector(".expr-zone").appendChild(sumAExpr);
    syncAssignZone(sumAUpdate.querySelector(".expr-zone"));
    ifBody.appendChild(sumAUpdate);
    updatePlaceholder(ifBody);

    const elseBody = ifElseBlock.querySelector(".else-body");
    const sumBUpdate = createAssignBlock();
    setInputValue(sumBUpdate.querySelector(".assign-inline > input"), "sum_b");
    const sumBExpr = createExprBlock();
    const sumBExprInputs = sumBExpr.querySelectorAll("input");
    setInputValue(sumBExprInputs[0], "sum_b");
    sumBExpr.querySelector("select").value = "+";
    sumBExpr.querySelector("select").dispatchEvent(new Event("change"));
    setInputValue(sumBExprInputs[1], "a[i]");
    sumBUpdate.querySelector(".expr-zone").appendChild(sumBExpr);
    syncAssignZone(sumBUpdate.querySelector(".expr-zone"));
    elseBody.appendChild(sumBUpdate);
    updatePlaceholder(elseBody);

    loopBody.appendChild(ifElseBlock);
    updatePlaceholder(loopBody);
    workspace.appendChild(forBlock);

    const printSumA = createPrintBlock();
    setInputValue(printSumA.querySelector("input"), "sum_a");
    workspace.appendChild(printSumA);

    const printSumB = createPrintBlock();
    setInputValue(printSumB.querySelector("input"), "sum_b");
    workspace.appendChild(printSumB);

    updateCode();
}

function loadExample2() {
    workspace.innerHTML = "";

    const outerFor = createForBlock();
    const outerInputs = outerFor.querySelectorAll("input");
    setInputValue(outerInputs[0], "i");
    setInputValue(outerInputs[1], "1");
    setInputValue(outerInputs[2], "9");
    setInputValue(outerInputs[3], "1");

    const outerBody = outerFor.querySelector(".children");

    const innerFor = createForBlock();
    const innerInputs = innerFor.querySelectorAll("input");
    setInputValue(innerInputs[0], "j");
    setInputValue(innerInputs[1], "1");
    setInputValue(innerInputs[2], "9");
    setInputValue(innerInputs[3], "1");

    const innerBody = innerFor.querySelector(".children");
    const printBlock = createPrintBlock();
    setInputValue(printBlock.querySelector("input"), 'i + "×" + j + "=" + i * j');
    innerBody.appendChild(printBlock);
    updatePlaceholder(innerBody);

    outerBody.appendChild(innerFor);
    updatePlaceholder(outerBody);

    workspace.appendChild(outerFor);
    updateCode();
}

function loadExample3() {
    workspace.innerHTML = "";

    const arrayAssign = createArrayBlock();
    setInputValue(arrayAssign.querySelector("input"), "a");
    setArray1DValues(arrayAssign, ["20", "69", "20", "98", "30", "63", "18", "93"]);
    workspace.appendChild(arrayAssign);

    const maxAssign = createAssignBlock();
    setInputValue(maxAssign.querySelector(".assign-inline > input"), "max");
    setInputValue(maxAssign.querySelector(".assign-value"), "a[0]");
    workspace.appendChild(maxAssign);

    const forBlock = createForBlock();
    const inputs = forBlock.querySelectorAll("input");
    setInputValue(inputs[0], "i");
    setInputValue(inputs[1], "1");
    setInputValue(inputs[2], "7");
    setInputValue(inputs[3], "1");

    const loopBody = forBlock.querySelector(".children");

    const ifBlock = createIfBlock();
    setConditionValue(ifBlock, "a[i]", ">", "max");

    const ifBody = ifBlock.querySelector(".children");

    const updateMax = createAssignBlock();
    setInputValue(updateMax.querySelector(".assign-inline > input"), "max");
    setInputValue(updateMax.querySelector(".assign-value"), "a[i]");
    ifBody.appendChild(updateMax);

    loopBody.appendChild(ifBlock);
    workspace.appendChild(forBlock);

    const print = createPrintBlock();
    setInputValue(print.querySelector("input"), "max");
    workspace.appendChild(print);

    updateCode();
}

function loadExample4() {
    workspace.innerHTML = "";

    // a = 48
    const aAssign = createAssignBlock();
    setInputValue(aAssign.querySelector(".assign-inline > input"), "a");
    setInputValue(aAssign.querySelector(".assign-value"), "48");
    workspace.appendChild(aAssign);

    // b = 18
    const bAssign = createAssignBlock();
    setInputValue(bAssign.querySelector(".assign-inline > input"), "b");
    setInputValue(bAssign.querySelector(".assign-value"), "18");
    workspace.appendChild(bAssign);

    // while (b != 0)
    const whileBlock = createWhileBlock();
    setConditionValue(whileBlock, "b", "!=", "0");
    const loopBody = whileBlock.querySelector(".children");

    // r = a % b
    const rAssign = createAssignBlock();
    setInputValue(rAssign.querySelector(".assign-inline > input"), "r");

    const modExpr = createExprBlock();
    const modInputs = modExpr.querySelectorAll("input");
    setInputValue(modInputs[0], "a");
    modExpr.querySelector("select").value = "%";
    modExpr.querySelector("select").dispatchEvent(new Event("change"));
    setInputValue(modInputs[1], "b");

    rAssign.querySelector(".expr-zone").appendChild(modExpr);
    syncAssignZone(rAssign.querySelector(".expr-zone"));
    loopBody.appendChild(rAssign);

    // a = b
    const aUpdate = createAssignBlock();
    setInputValue(aUpdate.querySelector(".assign-inline > input"), "a");
    setInputValue(aUpdate.querySelector(".assign-value"), "b");
    loopBody.appendChild(aUpdate);

    // b = r
    const bUpdate = createAssignBlock();
    setInputValue(bUpdate.querySelector(".assign-inline > input"), "b");
    setInputValue(bUpdate.querySelector(".assign-value"), "r");
    loopBody.appendChild(bUpdate);

    workspace.appendChild(whileBlock);

    // 表示
    const print = createPrintBlock();
    setInputValue(print.querySelector("input"), `"最大公約数は"+a    `);
    workspace.appendChild(print);

    updateCode();
}

// ----------------
// 配列ブロック ★
// ----------------
function createArrayBlock() {
    const div = document.createElement("div");
    div.className = "block";
    div.dataset.type = "array";
    assignBlockId(div);

    div.innerHTML = `
<div class="array2d-head">
  <input value="a"> =
</div>
<div class="array2d-body">
  <div class="array2d-rows"></div>
</div>
`;

    const nameInput = div.querySelector("input");
    autoResizeInput(nameInput);

    const rowsContainer = div.querySelector(".array2d-rows");

    function normalizeCellInput(input) {
        input.addEventListener("blur", () => {
            if (input.value.trim() === "") {
                input.value = "0";
                input.dispatchEvent(new Event("input"));
            }
        });
    }

    function createCell(value = "0") {
        const input = document.createElement("input");
        input.value = value;
        input.className = "array2d-cell";
        autoResizeInput(input);
        normalizeCellInput(input);
        input.addEventListener("input", updateCode);
        return input;
    }

    function appendCellToRow(itemsEl, value = "0") {
        const hasCells = itemsEl.querySelectorAll("input").length > 0;
        if (hasCells) {
            const comma = document.createElement("span");
            comma.className = "array2d-comma";
            comma.textContent = ",";
            itemsEl.appendChild(comma);
        }
        itemsEl.appendChild(createCell(value));
    }

    function buildRow() {
        const row = document.createElement("div");
        row.className = "array2d-row";

        const leftBracket = document.createElement("span");
        leftBracket.className = "array2d-bracket";
        leftBracket.textContent = "[";

        const items = document.createElement("span");
        items.className = "array2d-row-items";

        const rightBracket = document.createElement("span");
        rightBracket.className = "array2d-bracket";
        rightBracket.textContent = "]";

        row.appendChild(leftBracket);
        row.appendChild(items);
        row.appendChild(rightBracket);

        return { row, items };
    }

    function getRowCount() {
        return rowsContainer.querySelectorAll(".array2d-row").length;
    }

    function getColCount() {
        const firstRow = rowsContainer.querySelector(".array2d-row");
        if (!firstRow) return 0;
        return firstRow.querySelectorAll("input").length;
    }

    function addRow() {
        const colCount = Math.max(getColCount(), 1);
        const { row, items } = buildRow();
        for (let c = 0; c < colCount; c += 1) appendCellToRow(items, "0");
        rowsContainer.appendChild(row);
        updateCode();
        return true;
    }

    function removeRow() {
        const rows = rowsContainer.querySelectorAll(".array2d-row");
        if (rows.length <= 1) return false;
        rows[rows.length - 1].remove();
        updateCode();
        return true;
    }

    function addElement() {
        if (getRowCount() === 0) addRow();
        rowsContainer.querySelectorAll(".array2d-row-items").forEach((items) => appendCellToRow(items, "0"));
        updateCode();
        return true;
    }

    function removeElement() {
        const colCount = getColCount();
        if (colCount <= 1) return false;
        rowsContainer.querySelectorAll(".array2d-row-items").forEach((items) => {
            const inputs = items.querySelectorAll("input");
            const lastInput = inputs[inputs.length - 1];
            const prev = lastInput.previousSibling;
            lastInput.remove();
            if (prev && prev.classList && prev.classList.contains("array2d-comma")) {
                prev.remove();
            }
        });
        updateCode();
        return true;
    }

    // 初期: 1行3要素
    addRow();
    addElement();
    addElement();

    div.arrayOps = { addRow, removeRow, addElement, removeElement };

    div.addEventListener("click", (event) => {
        if (event.target.closest(".delete-btn")) return;
        if (event.target.closest("input")) return;
        setSelectedArrayBlock(div);
    });

    addDeleteButton(div);
    return div;
}

function createExprBlock() {
    const div = document.createElement("div");
    div.className = "block expr";
    div.dataset.type = "expr";
    assignBlockId(div);

    div.innerHTML = `
      <input value="x">
      <select>
        <option value="+">＋</option>
        <option value="-">－</option>
        <option value="*">＊</option>
        <option value="/">／</option>
        <option value="%">%</option>
      </select>
      <input value="1">
    `;

    const inputs = div.querySelectorAll("input");
    inputs.forEach(autoResizeInput);

    div.querySelector("select").addEventListener("change", updateCode);

    addDeleteButton(div);
    return div;
}

function createRandomBlock() {
    const div = document.createElement("div");
    div.className = "block expr";
    div.dataset.type = "random";
    assignBlockId(div);

    div.innerHTML = `乱数()`;

    addDeleteButton(div);
    return div;
}

function createRoundingBlock(kind) {
    const labelByKind = {
        floor: "切り捨て",
        ceil: "切り上げ",
        round: "四捨五入"
    };

    const label = labelByKind[kind] || "四捨五入";

    const div = document.createElement("div");
    div.className = "block expr";
    div.dataset.type = kind;
    assignBlockId(div);

    div.innerHTML = `
      ${label}(
        <input value="x">
      )
    `;

    autoResizeInput(div.querySelector("input"));
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
    assignBlockId(div);

    div.innerHTML = `
      <div class="assign-inline">
        <input value="x"> =
        <div class="children dropzone expr-zone">
          <input class="assign-value" value="" placeholder="直接入力、または計算ブロックをここに代入">
        </div>
      </div>
    `;

    const zone = div.querySelector(".expr-zone");
    const valueInput = div.querySelector(".assign-value");

    autoResizeInput(div.querySelector("input"));
    autoResizeInput(valueInput);
    enableDrop(zone, {
        onlyExprLike: true,
        singleBlock: true,
        skipPlaceholder: true,
        onChange: () => syncAssignZone(zone)
    });

    syncAssignZone(zone);

    addDeleteButton(div);
    return div;
}

function createPrintBlock() {
    const div = document.createElement("div");
    div.className = "block";
    div.dataset.type = "print";
    assignBlockId(div);

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
    assignBlockId(div);

    div.innerHTML = `
    もし
    <input class="condition-left" value="x">
    <select class="condition-op">
      <option value=">">&gt;</option>
      <option value=">=">&gt;=</option>
      <option value="<">&lt;</option>
      <option value="<=">&lt;=</option>
      <option value="==">==</option>
      <option value="!=">!=</option>
    </select>
    <input class="condition-right" value="0">
    ならば:
    <div class="children dropzone"></div>
  `;

    const child = div.querySelector(".children");

    div.querySelectorAll("input").forEach(autoResizeInput);
    div.querySelector("select").addEventListener("change", updateCode);
    enableDrop(child);

    updatePlaceholder(child);
    addDeleteButton(div);
    return div;
}

function createIfElseBlock() {
    const div = document.createElement("div");
    div.className = "block ifelse";
    div.dataset.type = "ifelse";
    assignBlockId(div);

    div.innerHTML = `
    もし
    <input class="condition-left" value="x">
    <select class="condition-op">
      <option value=">">&gt;</option>
      <option value=">=">&gt;=</option>
      <option value="<">&lt;</option>
      <option value="<=">&lt;=</option>
      <option value="==">==</option>
      <option value="!=">!=</option>
    </select>
    <input class="condition-right" value="0">
    ならば:
    <div class="children dropzone if-body"></div>

    <div class="else-area">
      そうでなければ:
      <div class="children dropzone else-body"></div>
    </div>
  `;

    const ifBody = div.querySelector(".if-body");
    const elseBody = div.querySelector(".else-body");

    div.querySelectorAll("input").forEach(autoResizeInput);
    div.querySelector("select").addEventListener("change", updateCode);

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
    assignBlockId(div);

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

function createWhileBlock() {
    const div = document.createElement("div");
    div.className = "block while";
    div.dataset.type = "while";
    assignBlockId(div);

    div.innerHTML = `
    <input class="condition-left" value="x">
    <select class="condition-op">
      <option value=">">&gt;</option>
      <option value=">=">&gt;=</option>
      <option value="<">&lt;</option>
      <option value="<=">&lt;=</option>
      <option value="==">==</option>
      <option value="!=">!=</option>
    </select>
    <input class="condition-right" value="0">
    の間繰り返す:
    <div class="children dropzone"></div>
  `;

    const child = div.querySelector(".children");

    div.querySelectorAll("input").forEach(autoResizeInput);
    div.querySelector("select").addEventListener("change", updateCode);
    enableDrop(child);
    updatePlaceholder(child);

    addDeleteButton(div);
    return div;
}

// ----------------
// ドラッグ
// ----------------
function syncAssignZone(zone) {
    const valueInput = zone.querySelector(".assign-value");

    if (!valueInput) return;

    const hasBlock = Array.from(zone.children)
        .some(child => child.classList && child.classList.contains("block"));

    valueInput.style.display = hasBlock ? "none" : "inline-block";
}

function enableDrop(el, options = {}) {
    const handleDropChange = () => {
        if (!options.skipPlaceholder) {
            updatePlaceholder(el);
        }

        if (options.onChange) {
            options.onChange();
        }

        updateCode();
    };

    new Sortable(el, {
        group: {
            name: "shared",
            put: (_to, _from, dragged) => {
                const draggedType = dragged.dataset?.type;
                const isExprLikeBlock = ["expr", "random"].includes(draggedType)
                    || dragged.classList.contains("expr");

                if (options.onlyExprLike && !isExprLikeBlock) {
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
        onAdd: handleDropChange,
        onUpdate: handleDropChange,
        onRemove: handleDropChange,
        onSort: handleDropChange,
        onEnd: handleDropChange
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

            const rows = Array.from(
                node.querySelectorAll(".array2d-rows .array2d-row")
            );

            const matrix = rows.map((tr) => {
                return Array.from(tr.querySelectorAll("input")).map((input) => input.value.trim() || "0");
            });

            const colCount = matrix.length > 0 ? Math.max(1, ...matrix.map(r => r.length)) : 1;
            const normalized = matrix.length > 0 ? matrix : [Array.from({ length: colCount }).map(() => "0")];
            const rectangular = normalized.map((row) => {
                const filled = row.slice(0, colCount);
                while (filled.length < colCount) filled.push("0");
                return filled;
            });

            if (rectangular.length <= 1) {
                ast.push({
                    type: "assign",
                    blockId: node.dataset.blockId,
                    name,
                    value: `[${rectangular[0].join(",")}]`
                });
                return;
            }

            ast.push({
                type: "assign",
                blockId: node.dataset.blockId,
                name,
                value: `[${rectangular.map(row => `[${row.join(",")}]`).join(",")}]`
            });
        }

        if (type === "assign") {

            const name = node.querySelector("input").value;

            const exprZone = node.querySelector(".expr-zone");
            const valueInput = exprZone.querySelector(".assign-value");

            const child = exprZone.querySelector(".block");

            if (child) {
                ast.push({
                    type,
                    blockId: node.dataset.blockId,
                    name,
                    value: buildExpression(child)
                });
            } else {
                ast.push({
                    type,
                    blockId: node.dataset.blockId,
                    name,
                    value: valueInput.value.trim() || "0"
                });
            }
        }

        if (type === "print") {
            ast.push({
                type,
                blockId: node.dataset.blockId,
                value: node.querySelector("input").value
            });
        }

        if (type === "if") {
            ast.push({
                type,
                blockId: node.dataset.blockId,
                condition: readConditionValue(node),
                body: buildAST(node.querySelector(".children"))
            });
        }

        if (type === "ifelse") {
            ast.push({
                type,
                blockId: node.dataset.blockId,
                condition: readConditionValue(node),
                ifBody: buildAST(node.querySelector(".if-body")),
                elseBody: buildAST(node.querySelector(".else-body"))
            });
        }

        if (type === "for") {
            const i = node.querySelectorAll("input");

            ast.push({
                type,
                blockId: node.dataset.blockId,
                varName: i[0].value,
                start: i[1].value,
                end: i[2].value,
                step: i[3].value,
                body: buildAST(node.querySelector(".children"))
            });
        }

        if (type === "while") {
            ast.push({
                type,
                blockId: node.dataset.blockId,
                condition: readConditionValue(node),
                body: buildAST(node.querySelector(".children"))
            });
        }

        if (type === "expr") {
            const i = node.querySelectorAll("input");
            const op = node.querySelector("select").value;

            ast.push({
                type: "expr",
                blockId: node.dataset.blockId,
                left: i[0].value,
                op,
                right: i[1].value
            });
        }

        if (type === "random") {
            ast.push({
                type: "random",
                blockId: node.dataset.blockId,
                value: "乱数()"
            });
        }

        if (["floor", "ceil", "round"].includes(type)) {
            const input = node.querySelector("input");
            const rawValue = input ? input.value.trim() : "";
            const labelByKind = {
                floor: "切り捨て",
                ceil: "切り上げ",
                round: "四捨五入"
            };

            ast.push({
                type: "call",
                blockId: node.dataset.blockId,
                value: `${labelByKind[type]}(${rawValue || "0"})`
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

        if (node.type === "while")
            code += `${indent}${node.condition} の間繰り返す:\n` +
                buildCode(node.body, indent + "  ");

        if (node.type === "expr")
            code += `${indent}${node.left} ${node.op} ${node.right}\n`;

        if (node.type === "random")
            code += `${indent}乱数()\n`;

        if (node.type === "call")
            code += `${indent}${node.value}\n`;
    });

    return code;
}

function buildExpression(node) {

    const type = node.dataset.type;
    const hasOperatorSelect = Boolean(node.querySelector("select"));

    if (type === "expr" || (node.classList.contains("expr") && hasOperatorSelect)) {
        const i = node.querySelectorAll("input");
        const op = node.querySelector("select").value;

        return `${i[0].value} ${op} ${i[1].value}`;
    }

    if (type === "random") {
        return "乱数()";
    }

    if (["floor", "ceil", "round"].includes(type)) {
        const value = node.querySelector("input")?.value?.trim() || "0";
        if (type === "floor") return `切り捨て(${value})`;
        if (type === "ceil") return `切り上げ(${value})`;
        return `四捨五入(${value})`;
    }

    if (type === "assign") {
        return node.querySelectorAll("input")[1].value;
    }

    return "0";
}

function updateCode() {
    const ast = buildAST(workspace);
    document.getElementById("code").textContent = buildCode(ast);

    document.querySelectorAll(".children:not(.expr-zone)").forEach(updatePlaceholder);
    document.querySelectorAll(".expr-zone").forEach(syncAssignZone);

    if (selectedArrayBlock && !document.body.contains(selectedArrayBlock)) {
        setSelectedArrayBlock(null);
    } else {
        renderArrayControlPanel();
    }

    window.currentAST = ast;
}

// ----------------
// 配列 操作パネル
// ----------------
let selectedArrayBlock = null;

function setSelectedArrayBlock(block) {
    selectedArrayBlock = block;
    renderArrayControlPanel();
}

function renderArrayControlPanel() {
    const panel = document.getElementById("array-control-panel");
    if (!panel) return;

    if (!selectedArrayBlock || selectedArrayBlock.dataset.type !== "array") {
        panel.hidden = true;
        panel.innerHTML = "";
        return;
    }

    const ops = selectedArrayBlock.arrayOps;
    if (!ops) {
        panel.hidden = true;
        panel.innerHTML = "";
        return;
    }

    panel.hidden = false;
    panel.innerHTML = `
        <span class="array-control-panel-title">配列の操作</span>
        <button type="button" data-op="addElement">要素 ＋</button>
        <button type="button" data-op="removeElement">要素 －</button>
        <button type="button" data-op="addRow">行 ＋</button>
        <button type="button" data-op="removeRow">行 －</button>
    `;

    panel.querySelectorAll("button[data-op]").forEach((btn) => {
        btn.addEventListener("click", () => {
            const op = btn.dataset.op;
            const ok = typeof ops[op] === "function" ? ops[op]() : false;
            if (ok === false) {
                // no-op
            }
        });
    });
}

workspace.addEventListener("click", (event) => {
    const block = event.target.closest(".block");
    if (!block || block.dataset.type !== "array") {
        setSelectedArrayBlock(null);
    }
});

// ----------------
// URL共有
// ----------------
function encodeProgramAst(ast) {
    const json = JSON.stringify(ast ?? []);
    const utf8 = encodeURIComponent(json);
    return btoa(utf8);
}

function decodeProgramAst(encoded) {
    const json = decodeURIComponent(atob(encoded));
    const ast = JSON.parse(json);
    return Array.isArray(ast) ? ast : [];
}

function parseConditionExpr(condition) {
    const raw = String(condition ?? "").trim();
    const ops = ["==", "!=", "<=", ">=", "<", ">"];
    for (const op of ops) {
        const idx = raw.indexOf(op);
        if (idx === -1) continue;
        const left = raw.slice(0, idx).trim();
        const right = raw.slice(idx + op.length).trim();
        if (!left || !right) break;
        return { left, op, right };
    }
    return null;
}

function loadProgramFromAst(ast) {
    workspace.innerHTML = "";
    setSelectedArrayBlock(null);

    function appendNodes(nodes, container) {
        (nodes || []).forEach((node) => {
            if (!node || typeof node !== "object") return;

            if (node.type === "assign") {
                const b = createAssignBlock();
                setInputValue(b.querySelector(".assign-inline > input"), node.name ?? "x");
                setInputValue(b.querySelector(".assign-value"), node.value ?? "0");
                container.appendChild(b);
                return;
            }

            if (node.type === "print") {
                const b = createPrintBlock();
                setInputValue(b.querySelector("input"), node.value ?? "0");
                container.appendChild(b);
                return;
            }

            if (node.type === "if") {
                const b = createIfBlock();
                const parts = parseConditionExpr(node.condition);
                if (parts) setConditionValue(b, parts.left, parts.op, parts.right);
                else setInputValue(b.querySelector("input"), node.condition ?? "0");
                appendNodes(node.body, b.querySelector(".children"));
                container.appendChild(b);
                return;
            }

            if (node.type === "ifelse") {
                const b = createIfElseBlock();
                const parts = parseConditionExpr(node.condition);
                if (parts) setConditionValue(b, parts.left, parts.op, parts.right);
                else setInputValue(b.querySelector("input"), node.condition ?? "0");
                appendNodes(node.ifBody, b.querySelector(".if-body"));
                appendNodes(node.elseBody, b.querySelector(".else-body"));
                container.appendChild(b);
                return;
            }

            if (node.type === "for") {
                const b = createForBlock();
                const inputs = b.querySelectorAll("input");
                setInputValue(inputs[0], node.varName ?? "i");
                setInputValue(inputs[1], node.start ?? "0");
                setInputValue(inputs[2], node.end ?? "0");
                setInputValue(inputs[3], node.step ?? "1");
                appendNodes(node.body, b.querySelector(".children"));
                container.appendChild(b);
                return;
            }

            if (node.type === "while") {
                const b = createWhileBlock();
                const parts = parseConditionExpr(node.condition);
                if (parts) setConditionValue(b, parts.left, parts.op, parts.right);
                else setInputValue(b.querySelector("input"), node.condition ?? "0");
                appendNodes(node.body, b.querySelector(".children"));
                container.appendChild(b);
                return;
            }
        });
    }

    appendNodes(ast, workspace);
    updateCode();
}

function shareProgramUrl() {
    const ast = window.currentAST || buildAST(workspace);
    const encoded = encodeProgramAst(ast);
    const url = new URL(window.location.href);
    url.searchParams.set("p", encoded);

    const dialog = document.getElementById("share-dialog");
    const input = document.getElementById("share-url-input");
    const copyBtn = document.getElementById("copy-share-url-button");
    const closeBtn = document.getElementById("close-share-dialog-button");

    if (!dialog || !input || !copyBtn || !closeBtn) {
        window.prompt("共有URL", url.toString());
        return;
    }

    input.value = url.toString();
    dialog.showModal();
    input.focus();
    input.select();

    copyBtn.onclick = async () => {
        try {
            await navigator.clipboard.writeText(input.value);
        } catch (_e) {
            window.prompt("コピーして共有してください", input.value);
        }
    };

    closeBtn.onclick = () => dialog.close();
}

function loadProgramFromUrlIfPresent() {
    const params = new URLSearchParams(window.location.search);
    const encoded = params.get("p");
    if (!encoded) return;
    try {
        const ast = decodeProgramAst(encoded);
        loadProgramFromAst(ast);
    } catch (e) {
        console.error("Failed to load program from URL", e);
    }
}

window.addEventListener("DOMContentLoaded", () => {
    loadProgramFromUrlIfPresent();
});

setupPaletteButtons();
setupProgramViewSwitch();
