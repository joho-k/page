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
        addedAt: "2026-06-14",
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
                        value: "i % 2"
                    },
                    {
                        type: "if",
                        condition: "amari == 0",
                        body: [
                            {
                                type: "assign",
                                name: "goukei",
                                value: "__BLANK_blank_c1__ __BLANK_blank_c2__ __BLANK_blank_c3__"
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
            { label: "goukei", value: "goukei" },
            { label: "i", value: "i" },
            { label: "amari", value: "amari" },
            { label: "+", value: "+" },
            { label: "-", value: "-" },
            { label: "*", value: "*" },
            { label: "/", value: "/" }
        ],
        answers: [
            {
                values: ["goukei", "+", "i"],
                correct: true,
            },
            {
                values: ["i", "+", "goukei"],
                correct: true,
            },
            {
                values: ["goukei", "*", "i"],
                correct: false,
                hint: "合計は今までの値に i を足していきます。掛け算ではありません",
            },
            {
                values: ["goukei", "-", "i"],
                correct: false,
                hint: "引き算では合計になりません。足し算で積み上げます",
            },
            {
                values: ["amari", "+", "i"],
                correct: false,
                hint: "足し込む先は合計を入れている goukei です。amari ではありません",
            }
        ],
        defaultHint: "これまでの合計 goukei に i を足して、新しい goukei にしよう"
    },
    q009: {
        title: "平均点の計算",
        addedAt: "2026-06-15",
        difficulty: 1,
        question: "5人のテストの合計点が140点のとき、1人あたりの平均点が表示されるようにしよう",
        ast: [
            {
                type: "assign",
                name: "goukei",
                value: "140"
            },
            {
                type: "assign",
                name: "ninzu",
                value: "5"
            },
            {
                type: "assign",
                name: "heikin",
                value: "goukei __BLANK_blank_a__ ninzu"
            },
            {
                type: "print",
                value: "\"平均点は\" + heikin + \"点\""
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
                values: ["/"],
                correct: true,
            },
            {
                values: ["+"],
                correct: false,
                hint: "足し算では平均になりません",
            },
            {
                values: ["-"],
                correct: false,
                hint: "引き算では平均になりません",
            },
            {
                values: ["*"],
                correct: false,
                hint: "掛け算では人数ぶん増えてしまいます",
            }
        ],
        defaultHint: "合計を人数で割ると平均になるよ。割り算の記号は(/)です。"
    },
    q010: {
        title: "2ずつ増やして表示",
        addedAt: "2026-06-16",
        difficulty: 2,
        question: "0から始めて2ずつ増やし、0 2 4 6 8 と表示するようにしよう",
        ast: [
            {
                type: "for",
                varName: "i",
                start: "0",
                end: "9",
                step: "__BLANK_blank_a__",
                body: [
                    {
                        type: "print",
                        value: "i"
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
                values: ["1"],
                correct: false,
                hint: "1ずつだと 0 1 2 …と全部の数が表示されてしまいます",
            },
            {
                values: ["3"],
                correct: false,
                hint: "3ずつだと 0 3 6 9 になってしまいます",
            },
            {
                values: ["4"],
                correct: false,
                hint: "4ずつだと 0 4 8 になってしまいます",
            }
        ],
        defaultHint: "ひとつ進むごとにいくつ増やせば 0 2 4 6 8 になるか考えよう"
    },
    q011: {
        title: "1から5までの積",
        addedAt: "2026-06-17",
        difficulty: 3,
        question: "1から5までの整数をすべてかけ合わせた値（1×2×3×4×5）が表示されるようにしよう",
        ast: [
            {
                type: "assign",
                name: "seki",
                value: "1"
            },
            {
                type: "for",
                varName: "i",
                start: "1",
                end: "5",
                step: "1",
                body: [
                    {
                        type: "assign",
                        name: "seki",
                        value: "__BLANK_blank_a__ * i"
                    }
                ]
            },
            {
                type: "print",
                value: "\"答えは\" + seki"
            }
        ],
        choices: [
            { label: "seki", value: "seki" },
            { label: "i", value: "i" },
            { label: "1", value: "1" },
            { label: "5", value: "5" },
        ],
        answers: [
            {
                values: ["seki"],
                correct: true,
            },
            {
                values: ["i"],
                correct: false,
                hint: "i × i になってしまい、これまでの積を引き継げません",
            },
            {
                values: ["1"],
                correct: false,
                hint: "毎回 1 × i になり、積が積み上がりません（最後は5のまま）",
            },
            {
                values: ["5"],
                correct: false,
                hint: "毎回 5 × i になり、1から5までの積にはなりません",
            }
        ],
        defaultHint: "これまでの積が入っている seki に i をかけて、新しい seki にしよう"
    },
    q012: {
        title: "配ったおかしの数（二重ループ）",
        addedAt: "2026-06-18",
        difficulty: 4,
        question: "お菓子の個数が15個あります。3人の友だちに、おかしを1人あたり同じ数ずつ配れるように、空欄を埋めよう。",
        ast: [
            {
                type: "assign",
                name: "kosu",
                value: "15"
            },
            {
                type: "for",
                varName: "hito",
                start: "1",
                end: "3",
                step: "1",
                body: [
                    {
                        type: "print",
                        value: "hito + \"人目にお菓子を配ります。\""
                    },
                    {
                        type: "for",
                        varName: "okashi",
                        start: "1",
                        end: "__BLANK_blank_a__",
                        step: "1",
                        body: [
                            {
                                type: "assign",
                                name: "kosu",
                                value: "kosu - 1"
                            },
                            {
                                type: "print",
                                value: "\"  \" + okashi + \"個目のお菓子を渡しました。残りは\" + kosu + \"個です。\""
                            },
                        ]
                    }, {
                        value: "\"今残っているお菓子の個数は\" + kosu + \"個です。\""
                    }
                ],
            }
        ],
        choices: [
            { label: "3", value: "3" },
            { label: "5", value: "5" },
            { label: "7", value: "7" },
            { label: "15", value: "15" },
        ],
        answers: [
            {
                values: ["5"],
                correct: true,
            },
            {
                values: ["3"],
                correct: false,
                hint: "1人に3個渡していることになります。15個のお菓子を平等に渡すためには、1人に何個のお菓子を渡せばいいでしょうか？",
            },
            {
                values: ["7"],
                correct: false,
                hint: "1人に7個渡していることになります。15個のお菓子を平等に渡すためには、1人に何個のお菓子を渡せばいいでしょうか？",
            },
            {
                values: ["15"],
                correct: false,
                hint: "1人に15個渡していることになります。15個のお菓子を平等に渡すためには、1人に何個のお菓子を渡せばいいでしょうか？",
            }
        ],
        defaultHint: "15個のお菓子を平等に渡すためには、1人に何個のお菓子を渡せばいいでしょうか？"
    }
}
