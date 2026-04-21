function run() {
    vars = {};
    output = "";
    trace = [];
    stepIndex = 0;
    changedVars = new Set();
    currentExplanation = "一括実行が終わりました。ステップ開始を押すと、1 行ずつ説明を見ながら進められます。";
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
