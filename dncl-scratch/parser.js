function parse(code) {
    return code.split("\n").map(l => l.trim()).filter(l => l);
}