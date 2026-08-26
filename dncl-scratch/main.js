function run() {
    vars = {};
    output = "";
    trace = [];
    stepIndex = 0;
    stepHistory = [];
    changedVars = new Set();
    whileIterationCounts = new Map();
    forIterationStates = new Map();
    functions = {};
    callStack = [];
    callFrameCounter = 0;
    stepCallValues = new Map();
    currentCallFlight = null;
    currentExplanation = "一括実行が終わりました。ステップ実行を押すと、1 行ずつ説明を見ながら進められます。";
    currentExplanationHtml = null;
    highlightedArrayAccesses = new Set();
    highlightedVars = new Set();
    clearStepHighlight();

    // トレース生成
    buildTrace(window.currentAST || []);

    // 全実行
    while (stepIndex < trace.length) {
        runTraceStep(trace[stepIndex++]);
    }

    // 一括実行では途中の呼び出しの矢印は残さない
    currentCallFlight = null;

    // 一括実行ではステップ用の「次へ」「前へ」は出さない
    executionActive = true;
    setStepButtonsVisible(false);

    // UI更新
    updateUI();
}
