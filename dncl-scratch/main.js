function run() {
    vars = {};
    output = "";
    trace = [];
    stepIndex = 0;
    changedVars = new Set();
    clearStepHighlight();

    // トレース生成
    buildTrace(window.currentAST || []);

    // 全実行
    while (stepIndex < trace.length) {
        runTraceStep(trace[stepIndex++]);
    }

    // UI更新
    updateUI();
}
