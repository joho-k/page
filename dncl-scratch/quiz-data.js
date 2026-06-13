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
        addedAt: "2026-05-08 12:00",
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
    q004: {
        title: "カウントダウン",
        addedAt: "2026-05-14 11:00",
        difficulty: 2,
        question: "「あと少し！」を4回表示するようにしよう",
        ast: [
            {
                type: "for",
                varName: "i",
                start: "1",
                end: "__BLANK_blank_a__",
                step: "1",
                body: [
                    {
                        type: "print",
                        value: "\"あと少し！\""
                    }
                ]
            }
        ],
        choices: [
            { label: "2", value: "2" },
            { label: "3", value: "3" },
            { label: "4", value: "4" },
            { label: "5", value: "5" },
        ],
        answers: [
            {
                values: ["4"],
                correct: true,
            },
            {
                values: ["3"],
                correct: false,
                hint: "3回しか繰り返されません",
            },
            {
                values: ["5"],
                correct: false,
                hint: "5回繰り返されてしまいます",
            },
            {
                values: ["2"],
                correct: false,
                hint: "2回しか繰り返されません",
            }
        ],
        defaultHint: "1から始まることに注目しよう"
    },
    q005: {
        title: "テスト合格判定",
        addedAt: "2026-05-14 12:00",
        difficulty: 3,
        question: "score が80以上のときだけ「合格」と表示されるようにしよう",
        ast: [
            {
                type: "assign",
                name: "score",
                value: "85"
            },
            {
                type: "if",
                condition: "score __BLANK_blank_a__ 80",
                body: [
                    {
                        type: "print",
                        value: "\"合格\""
                    }
                ]
            }
        ],
        choices: [
            { label: ">", value: ">" },
            { label: "<", value: "<" },
            { label: ">=", value: ">=" },
            { label: "<=", value: "<=" },
        ],
        answers: [
            {
                values: [">="],
                correct: true,
            },
            {
                values: [">"],
                correct: false,
                hint: "80ちょうどのときも合格にしたい",
            },
            {
                values: ["<"],
                correct: false,
                hint: "小さい場合ではありません",
            },
            {
                values: ["<="],
                correct: false,
                hint: "80以下になってしまいます",
            }
        ],
        defaultHint: "80以上になる条件を考えよう"
    },
    q006: {
        title: "HPが0になるまで",
        addedAt: "2026-05-14 13:00",
        difficulty: 3,
        question: "hp が0より大きい間、繰り返されるようにしよう",
        ast: [
            {
                type: "assign",
                name: "hp",
                value: "5"
            },
            {
                type: "while",
                condition: "hp __BLANK_blank_a__ 0",
                body: [
                    {
                        type: "print",
                        value: "\"ダメージ！\""
                    },
                    {
                        type: "assign",
                        name: "hp",
                        value: "hp - 1"
                    }
                ]
            }
        ],
        choices: [
            { label: ">", value: ">" },
            { label: "<", value: "<" },
            { label: "==", value: "==" },
            { label: "!=", value: "!=" },
        ],
        answers: [
            {
                values: [">"],
                correct: true,
            },
            {
                values: ["<"],
                correct: false,
                hint: "hpは減っていきます",
            },
            {
                values: ["=="],
                correct: false,
                hint: "最初は5なので条件を満たしません",
            },
            {
                values: ["!="],
                correct: false,
                hint: "負の値になっても止まらない可能性があります",
            }
        ],
        defaultHint: "hpが残っている間、繰り返したい"
    },
    q007: {
        title: "合計金額の計算",
        addedAt: "2026-06-13",
        difficulty: 1,
        question: "1個120円のりんごを3個買ったときの合計金額が表示されるようにしよう",
        ast: [
            {
                type: "assign",
                name: "price",
                value: "120"
            },
            {
                type: "assign",
                name: "kosu",
                value: "3"
            },
            {
                type: "assign",
                name: "goukei",
                value: "price __BLANK_blank_a__ kosu"
            },
            {
                type: "print",
                value: "\"合計金額は\" + goukei + \"円\""
            }
        ],
        choices: [
            { label: "+", value: "+" },
            { label: "-", value: "-" },
            { label: "*", value: "*" },
            { label: "/", value: "/" },
        ],
        answers: [
            {
                values: ["*"],
                correct: true,
            },
            {
                values: ["+"],
                correct: false,
                hint: "足し算では「120個ぶんの代金」になりません",
            },
            {
                values: ["-"],
                correct: false,
                hint: "引き算では合計金額になりません",
            },
            {
                values: ["/"],
                correct: false,
                hint: "割り算では合計金額になりません",
            }
        ],
        defaultHint: "単価×個数で合計金額を求めよう"
    },
    q008: {
        title: "偶数の合計（1〜10）",
        addedAt: "2026-06-13",
        difficulty: 3,
        question: "1から10までの整数のうち、偶数だけを合計して表示するようにしよう（3か所の穴をうめよう）",
        ast: [
            {
                type: "assign",
                name: "goukei",
                value: "0"
            },
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
                        value: "i __BLANK_blank_c1__ 2"
                    },
                    {
                        type: "if",
                        condition: "amari __BLANK_blank_c2__ 0",
                        body: [
                            {
                                type: "assign",
                                name: "goukei",
                                value: "goukei __BLANK_blank_c3__ i"
                            }
                        ]
                    }
                ]
            },
            {
                type: "print",
                value: "\"偶数の合計は\" + goukei"
            }
        ],
        choices: [
            { label: "+", value: "+" },
            { label: "-", value: "-" },
            { label: "*", value: "*" },
            { label: "/", value: "/" },
            { label: "%", value: "%" },
            { label: "==", value: "==" },
            { label: "!=", value: "!=" },
            { label: ">", value: ">" }
        ],
        answers: [
            {
                values: ["%", "==", "+"],
                correct: true,
            },
            {
                values: ["/", "==", "+"],
                correct: false,
                hint: "1つ目は「偶数か」を判定するための“あまり”を求めます。割り算ではありません",
            },
            {
                values: ["%", "!=", "+"],
                correct: false,
                hint: "あまりが0のとき偶数です。!= では奇数を合計してしまいます",
            },
            {
                values: ["%", "==", "*"],
                correct: false,
                hint: "合計は今までの値に i を足していきます。掛け算ではありません",
            },
            {
                values: ["%", ">", "+"],
                correct: false,
                hint: "あまりがちょうど0のときを選びたいので > ではありません",
            }
        ],
        defaultHint: "2で割ったあまりが0なら偶数。その i を goukei に足していこう"
    }
}
