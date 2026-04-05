let vars = {};
let output = "";

function executeLine(line) {

  if (line.startsWith("表示する")) {
    const val = line.match(/表示する\((.*)\)/)[1];
    output += eval(val) + "\n";
    return;
  }

  if (line.includes("=")) {
    const [name, value] = line.split("=");
    vars[name.trim()] = eval(value);
    return;
  }

  if (line.startsWith("もし")) {
    const cond = line.match(/もし (.*) ならば/)[1];
    if (!eval(cond)) return "skip";
  }
}