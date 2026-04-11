function run() {
    vars = {};
    output = "";
    trace = [];
    stepIndex = 0;

    // トレース生成
    buildTrace(window.currentAST || []);

    // 全実行
    while (stepIndex < trace.length) {
        trace[stepIndex++]();
    }

    // UI更新
    document.getElementById("output").textContent = output;
    document.getElementById("vars").textContent =
        JSON.stringify(vars, null, 2);    
}

