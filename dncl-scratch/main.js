function run() {
    vars = {};
    output = "";

    const ast = window.currentAST || [];

    executeAST(ast);

    document.getElementById("output").textContent = output;
}