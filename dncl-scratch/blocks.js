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

    setInputMaybeBlank(leftInput, left);

    // quiz blank support for operator select
    const blankId = parseBlankToken(op);
    if (blankId !== null) {
        opSelect.dataset.blankIndex = String(blankId);
        opSelect.classList.add("quiz-blank");

        // preserve original options so we can restore later
        if (!opSelect.dataset.originalOptions) {
            opSelect.dataset.originalOptions = opSelect.innerHTML;
        }

        // allow "empty" selection that will be filled by quiz choice buttons
        opSelect.innerHTML = `
            <option value=""></option>
            <option value="==">==</option>
            <option value="!=">!=</option>
            <option value="<=">&lt;=</option>
            <option value=">=">&gt;=</option>
            <option value="<">&lt;</option>
            <option value=">">&gt;</option>
        `;
        opSelect.value = "";
    } else {
        // restore original options if they were replaced for blanks
        if (opSelect.dataset.originalOptions) {
            opSelect.innerHTML = opSelect.dataset.originalOptions;
            delete opSelect.dataset.originalOptions;
        }
        delete opSelect.dataset.blankIndex;
        opSelect.classList.remove("quiz-blank");
        opSelect.value = op;
    }

    opSelect.dispatchEvent(new Event("change"));
    setInputMaybeBlank(rightInput, right);
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

    const sortable = new Sortable(el, {
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

    el._sortable = sortable;
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

    // プログラムが変わったら、進行中の実行（ステップ/一括）をキャンセルする
    if (typeof onProgramChanged === "function") {
        onProgramChanged();
    }
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
    // quiz blank operator support: "a __BLANK_x__ b"
    const blankMatch = raw.match(/^(.+?)\s+(__BLANK.+?__)\s+(.+)$/);
    if (blankMatch) {
        return {
            left: blankMatch[1].trim(),
            op: blankMatch[2].trim(),
            right: blankMatch[3].trim(),
        };
    }
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

function parseBlankToken(raw) {
    const s = String(raw ?? "").trim();
    const m = s.match(/^__BLANK(?::|_)?(.+?)__$/);
    if (!m) return null;
    return m[1];
}

function setInputMaybeBlank(input, raw) {
    const blankId = parseBlankToken(raw);
    if (blankId === null) {
        setInputValue(input, raw ?? "");
        return;
    }
    setInputValue(input, "");
    input.dataset.blankIndex = String(blankId);
    input.readOnly = true;
    input.classList.add("quiz-blank");
}

function parseSimpleBinaryExpr(raw) {
    const s = String(raw ?? "").trim();
    const blankMatch = s.match(
        /^(.+?)\s+(__BLANK.+?__)\s+(.+)$/
    );
    if (blankMatch) {
        return {
            left: blankMatch[1].trim(),
            op: blankMatch[2].trim(),
            right: blankMatch[3].trim(),
        };
    }
    const ops = ["==", "!=", "<=", ">=", "+", "-", "*", "/", "%"];
    for (const op of ops) {
        const idx = s.indexOf(op);
        if (idx <= 0) continue;
        const left = s.slice(0, idx).trim();
        const right = s.slice(idx + op.length).trim();
        if (!left || !right) continue;
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
                setInputMaybeBlank(b.querySelector(".assign-inline > input"), node.name ?? "x");

                const zone = b.querySelector(".expr-zone");
                const valueInput = b.querySelector(".assign-value");
                const rawValue = node.value ?? "0";

                const parts = parseSimpleBinaryExpr(rawValue);
                if (parts) {
                    const expr = createExprBlock();
                    const inputs = expr.querySelectorAll("input");
                    const opSelect = expr.querySelector("select");
                    setInputMaybeBlank(inputs[0], parts.left);
                    const blankId = parseBlankToken(parts.op);
                    if (blankId !== null) {
                        opSelect.dataset.blankIndex = blankId;
                        opSelect.classList.add("quiz-blank");
                        opSelect.innerHTML = `
                            <option value=""></option>
                            <option value="+">＋</option>
                            <option value="-">－</option>
                            <option value="*">＊</option>
                            <option value="/">／</option>
                            <option value="%">%</option>
                        `;
                        opSelect.value = "";
                    } else {
                        opSelect.value = parts.op;
                    }
                    setInputMaybeBlank(inputs[1], parts.right);
                    zone.insertBefore(expr, valueInput);
                    syncAssignZone(zone);
                } else {
                    setInputMaybeBlank(valueInput, rawValue);
                }

                container.appendChild(b);
                return;
            }

            if (node.type === "print") {
                const b = createPrintBlock();
                setInputMaybeBlank(b.querySelector("input"), node.value ?? "0");
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
                setInputMaybeBlank(inputs[0], node.varName ?? "i");
                setInputMaybeBlank(inputs[1], node.start ?? "0");
                setInputMaybeBlank(inputs[2], node.end ?? "0");
                setInputMaybeBlank(inputs[3], node.step ?? "1");
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

function quizGetParams() {
    const params = new URLSearchParams(window.location.search);
    const mode = params.get("mode");
    const id = params.get("id");
    if (mode !== "quiz" || !id) return null;
    return { id };
}

function quizNormalizeAnswer(str) {
    return String(str ?? "").trim();
}

function quizDisableEditingExceptBlanks() {
    try {
        workspace._sortable?.option("disabled", true);
    } catch (_e) {
        // no-op
    }

    // disable delete buttons (defense in depth; CSS hides too)
    workspace.querySelectorAll(".delete-btn").forEach((btn) => {
        btn.style.pointerEvents = "none";
    });

    const editable = workspace.querySelectorAll("input, select, textarea, button");
    editable.forEach((el) => {
        const isBlank = el.matches?.("input[data-blank-index]");
        if (!isBlank) {
            el.disabled = true;
        } else {
            el.disabled = false;
            el.readOnly = true;
        }
    });
}

function quizSetupChoices(quiz) {
    const bar = document.getElementById("quiz-choices-bar");
    const choicesEl = document.getElementById("quiz-choices");
    if (!bar || !choicesEl) return;

    bar.hidden = false;
    choicesEl.replaceChildren();

    (quiz.choices ?? []).forEach((choice) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "quiz-choice";
        btn.textContent = choice.label ?? "";
        btn.addEventListener("click", () => {
            if (!window.activeBlankId) return;
            const blanks = quizGetBlankInputs();
            const target = workspace.querySelector(
                `[data-blank-index="${CSS.escape(window.activeBlankId)}"]`,
            );
            if (!target) return;
            target.value = String(choice.value ?? "");
            target.dispatchEvent(new Event("change"));
            target.dispatchEvent(new Event("input"));
            target.classList.remove("quiz-blank-pulse");

            // move focus to next blank
            const idx = blanks.indexOf(target);
            const next = idx >= 0 ? blanks[idx + 1] : null;
            workspace
                .querySelectorAll("input[data-blank-index]")
                .forEach((el) => el.classList.remove("quiz-blank-active"));
            if (next) {
                next.classList.add("quiz-blank-active");
                next.classList.add("quiz-blank-pulse");
                window.activeBlankId = next.dataset.blankIndex;
                next.focus();
            }
            updateCode();
            quizUpdateCompletionPrompt();
        });
        choicesEl.append(btn);
    });
}

function quizGetBlankInputs() {
    return [
        ...workspace.querySelectorAll(
            "input[data-blank-index], select[data-blank-index]"
        )
    ];
}

function quizCollectBlankValues() {
    return quizGetBlankInputs().map((input) =>
        quizNormalizeAnswer(input.value)
    );
}

function quizJudgeByAnswers(quiz) {
    const userAnswers = quizCollectBlankValues();
    const matched = (quiz.answers ?? []).find((item) => {
        if (!Array.isArray(item.values)) return false;
        if (item.values.length !== userAnswers.length) {
            return false;
        }
        return item.values.every((v, i) => {
            return quizNormalizeAnswer(v)
                === quizNormalizeAnswer(userAnswers[i]);
        });
    });

    if (!matched) {
        return {
            ok: false,
            hint: quiz.defaultHint ?? "",
        };
    }
    return {
        ok: !!matched.correct,
        hint: matched.hint ?? "",
    };
}

function quizSetChoicesVisible(visible) {
    const bar = document.getElementById("quiz-choices-bar");
    const row = bar?.querySelector(".quiz-choices-row") ?? null;
    if (!row) return;
    row.style.display = visible ? "" : "none";
}

// 横にあふれていて（スクロールが必要なとき）だけ、5秒間だけ「← 👆 → 横スクロール可能です」の
// ヒントを上に重ねて知らせる。ユーザーが触れたらすぐ消して操作の邪魔をしない。
function quizShowScrollHint(scrollEl, durationMs = 5000) {
    if (!scrollEl) return;
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (scrollEl.scrollWidth - scrollEl.clientWidth <= 4) return; // あふれていなければ出さない

    const parent = scrollEl.parentElement;
    if (!parent) return;
    if (getComputedStyle(parent).position === "static") parent.style.position = "relative";

    const overlay = document.createElement("div");
    overlay.className = "scroll-hint-overlay";
    overlay.innerHTML =
        '<div class="scroll-hint-badge">'
        + '<span class="scroll-hint-swipe">'
        + '<i class="fa-solid fa-angle-left"></i>'
        + '<i class="fa-solid fa-hand-pointer scroll-hint-hand"></i>'
        + '<i class="fa-solid fa-angle-right"></i>'
        + '</span>'
        + '<span>横スクロール可能です</span>'
        + '</div>';
    // スクロールする要素の位置・大きさに重ねる
    overlay.style.left = `${scrollEl.offsetLeft}px`;
    overlay.style.top = `${scrollEl.offsetTop}px`;
    overlay.style.width = `${scrollEl.offsetWidth}px`;
    overlay.style.height = `${scrollEl.offsetHeight}px`;
    parent.appendChild(overlay);
    requestAnimationFrame(() => overlay.classList.add("is-visible"));

    let done = false;
    const remove = () => {
        if (done) return;
        done = true;
        overlay.classList.remove("is-visible");
        setTimeout(() => overlay.remove(), 400);
    };
    const timer = setTimeout(remove, durationMs);
    const onInteract = () => { clearTimeout(timer); remove(); };
    ["pointerdown", "wheel", "touchstart", "scroll", "keydown"].forEach((type) =>
        scrollEl.addEventListener(type, onInteract, { once: true, passive: true })
    );
}

// ステップ回答中は、操作スペースを「前へ」「次へ」だけにする
// （通常の「回答」「ステップ回答」「一覧へ」を隠す）。終了したら戻す。
function quizSetSteppingUI(stepping) {
    const actionHost = document.getElementById("quiz-actions-buttons");
    if (!actionHost) return;
    const runBtn = actionHost.querySelector('button[onclick="run()"]');
    const stepBtn = actionHost.querySelector('button[onclick="stepStart()"]');
    const backBtn = actionHost.querySelector(".quiz-back-button");
    [runBtn, stepBtn, backBtn].forEach((b) => {
        if (b) b.style.display = stepping ? "none" : "";
    });
}

function quizUpdateCompletionPrompt() {
    const blanks = quizGetBlankInputs();
    if (blanks.length === 0) return;

    const allFilled = blanks.every((b) => String(b.value ?? "").trim().length > 0);
    const actionHost = document.getElementById("quiz-actions-buttons");
    const runBtn = actionHost?.querySelector('button[onclick="run()"]') ?? null;
    const stepBtn = actionHost?.querySelector('button[onclick="stepStart()"]') ?? null;

    if (allFilled) {
        runBtn?.classList.add("quiz-cta", "quiz-cta-pulse");
        stepBtn?.classList.add("quiz-cta");
        return;
    }


    runBtn?.classList.remove("quiz-cta", "quiz-cta-pulse");
    stepBtn?.classList.remove("quiz-cta");
}

function quizSetupBlankTapBehavior() {
    window.activeBlankId = null;
    workspace.addEventListener("click", (event) => {
        const target = event.target.closest?.(
            "input[data-blank-index], select[data-blank-index]"
        );
        if (!target) return;
        const id = target.dataset.blankIndex;
        if (!id) return;
        if (window.activeBlankId === id) {
            if (target.tagName === "INPUT") {
                target.value = "";
            }
            target.classList.remove("quiz-blank-active");
            window.activeBlankId = null;
            updateCode();
            quizUpdateCompletionPrompt();
            return;
        }
        workspace
            .querySelectorAll(".quiz-blank-active")
            .forEach((el) => el.classList.remove("quiz-blank-active"));
        target.classList.add("quiz-blank-active");
        target.classList.remove("quiz-blank-pulse");
        window.activeBlankId = id;
        target.focus();
    });
}

function quizFocusFirstBlank() {
    const blanks = quizGetBlankInputs();
    if (blanks.length === 0) return;
    workspace
        .querySelectorAll("input[data-blank-index]")
        .forEach((el) => el.classList.remove("quiz-blank-active", "quiz-blank-pulse"));
    blanks[0].classList.add("quiz-blank-active");
    blanks[0].classList.add("quiz-blank-pulse");
    window.activeBlankId = blanks[0].dataset.blankIndex;
    blanks[0].focus();
}

function quizShowResultDialog(ok, hintMessage = "") {
    const dialog = document.getElementById("quiz-result-dialog");
    const title = document.getElementById("quiz-result-title");
    const body = document.getElementById("quiz-result-body");
    const retryBtn = document.getElementById("quiz-result-retry-button");
    const othersBtn = document.getElementById("quiz-result-others-button");
    if (!dialog || !title || !body || !retryBtn || !othersBtn) return;

    title.textContent = ok ? "正解！" : "不正解";
    title.className = ok ? "quiz-result-correct" : "quiz-result-incorrect";
    const outputText = String(output ?? "");
    const hintText = ok
        ? "よくできました。"
        : (hintMessage ? `ヒント：\n${hintMessage}` : "もう一度チャレンジしてみましょう。");

    body.innerHTML = "";
    const outputLabel = document.createElement("div");
    outputLabel.textContent = "出力";
    const outputBox = document.createElement("pre");
    outputBox.className = "quiz-result-output";
    outputBox.textContent = outputText || "（出力なし）";
    const hintBox = document.createElement("div");
    hintBox.className = "quiz-result-body";
    hintBox.textContent = hintText;
    body.append(outputLabel, outputBox, hintBox);
    // 「もう一度問題を確認する」＝ダイアログを閉じて問題画面に戻る
    retryBtn.onclick = () => dialog.close();
    // 「他の問題を解く」＝問題一覧へ移動
    othersBtn.onclick = () => quizGoToList();
    dialog.showModal();
}

// 問題一覧（practice.html）へ移動する。state=noheader を引き継ぐ
function quizGoToList() {
    const params = new URLSearchParams(location.search);
    const target = params.get("state") === "noheader"
        ? "practice.html?state=noheader"
        : "practice.html";
    location.href = target;
}

function quizHookJudge(quiz) {
    // ステップの「前へ/次へ」の表示切り替えに連動して、操作スペースの中身を切り替える
    if (typeof window.setStepButtonsVisible === "function") {
        const originalSetStepButtonsVisible = window.setStepButtonsVisible;
        window.setStepButtonsVisible = function (visible) {
            const ret = originalSetStepButtonsVisible.apply(this, arguments);
            quizSetSteppingUI(!!visible);
            return ret;
        };
    }

    if (typeof window.run === "function") {
        const originalRun = window.run;
        window.run = function (...args) {
            const ret = originalRun.apply(this, args);
            try {
                const result = quizJudgeByAnswers(quiz);

                quizShowResultDialog(
                    result.ok,
                    result.hint
                );
            } catch (_e) {
                // no-op
            }
            return ret;
        };
    }

    if (typeof window.stepStart === "function") {
        const originalStepStart = window.stepStart;
        window.stepStart = function (...args) {
            const ret = originalStepStart.apply(this, args);
            // ステップ回答を始め直したら「次へ」表示に戻す
            const next = document.getElementById("step-next-button");
            if (next) next.textContent = "▶ 次へ";
            return ret;
        };
    }

    if (typeof window.stepNext === "function") {
        const originalStepNext = window.stepNext;
        const isAtTraceEnd = () =>
            typeof stepIndex === "number" && Array.isArray(trace) && stepIndex >= trace.length;

        window.stepNext = function (...args) {
            // 最後のステップを実行し終えた状態でもう一度押されたか
            const wasAtEnd = isAtTraceEnd();
            const ret = originalStepNext.apply(this, args);
            try {
                const next = document.getElementById("step-next-button");
                if (isAtTraceEnd()) {
                    if (wasAtEnd) {
                        // 最後のステップを確認したあとにもう一度押したら答え合わせ
                        const result = quizJudgeByAnswers(quiz);
                        quizShowResultDialog(result.ok, result.hint);
                        quizSetChoicesVisible(true);
                    } else if (next) {
                        // 最後のステップに到達。まずこのステップを確認してもらい、
                        // 次に押したときに答え合わせをする（すぐにダイアログを出さない）
                        next.disabled = false;
                        next.textContent = "✅ 答え合わせ";
                    }
                } else if (next) {
                    // 途中のステップでは通常表示に戻す
                    next.textContent = "▶ 次へ";
                }
            } catch (_e) {
                // no-op
            }
            return ret;
        };
    }

    if (typeof window.stepPrev === "function") {
        const originalStepPrev = window.stepPrev;
        window.stepPrev = function (...args) {
            const ret = originalStepPrev.apply(this, args);
            // 「前へ」で最後のステップから戻ったら「答え合わせ」表示を解除する
            const next = document.getElementById("step-next-button");
            if (next) next.textContent = "▶ 次へ";
            return ret;
        };
    }

    // 「前へ」「次へ」の表示は executor 側（setStepButtonsVisible）が担当。
    // 選択肢はステップ中も表示したままにする（隠さない）。
}

function setupQuizModeIfPresent() {
    const p = quizGetParams();
    if (!p) return false;
    const quiz = window.quizData?.[p.id];
    if (!quiz) return false;

    document.body.classList.add("quiz-mode");

    // quiz mode: question is shown in choices bar (title only)
    const panel = document.getElementById("question-panel");
    if (panel) panel.hidden = true;
    const quizTitleEl = document.getElementById("quiz-question-title");
    if (quizTitleEl) {
        quizTitleEl.textContent = quiz.question ?? `問題 ${p.id}`;
    }

    // hide palette areas
    const palette = document.querySelector(".palette");
    const palettePreview = document.getElementById("palette-preview");
    if (palette) palette.style.display = "none";
    if (palettePreview) palettePreview.style.display = "none";

    // Move run buttons into quiz panel (run / stepStart / stepNext), hide share
    const runButtons = document.querySelector(".run-buttons");
    if (runButtons) {
        // インデックスではなくセレクタで取得（「前へ」追加で並びが変わるため）
        const runBtn = runButtons.querySelector('button[onclick="run()"]');
        const stepStartBtn = runButtons.querySelector('button[onclick="stepStart()"]');
        const prevBtn = runButtons.querySelector('#step-prev-button');
        const nextBtn = runButtons.querySelector('#step-next-button');
        const shareBtn = runButtons.querySelector('button[onclick="shareProgramUrl()"]');

        if (shareBtn) shareBtn.style.display = "none";

        const actionHost = document.getElementById("quiz-actions-buttons");
        if (actionHost) {
            // keep existing handlers by moving the elements
            if (runBtn) {
                runBtn.textContent = "▶ 回答";
                actionHost.appendChild(runBtn);
            }
            if (stepStartBtn) {
                stepStartBtn.textContent = "⏭ ステップ回答";
                actionHost.appendChild(stepStartBtn);
            }
            // 「前へ」「次へ」は hidden 属性で初期非表示。stepStart() で表示される。
            if (prevBtn) actionHost.appendChild(prevBtn);
            if (nextBtn) actionHost.appendChild(nextBtn);

            // 問題一覧に戻るボタン
            const backBtn = document.createElement("button");
            backBtn.type = "button";
            backBtn.textContent = "一覧へ";
            backBtn.className = "quiz-back-button";
            backBtn.addEventListener("click", () => quizGoToList());
            actionHost.appendChild(backBtn);
        }

        // hide original container on the right
        runButtons.style.display = "none";
    }

    // load blocks with blanks
    loadProgramFromAst(Array.isArray(quiz.ast) ? quiz.ast : []);
    quizDisableEditingExceptBlanks();
    quizSetupBlankTapBehavior();
    quizSetupChoices(quiz);
    quizHookJudge(quiz);
    quizFocusFirstBlank();
    quizUpdateCompletionPrompt();

    // レイアウト確定後、横スクロールが必要な行があれば「スクロールできる」ヒントを5秒だけ出す。
    // 主役の選択肢を優先し、あふれている最初の2か所に重ねる。
    setTimeout(() => {
        const targets = [
            document.getElementById("quiz-choices"),
            document.getElementById("quiz-question-title"),
            document.getElementById("quiz-actions-buttons"),
        ].filter(Boolean);
        targets
            .filter((el) => el.scrollWidth - el.clientWidth > 4)
            .slice(0, 2)
            .forEach((el) => quizShowScrollHint(el));

        // プログラム（ブロック表示）の横スクロールにもガイドを出す
        quizShowScrollHint(document.getElementById("workspace"));
    }, 250);

    return true;
}

window.addEventListener("DOMContentLoaded", () => {
    const isQuiz = setupQuizModeIfPresent();
    if (!isQuiz) {
        loadProgramFromUrlIfPresent();
    }
});

setupPaletteButtons();
setupProgramViewSwitch();
