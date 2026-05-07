// Quiz data for DNCL Scratch Editor (quiz mode)
// Loaded as a global: window.quizData
window.quizData = {
    q001: {
        question: "sumに、xとyを合計した値を代入するプログラムを作成せよ",
        // AST format is the same as window.currentAST / buildAST(workspace)
        ast: [
            { type: "assign", name: "x", value: "25" },
            { type: "assign", name: "y", value: "30" },
            { type: "assign", name: "sum", value: "__BLANK_blank_a__ + __BLANK_blank_b__" },
            { type: "print", value: "\"xとyの合計は\" + sum" },
        ],
        choices: [
            { label: "x", value: "x" },
            { label: "y", value: "y" },
            { label: "25", value: "25" },
            { label: "30", value: "30" },
        ],
        judge(result) {
            return result.variables.sum === 55;
        },
        hints: [
            {
                check(result) {
                    return result.variables.sum === 50;
                },
                message: "同じ値を2回使っているかもしれません",
            },
        ],
    },
};
