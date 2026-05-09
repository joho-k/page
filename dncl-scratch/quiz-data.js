window.quizData = {
    q001: {
        title: "合計（穴埋め）",
        addedAt: "2026-05-07",
        difficulty: 1,
        question: "sumに、xとyを合計した値を代入するプログラムを作成せよ",
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
        answers: [
            {
                values: ["x", "y"],
                correct: true,
            },
            {
                values: ["y", "x"],
                correct: true,
            },
            {
                values: ["25", "30"],
                correct: false,
                hint: "変数xとyを使おう",
            },
            {
                values: ["30", "25"],
                correct: false,
                hint: "数値ではなく変数を使おう",
            }
        ],
        defaultHint: "xとyを合計する式を考えよう"
    },
    q002: {
        title: "繰り返し回数",
        addedAt: "2026-05-08",
        difficulty: 1,
        question: "「これを3回表示してください」を3回表示するようにしよう",
        ast: [
            {
                type: "for",
                varName: "i",
                start: "0",
                end: "__BLANK_blank_a__",
                step: "1",
                body: [
                    {
                        type: "print",
                        value: "\"これを3回表示してください\""
                    }
                ]
            }
        ],
        choices: [
            { label: "1", value: "1" },
            { label: "2", value: "2" },
            { label: "3", value: "3" },
            { label: "4", value: "4" },
        ],
        answers: [
            {
                values: ["2"],
                correct: true,
            },
            {
                values: ["3"],
                correct: false,
                hint: "0から始まることに注意しよう",
            },
            {
                values: ["1"],
                correct: false,
                hint: "2回しか繰り返されません",
            },
            {
                values: ["4"],
                correct: false,
                hint: "5回繰り返されてしまいます",
            }
        ],
        defaultHint: "0,1,2 の3回になるように考えよう"
    },
    q003: {
        title: "2の倍数判定",
        addedAt: "2026-05-08",
        difficulty: 2,

        question: "2の倍数のときだけ「2の倍数です」と表示されるようにしよう",

        ast: [
            {
                type: "for",
                varName: "i",
                start: "1",
                end: "10",
                step: "1",
                body: [
                    {
                        type: "assign",
                        name: "amari",
                        value: "i __BLANK_blank_a__ 2"
                    },
                    {
                        type: "ifelse",
                        condition: "amari == 0",
                        ifBody: [
                            {
                                type: "print",
                                value: "i + \"は2の倍数です\""
                            }
                        ],
                        elseBody: [
                            {
                                type: "print",
                                value: "i + \"は2の倍数でない\""
                            }
                        ]
                    }
                ]
            }
        ],
        choices: [
            { label: "+", value: "+" },
            { label: "-", value: "-" },
            { label: "*", value: "*" },
            { label: "/", value: "/" },
            { label: "%", value: "%" },
        ],

        answers: [
            {
                values: ["%"],
                correct: true,
            },
            {
                values: ["/"],
                correct: false,
                hint: "割り算ではなく「あまり」を求めます",
            },
            {
                values: ["+"],
                correct: false,
                hint: "足し算では2の倍数か判定できません",
            },
            {
                values: ["-"],
                correct: false,
                hint: "引き算では2の倍数か判定できません",
            },
            {
                values: ["*"],
                correct: false,
                hint: "掛け算では「あまり」は求められません",
            }
        ],

        defaultHint: "2で割った「あまり」を求める演算子を考えよう"
    },
}
