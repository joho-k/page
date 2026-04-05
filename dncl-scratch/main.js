const codeEl = document.getElementById("code");
const outputEl = document.getElementById("output");

function run() {
    vars = {};
    output = "";

    const lines = parse(codeEl.value);

    for (let line of lines) {
        executeLine(line);
    }

    outputEl.textContent = output;
}