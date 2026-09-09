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
    },
    q013: {
        title: "最大公約数（ユークリッドの互除法）",
        addedAt: "2026-06-20",
        difficulty: 5,
        question: "ユークリッドの互除法では、2つの数が等しくなるまで「大きいほうから小さいほうを引く」操作を繰り返し、最後に残った値が最大公約数になります。2つの数 a=252, b=105 の最大公約数を求めて表示しよう。",
        ast: [
            {
                type: "assign",
                name: "a",
                value: "252"
            },
            {
                type: "assign",
                name: "b",
                value: "105"
            },
            {
                type: "while",
                condition: "a != b",
                body: [
                    {
                        type: "ifelse",
                        condition: "a __BLANK_blank_b__ b",
                        ifBody: [
                            {
                                type: "assign",
                                name: "a",
                                value: "a __BLANK_blank_c__ b"
                            }
                        ],
                        elseBody: [
                            {
                                type: "assign",
                                name: "b",
                                value: "b - a"
                            }
                        ]
                    }
                ]
            },
            {
                type: "print",
                value: "\"最大公約数は\" + a"
            }
        ],
        choices: [
            { label: "==", value: "==" },
            { label: ">", value: ">" },
            { label: "<", value: "<" },
            { label: "+", value: "+" },
            { label: "-", value: "-" }
        ],
        answers: [
            {
                values: [">", "-"],
                correct: true,
            },
            {
                values: ["<", "-"],
                correct: false,
                hint: "a<b のときに a から b を引くと a がマイナスになってしまいます。大きいほう(a>bのとき)から引きましょう",
            },
            {
                values: [">", "+"],
                correct: false,
                hint: "足し算では値がどんどん増えて等しくならず、繰り返しが終わりません。引き算で小さくしていきます",
            },
            {
                values: ["==", "-"],
                correct: false,
                hint: "a==b だと while の条件(a!=b)と矛盾し、この if は決して成り立ちません。大小を比べる > を使いましょう",
            }
        ],
        defaultHint: "「2つが等しくない間」繰り返し、「a のほうが大きいとき」だけ a から b を引く、と考えよう。最後に残った値が最大公約数です"
    },
    q014: {
        title: "平均点で合格クラス判定",
        addedAt: "2026-07-01",
        difficulty: 3,
        question: "4人のテストの合計点は240点です。平均点を求め、平均が60点以上のときだけ「合格クラス」と表示されるようにしよう（2か所の穴をうめよう）",
        ast: [
            {
                type: "assign",
                name: "goukei",
                value: "240"
            },
            {
                type: "assign",
                name: "ninzu",
                value: "4"
            },
            {
                type: "assign",
                name: "heikin",
                value: "goukei __BLANK_blank_a__ ninzu"
            },
            {
                type: "if",
                condition: "heikin __BLANK_blank_b__ 60",
                body: [
                    {
                        type: "print",
                        value: "\"合格クラス\""
                    }
                ]
            }
        ],
        choices: [
            { label: "*", value: "*" },
            { label: "/", value: "/" },
            { label: ">", value: ">" },
            { label: ">=", value: ">=" },
            { label: "<", value: "<" },
        ],
        answers: [
            {
                values: ["/", ">="],
                correct: true,
            },
            {
                values: ["*", ">="],
                correct: false,
                hint: "掛け算では平均になりません。合計を人数で割りましょう",
            },
            {
                values: ["/", ">"],
                correct: false,
                hint: "60点ちょうどのときも合格クラスにしたいです",
            },
            {
                values: ["/", "<"],
                correct: false,
                hint: "60点以上のときに合格クラスにしたいので、小さいときではありません",
            },
            {
                values: ["*", ">"],
                correct: false,
                hint: "平均は合計÷人数で求めます。また60点ちょうども合格にしたいです",
            }
        ],
        defaultHint: "まず合計を人数で割って平均を出し、その平均が60以上かどうかを判定しよう"
    },
    q015: {
        title: "一の位を取り出す",
        addedAt: "2026-07-07",
        difficulty: 3,
        question: "整数 num（＝47）の一の位（いちのくらい）の数字だけを取り出して表示するようにしよう",
        ast: [
            {
                type: "assign",
                name: "num",
                value: "47"
            },
            {
                type: "assign",
                name: "ichi",
                value: "num __BLANK_blank_a__ 10"
            },
            {
                type: "print",
                value: "\"一の位は\" + ichi"
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
                hint: "num / 10 を計算するとどうなる？ 47 / 10 は商の4になります。一の位を取り出すには「あまり」がほしいですね",
            },
            {
                values: ["+"],
                correct: false,
                hint: "num + 10 を計算するとどうなる？ 47 + 10 は 57 です。一の位の7を取り出せているでしょうか？",
            },
            {
                values: ["-"],
                correct: false,
                hint: "num - 10 を計算するとどうなる？ 47 - 10 は 37 です。一の位の7を取り出せているでしょうか？",
            },
            {
                values: ["*"],
                correct: false,
                hint: "num * 10 を計算するとどうなる？ 47 * 10 は 470 です。一の位の7を取り出せているでしょうか？",
            }
        ],
        defaultHint: "それぞれの演算子で num を計算するとどうなるか考えてみよう。10で割った「あまり」が一の位になるよ"
    },
    q016: {
        title: "3の倍数を数える",
        addedAt: "2026-07-08",
        difficulty: 3,
        question: "1から20までの整数のうち、3の倍数が何個あるかを数えて表示するようにしよう（2か所の穴をうめよう）",
        ast: [
            {
                type: "assign",
                name: "count",
                value: "0"
            },
            {
                type: "for",
                varName: "i",
                start: "1",
                end: "20",
                step: "1",
                body: [
                    {
                        type: "assign",
                        name: "amari",
                        value: "i % 3"
                    },
                    {
                        type: "if",
                        condition: "amari == 0",
                        body: [
                            {
                                type: "assign",
                                name: "count",
                                value: "count __BLANK_blank_a__ __BLANK_blank_b__"
                            }
                        ]
                    }
                ]
            },
            {
                type: "print",
                value: "\"3の倍数は\" + count + \"個\""
            }
        ],
        choices: [
            { label: "+", value: "+" },
            { label: "-", value: "-" },
            { label: "*", value: "*" },
            { label: "1", value: "1" },
            { label: "2", value: "2" },
            { label: "i", value: "i" },
        ],
        answers: [
            {
                values: ["+", "1"],
                correct: true,
            },
            {
                values: ["+", "i"],
                correct: false,
                hint: "count + i だと個数ではなく3の倍数の合計になってしまいます。数えるときは毎回1ずつ増やします",
            },
            {
                values: ["-", "1"],
                correct: false,
                hint: "引き算では count が減っていきます。見つけた数を数えるには足していきます",
            },
            {
                values: ["*", "2"],
                correct: false,
                hint: "掛け算では正しく数えられません。1個見つけるたびに1を足しましょう",
            },
            {
                values: ["+", "2"],
                correct: false,
                hint: "1個見つけるたびに2ずつ増えてしまい、個数が2倍になります。足すのは1です",
            }
        ],
        defaultHint: "3の倍数を1個見つけるたびに、count を1ずつ増やそう（count = count + 1）"
    },
    q017: {
        title: "フィボナッチ数列",
        addedAt: "2026-07-09",
        difficulty: 4,
        question: "フィボナッチ数列は、直前の2つの数をたして次の数を作る数列です（1, 1, 2, 3, 5, 8, …）。tsugi に次の数を計算したあと、zen（ひとつ前）と ima（今の数）を正しく更新して、この数列を8個表示できるようにしよう（2か所の穴をうめよう）",
        ast: [
            {
                type: "assign",
                name: "zen",
                value: "0"
            },
            {
                type: "assign",
                name: "ima",
                value: "1"
            },
            {
                type: "for",
                varName: "i",
                start: "1",
                end: "8",
                step: "1",
                body: [
                    {
                        type: "print",
                        value: "ima"
                    },
                    {
                        type: "assign",
                        name: "tsugi",
                        value: "zen + ima"
                    },
                    {
                        type: "assign",
                        name: "zen",
                        value: "__BLANK_blank_a__"
                    },
                    {
                        type: "assign",
                        name: "ima",
                        value: "__BLANK_blank_b__"
                    }
                ]
            }
        ],
        choices: [
            { label: "zen", value: "zen" },
            { label: "ima", value: "ima" },
            { label: "tsugi", value: "tsugi" },
            { label: "i", value: "i" },
        ],
        answers: [
            {
                values: ["ima", "tsugi"],
                correct: true,
            },
            {
                values: ["tsugi", "ima"],
                correct: false,
                hint: "組み合わせが逆です。zen には「ひとつ前」だった ima を、ima には新しい tsugi を入れます",
            },
            {
                values: ["ima", "ima"],
                correct: false,
                hint: "ima に ima を入れても値は変わりません。新しい数 tsugi を入れましょう",
            },
            {
                values: ["zen", "tsugi"],
                correct: false,
                hint: "zen に zen を入れても更新されません。zen には今の数 ima を移します",
            },
            {
                values: ["tsugi", "tsugi"],
                correct: false,
                hint: "両方に tsugi を入れると zen と ima が同じ値になり、数列が正しく進みません",
            }
        ],
        defaultHint: "次の数を作ったら、今の数 ima を zen へ移し、新しい tsugi を ima にします（zen ← ima、ima ← tsugi）"
    },
    q018: {
        title: "素数判定（約数の個数）",
        addedAt: "2026-07-10",
        difficulty: 5,
        question: "素数とは「1とその数自身でしか割り切れない数」で、これは「約数がちょうど2個ある数」と言いかえられます。1からnまで順に割ってみて約数の個数を数え、n=13が素数かどうかを表示しよう（3か所の穴をうめよう）",
        ast: [
            {
                type: "assign",
                name: "n",
                value: "13"
            },
            {
                type: "assign",
                name: "yakusu",
                value: "0"
            },
            {
                type: "for",
                varName: "i",
                start: "1",
                end: "n",
                step: "1",
                body: [
                    {
                        type: "assign",
                        name: "amari",
                        value: "n __BLANK_blank_a__ i"
                    },
                    {
                        type: "if",
                        condition: "amari == 0",
                        body: [
                            {
                                type: "assign",
                                name: "yakusu",
                                value: "yakusu __BLANK_blank_b__ 1"
                            }
                        ]
                    }
                ]
            },
            {
                type: "ifelse",
                condition: "yakusu __BLANK_blank_c__ 2",
                ifBody: [
                    {
                        type: "print",
                        value: "\"素数です\""
                    }
                ],
                elseBody: [
                    {
                        type: "print",
                        value: "\"素数ではありません\""
                    }
                ]
            }
        ],
        choices: [
            { label: "%", value: "%" },
            { label: "/", value: "/" },
            { label: "+", value: "+" },
            { label: "*", value: "*" },
            { label: "==", value: "==" },
            { label: ">", value: ">" },
            { label: ">=", value: ">=" }
        ],
        answers: [
            {
                values: ["%", "+", "=="],
                correct: true,
            },
            {
                values: ["/", "+", "=="],
                correct: false,
                hint: "割り算の答えでは「割り切れるかどうか」は分かりません。わったあまりが0かを見たいので % を使います",
            },
            {
                values: ["%", "*", "=="],
                correct: false,
                hint: "yakusu は0から始まるので掛け算では0のまま増えません。約数を1個ずつ + で数えます",
            },
            {
                values: ["%", "+", ">"],
                correct: false,
                hint: "「約数が2個より多い」だと、約数がたくさんある数まで素数と判定してしまいます。ちょうど2個(==)が素数の条件です",
            },
            {
                values: ["%", "+", ">="],
                correct: false,
                hint: "「約数が2個以上」だと、約数を多く持つ合成数もすべて素数になってしまいます。ちょうど2個だけを == で判定します",
            }
        ],
        defaultHint: "n を i でわったあまりが0なら、i は n の約数です。約数の個数を数え、それがちょうど2個(1と自分自身のみ)なら素数、と考えよう"
    },
    q019: {
        title: "買い物のおつり",
        addedAt: "2026-07-11",
        difficulty: 2,
        question: "300円と450円の品物を買い、1000円札を出しました。2つの品物の合計金額を求めてから、おつりがいくらになるかを表示しよう（2か所の穴をうめよう）",
        ast: [
            {
                type: "assign",
                name: "nedan1",
                value: "300"
            },
            {
                type: "assign",
                name: "nedan2",
                value: "450"
            },
            {
                type: "assign",
                name: "goukei",
                value: "nedan1 __BLANK_blank_a__ nedan2"
            },
            {
                type: "assign",
                name: "harau",
                value: "1000"
            },
            {
                type: "assign",
                name: "otsuri",
                value: "harau __BLANK_blank_b__ goukei"
            },
            {
                type: "print",
                value: "\"おつりは\" + otsuri + \"円\""
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
                values: ["+", "-"],
                correct: true,
            },
            {
                values: ["-", "-"],
                correct: false,
                hint: "2つの品物の合計金額は「足し算」で求めます。引き算だと 300 - 450 になってしまい、合計になりません",
            },
            {
                values: ["+", "+"],
                correct: false,
                hint: "おつりは「払ったお金 - 代金」で求めます。足し算だと払ったお金と代金がさらに増えてしまいます",
            },
            {
                values: ["*", "-"],
                correct: false,
                hint: "合計金額は 300 と 450 を足すだけです。掛け算だと 300 × 450 になってしまいます",
            },
            {
                values: ["+", "*"],
                correct: false,
                hint: "おつりは払ったお金から代金を引きます。掛け算では 1000 × 750 になってしまい、おつりになりません",
            }
        ],
        defaultHint: "まず2つの品物の値段を足して合計を出し、次に払ったお金(1000円)からその合計を引くとおつりが求まるよ"
    },
    q020: {
        title: "残りのページ数",
        addedAt: "2026-07-13",
        difficulty: 1,
        question: "全部で120ページの本を、45ページまで読みました。残りが何ページあるかを表示するようにしよう",
        ast: [
            {
                type: "assign",
                name: "zentai",
                value: "120"
            },
            {
                type: "assign",
                name: "yonda",
                value: "45"
            },
            {
                type: "assign",
                name: "nokori",
                value: "zentai __BLANK_blank_a__ yonda"
            },
            {
                type: "print",
                value: "\"残りは\" + nokori + \"ページ\""
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
                values: ["-"],
                correct: true,
            },
            {
                values: ["+"],
                correct: false,
                hint: "足し算だと 120 + 45 で 165 ページになり、本のページ数より多くなってしまいます",
            },
            {
                values: ["*"],
                correct: false,
                hint: "掛け算だと 120 × 45 になってしまいます。残りは「全体から読んだぶんを取り除いた数」です",
            },
            {
                values: ["/"],
                correct: false,
                hint: "割り算では残りのページ数になりません。何ページ減ったかを考えよう",
            }
        ],
        defaultHint: "全体のページ数から、すでに読んだページ数を取り除くと残りが求まるよ"
    },
    q021: {
        title: "毎日2倍に増える菌",
        addedAt: "2026-07-14",
        difficulty: 2,
        question: "1日目に1個だった菌が、毎日2倍に増えます。何日目に何個になるかを表示しながら、菌の数が100個をこえるのは何日目かを求めよう。菌の増やし方と、日数の数え方の2か所の穴をうめよう",
        ast: [
            {
                type: "assign",
                name: "kin",
                value: "1"
            },
            {
                type: "assign",
                name: "nissu",
                value: "1"
            },
            {
                type: "print",
                value: "nissu + \"日目は\" + kin + \"個\""
            },
            {
                type: "while",
                condition: "kin < 100",
                body: [
                    {
                        type: "assign",
                        name: "kin",
                        value: "kin __BLANK_blank_a__ 2"
                    },
                    {
                        type: "assign",
                        name: "nissu",
                        value: "nissu __BLANK_blank_b__ 1"
                    },
                    {
                        type: "print",
                        value: "nissu + \"日目は\" + kin + \"個\""
                    }
                ]
            },
            {
                type: "print",
                value: "\"100個をこえるのは\" + nissu + \"日目\""
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
                values: ["*", "+"],
                correct: true,
            },
            {
                values: ["+", "+"],
                correct: false,
                hint: "「2倍になる」は2を足すのではなく、2をかけます。足し算だと 1, 3, 5 …と2ずつしか増えません",
            },
            {
                values: ["*", "-"],
                correct: false,
                hint: "日数は1日ずつ進むので、nissu は1ずつ増やします。引き算だと日数がマイナスになってしまいます",
            },
            {
                values: ["/", "+"],
                correct: false,
                hint: "わり算だと菌が減っていき、100個をこえないので繰り返しが終わりません",
            },
            {
                values: ["-", "+"],
                correct: false,
                hint: "引き算だと菌が増えません。「2倍に増える」を表す計算を選ぼう",
            }
        ],
        defaultHint: "1日目がすでに1個なので、2倍にするたびに日数も1ずつ進むよ。「2倍」は2をかけること"
    },
    q022: {
        title: "1000円以上で割引",
        addedAt: "2026-07-15",
        difficulty: 1,
        question: "買い物の合計金額が1000円以上のときだけ200円引きになるようにしよう。合計はちょうど1000円です。1000円のときも割引されるように、条件の穴をうめよう",
        ast: [
            {
                type: "assign",
                name: "goukei",
                value: "1000"
            },
            {
                type: "if",
                condition: "goukei __BLANK_blank_a__ 1000",
                body: [
                    {
                        type: "assign",
                        name: "goukei",
                        value: "goukei - 200"
                    }
                ]
            },
            {
                type: "print",
                value: "\"支払いは\" + goukei + \"円\""
            }
        ],
        choices: [
            { label: ">", value: ">" },
            { label: ">=", value: ">=" },
        ],
        answers: [
            {
                values: [">="],
                correct: true,
            },
            {
                values: [">"],
                correct: false,
                hint: "合計はちょうど1000円です。> だと1000円のときに割引されません。「1000円以上」はイコールをふくむ >= を使います",
            }
        ],
        defaultHint: "「1000円以上」はちょうど1000円もふくむので >=。イコールをふくむ >= を使うよ"
    },
    q023: {
        title: "各桁の数字の合計",
        addedAt: "2026-07-16",
        difficulty: 4,
        question: "整数 num（＝1234）の各桁の数字（1と2と3と4）をすべて合計して表示するようにしよう。一の位を取り出して合計にたし、10でわって桁をひとつ減らすことを、num が0になるまで繰り返します（3か所の穴をうめよう）",
        ast: [
            {
                type: "assign",
                name: "num",
                value: "1234"
            },
            {
                type: "assign",
                name: "goukei",
                value: "0"
            },
            {
                type: "while",
                condition: "num > 0",
                body: [
                    {
                        type: "assign",
                        name: "ichi",
                        value: "num __BLANK_blank_a__ 10"
                    },
                    {
                        type: "assign",
                        name: "goukei",
                        value: "goukei __BLANK_blank_b__ ichi"
                    },
                    {
                        type: "assign",
                        name: "tsugi",
                        value: "num __BLANK_blank_c__ 10"
                    },
                    {
                        type: "assign",
                        name: "num",
                        value: "切り捨て(tsugi)"
                    }
                ]
            },
            {
                type: "print",
                value: "\"各桁の合計は\" + goukei"
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
                values: ["%", "+", "/"],
                correct: true,
            },
            {
                values: ["/", "+", "/"],
                correct: false,
                hint: "一の位を取り出すには10でわった「あまり」がほしいです。/ だと商（1234÷10＝123）になり、一の位の数字になりません。% を使いましょう",
            },
            {
                values: ["%", "+", "%"],
                correct: false,
                hint: "桁をひとつ減らすには10で「わって」商にします。% だと num が同じあまりのままになり、0にならず繰り返しが終わりません。/ を使いましょう",
            },
            {
                values: ["%", "*", "/"],
                correct: false,
                hint: "合計は取り出した数字を「たして」いきます。goukei は0から始まるので掛け算では0のまま増えません。+ を使いましょう",
            },
            {
                values: ["%", "-", "/"],
                correct: false,
                hint: "引き算では合計が増えるどころかマイナスになっていきます。取り出した一の位を + でたし込みましょう",
            }
        ],
        defaultHint: "num % 10 で一の位を取り出して goukei にたし、num / 10 で桁をひとつ減らす、と考えよう。これを num が0になるまで繰り返せば各桁の合計になります"
    },
    q024: {
        title: "コラッツ予想（角谷の問題）",
        addedAt: "2026-07-17",
        difficulty: 5,
        question: "「偶数なら2でわる、奇数なら3倍して1をたす」を繰り返すと、どんな数でもいつかは1になる、というのがコラッツ予想（角谷の問題）です。n=6 が何回で1になるかを数えて表示しよう。まず n を2でわったあまりで偶数か奇数かを調べ、偶数なら半分に、奇数なら3n+1にします（3か所の穴をうめよう）",
        ast: [
            {
                type: "assign",
                name: "n",
                value: "6"
            },
            {
                type: "assign",
                name: "kaisu",
                value: "0"
            },
            {
                type: "while",
                condition: "n > 1",
                body: [
                    {
                        type: "assign",
                        name: "amari",
                        value: "__BLANK_blank_a__"
                    },
                    {
                        type: "ifelse",
                        condition: "amari == 0",
                        ifBody: [
                            {
                                type: "assign",
                                name: "n",
                                value: "__BLANK_blank_b__"
                            }
                        ],
                        elseBody: [
                            {
                                type: "assign",
                                name: "n",
                                value: "__BLANK_blank_c__"
                            }
                        ]
                    },
                    {
                        type: "assign",
                        name: "kaisu",
                        value: "kaisu + 1"
                    }
                ]
            },
            {
                type: "print",
                value: "\"回数は\" + kaisu"
            }
        ],
        choices: [
            { label: "n % 2", value: "n % 2" },
            { label: "n / 2", value: "n / 2" },
            { label: "n * 3 + 1", value: "n * 3 + 1" },
            { label: "n * 2", value: "n * 2" },
            { label: "n - 2", value: "n - 2" },
        ],
        answers: [
            {
                values: ["n % 2", "n / 2", "n * 3 + 1"],
                correct: true,
            },
            {
                values: ["n / 2", "n / 2", "n * 3 + 1"],
                correct: false,
                hint: "偶数か奇数かは2でわった「あまり」で調べます。n / 2 では商になってしまうので、n % 2 を使いましょう",
            },
            {
                values: ["n % 2", "n * 2", "n * 3 + 1"],
                correct: false,
                hint: "偶数のときは半分にします。2倍ではなく n / 2 を使います",
            },
            {
                values: ["n % 2", "n - 2", "n * 3 + 1"],
                correct: false,
                hint: "偶数のときは2を引くのではなく、2で割って半分にします",
            },
            {
                values: ["n % 2", "n / 2", "n * 2"],
                correct: false,
                hint: "奇数のときは「3倍して1をたす」ので、n * 3 + 1 を使いましょう",
            }
        ],
        defaultHint: "偶数・奇数は n % 2 で判定します。偶数なら n / 2、奇数なら n * 3 + 1 にして繰り返します"
    }, q025: {
        title: "ナベアツ算",
        addedAt: "2026-07-20",
        difficulty: 5,
        question: "1から40までの整数について、「3の倍数」または「3のつく数」のときに「🤪」、それ以外は「🤨」を表示するプログラムです。3の倍数かどうか、3が数字についているかどうかの式を、それぞれ選択肢から選んで空欄に入れよう（3か所の穴をうめよう）",
        ast: [
            {
                type: "print",
                value: "\"3の倍数と3のつくときにアホ(🤪)になります\""
            },
            {
                type: "for",
                varName: "i",
                start: "1",
                end: "40",
                step: "1",
                body: [
                    {
                        type: "assign",
                        name: "kao",
                        value: "\"🤨\""
                    },
                    {
                        type: "assign",
                        name: "amari",
                        value: "__BLANK_blank_a__"
                    },
                    {
                        type: "ifelse",
                        condition: "amari == 0",
                        ifBody: [
                            {
                                type: "assign",
                                name: "kao",
                                value: "\"🤪\""
                            }
                        ],
                        elseBody: [
                            {
                                type: "assign",
                                name: "juu_no_kurai",
                                value: "__BLANK_blank_b__"
                            },
                            {
                                type: "assign",
                                name: "ichi_no_kurai",
                                value: "__BLANK_blank_c__"
                            },
                            {
                                type: "ifelse",
                                condition: "juu_no_kurai == 3",
                                ifBody: [
                                    {
                                        type: "assign",
                                        name: "kao",
                                        value: "\"🤪\""
                                    }
                                ],
                                elseBody: [
                                    {
                                        type: "if",
                                        condition: "ichi_no_kurai == 3",
                                        body: [
                                            {
                                                type: "assign",
                                                name: "kao",
                                                value: "\"🤪\""
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        type: "print",
                        value: "kao + \"< \" + i"
                    }
                ]
            }
        ],
        choices: [
            { label: "i % 3", value: "i % 3" },
            { label: "i % 10", value: "i % 10" },
            { label: "i / 3", value: "i / 3" },
            { label: "i / 10", value: "i / 10" },
            { label: "切り捨て(i / 3)", value: "切り捨て(i / 3)" },
            { label: "切り捨て(i / 10)", value: "切り捨て(i / 10)" },
            { label: "i % 5", value: "i % 5" },
        ],
        answers: [
            {
                values: [
                    "i % 3",
                    "切り捨て(i / 10)",
                    "i % 10"
                ],
                correct: true,
            },
            {
                values: [
                    "i / 3",
                    "切り捨て(i / 10)",
                    "i % 10"
                ],
                correct: false,
                hint: "3の倍数かどうかは、3で割った「あまり」が0かどうかで判定します。3で割った商では判定できません。"
            },
            {
                values: [
                    "i % 3",
                    "i / 10",
                    "i % 10"
                ],
                correct: false,
                hint: "十の位を取り出すには、小数部分を切り捨てる必要があります。切り捨て(i / 10) を使いましょう。"
            },
            {
                values: [
                    "i % 3",
                    "切り捨て(i / 3)",
                    "i % 10"
                ],
                correct: false,
                hint: "十の位を取り出すには10で割ります。3で割ると十の位は取り出せません。"
            },
            {
                values: [
                    "i % 3",
                    "切り捨て(i / 10)",
                    "i / 10"
                ],
                correct: false,
                hint: "一の位は10で割った「あまり」です。i % 10 を使いましょう。"
            },
            {
                values: [
                    "i % 5",
                    "切り捨て(i / 10)",
                    "i % 10"
                ],
                correct: false,
                hint: "3の倍数かどうかを調べるので、3で割ったあまり（i % 3）を使います。"
            }
        ],
        defaultHint: "3の倍数は「3で割ったあまり」が0かどうかで判定します。十の位は切り捨て(i / 10)、一の位は i % 10 で取り出せます。"
    }, q026: {
        title: "秒を分と秒に直す",
        addedAt: "2026-07-22",
        difficulty: 3,
        question: "500秒は何分何秒でしょうか。1分は60秒です。分の数と、残りの秒数をそれぞれ計算して「8分20秒」のように表示するようにしよう（2か所の穴をうめよう）",
        ast: [
            {
                type: "assign",
                name: "byou",
                value: "500"
            },
            {
                type: "assign",
                name: "fun",
                value: "__BLANK_blank_a__"
            },
            {
                type: "assign",
                name: "nokori",
                value: "__BLANK_blank_b__"
            },
            {
                type: "print",
                value: "byou + \"秒は\" + fun + \"分\" + nokori + \"秒です\""
            }
        ],
        choices: [
            { label: "切り捨て(byou / 60)", value: "切り捨て(byou / 60)" },
            { label: "byou % 60", value: "byou % 60" },
            { label: "byou / 60", value: "byou / 60" },
            { label: "byou * 60", value: "byou * 60" },
            { label: "byou - 60", value: "byou - 60" },
        ],
        answers: [
            {
                values: [
                    "切り捨て(byou / 60)",
                    "byou % 60"
                ],
                correct: true,
            },
            {
                values: [
                    "byou / 60",
                    "byou % 60"
                ],
                correct: false,
                hint: "500 / 60 は 8.333… になり、「8.333…分」と表示されてしまいます。小数部分を落として8分にするには 切り捨て(byou / 60) を使いましょう"
            },
            {
                values: [
                    "byou % 60",
                    "切り捨て(byou / 60)"
                ],
                correct: false,
                hint: "2つが逆です。60でわった「商」が分の数、60でわった「あまり」が残りの秒数になります"
            },
            {
                values: [
                    "切り捨て(byou / 60)",
                    "byou - 60"
                ],
                correct: false,
                hint: "byou - 60 は 500 - 60 で440です。60秒を1回ぶんしか取り除けていません。何回ぶん取り除いても残るのが「あまり」なので byou % 60 を使いましょう"
            },
            {
                values: [
                    "byou * 60",
                    "byou % 60"
                ],
                correct: false,
                hint: "秒を分に直すときは60でかけるのではなく、60でわります。500 * 60 では逆に大きくなってしまいます"
            },
            {
                values: [
                    "切り捨て(byou / 60)",
                    "byou / 60"
                ],
                correct: false,
                hint: "残りの秒数がほしいので、わり算の「あまり」を使います。byou % 60 なら 500 を 60 でわったあまりの20が出ます"
            }
        ],
        defaultHint: "1分＝60秒なので、60でわった「商」が分、「あまり」が残りの秒数です。商は小数が出ないように 切り捨て(...) を、あまりは % を使いましょう"
    }, q027: {
        title: "数字を逆順にする",
        addedAt: "2026-07-23",
        difficulty: 4,
        question: "整数 num（＝1234）の数字を逆の順（4321）に並べかえて表示するようにしよう。一の位を取り出し、これまでの結果(gyaku)を10倍して桁を上げてから一の位をたし、num を10でわって桁をひとつ減らすことを、num が0になるまで繰り返します（3か所の穴をうめよう）",
        ast: [
            {
                type: "assign",
                name: "num",
                value: "1234"
            },
            {
                type: "assign",
                name: "gyaku",
                value: "0"
            },
            {
                type: "while",
                condition: "num > 0",
                body: [
                    {
                        type: "assign",
                        name: "ichi",
                        value: "num __BLANK_blank_a__ 10"
                    },
                    {
                        type: "assign",
                        name: "gyaku",
                        value: "gyaku __BLANK_blank_b__ 10 + ichi"
                    },
                    {
                        type: "assign",
                        name: "tsugi",
                        value: "num __BLANK_blank_c__ 10"
                    },
                    {
                        type: "assign",
                        name: "num",
                        value: "切り捨て(tsugi)"
                    }
                ]
            },
            {
                type: "print",
                value: "\"逆順にすると\" + gyaku"
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
                values: ["%", "*", "/"],
                correct: true,
            },
            {
                values: ["/", "*", "/"],
                correct: false,
                hint: "一の位を取り出すには10でわった「あまり」がほしいです。/ だと商（1234÷10＝123）になり、一の位の数字になりません。% を使いましょう",
            },
            {
                values: ["%", "+", "/"],
                correct: false,
                hint: "gyaku + 10 + ichi では、これまでの結果を10倍して桁を上げることができません。位を1つ上げるには「かけ算」で gyaku * 10 とします",
            },
            {
                values: ["%", "-", "/"],
                correct: false,
                hint: "引き算では gyaku がどんどんマイナスになってしまいます。桁を1つ上げるのは gyaku * 10 です",
            },
            {
                values: ["%", "*", "%"],
                correct: false,
                hint: "桁をひとつ減らすには10で「わって」商にします。% だと num があまりのままになり、0にならず繰り返しが終わりません。/ を使いましょう",
            }
        ],
        defaultHint: "num % 10 で一の位を取り出し、これまでの結果を gyaku * 10 で桁上げしてから一の位をたす、そして num / 10 で桁をひとつ減らす、と考えよう。1234→4→43→432→4321 と組み立てていきます"
    }, q028: {
        title: "摂氏を華氏に変換",
        addedAt: "2026-07-25",
        difficulty: 2,
        question: "摂氏の気温 C（＝20）を華氏に変換して表示するようにしよう。華氏は「摂氏を9倍して5でわり、32をたす」で求められます。まず9倍した bai を、5でわって shou を、最後に32をたして F を作ります（2か所の穴をうめよう）",
        ast: [
            {
                type: "assign",
                name: "C",
                value: "20"
            },
            {
                type: "assign",
                name: "bai",
                value: "C __BLANK_blank_a__ 9"
            },
            {
                type: "assign",
                name: "shou",
                value: "bai / 5"
            },
            {
                type: "assign",
                name: "F",
                value: "shou __BLANK_blank_b__ 32"
            },
            {
                type: "print",
                value: "\"摂氏\" + C + \"度は華氏\" + F + \"度\""
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
                values: ["*", "+"],
                correct: true,
            },
            {
                values: ["*", "-"],
                correct: false,
                hint: "最後は32をたします。36 - 32 ＝ 4 になってしまいます。+ を使って 36 + 32 ＝ 68 とします",
            },
            {
                values: ["/", "+"],
                correct: false,
                hint: "「9倍」なのでわり算ではなくかけ算です。20 / 9 では9倍になりません。* を使って 20 * 9 ＝ 180 とします",
            },
            {
                values: ["+", "+"],
                correct: false,
                hint: "「9倍」はたし算ではなくかけ算です。20 + 9 ＝ 29 では9倍になりません。* を使って 20 * 9 ＝ 180 とします",
            },
            {
                values: ["*", "*"],
                correct: false,
                hint: "最後は32をかけるのではなくたします。36 * 32 ＝ 1152 と大きくなりすぎます。+ を使って 36 + 32 ＝ 68 とします",
            }
        ],
        defaultHint: "華氏 ＝ 摂氏 × 9 ÷ 5 ＋ 32 です。「9倍」は * 、最後の「32をたす」は + を使います。20 * 9 ＝ 180、180 / 5 ＝ 36、36 + 32 ＝ 68 と考えよう"
    }, q029: {
        title: "ビットと2の累乗",
        addedAt: "2026-07-26",
        difficulty: 3,
        question: "コンピュータは0と1を並べて数を表します。bit（＝8）ビットで表せる場合の数と、そのとき表せる最大の整数を求めよう。場合の数は1に2をbit回かけて求め、表せる最大の整数は「場合の数から1をひいた値」（0から数えはじめるため）になります（2か所の穴をうめよう）",
        ast: [
            {
                type: "assign",
                name: "bit",
                value: "8"
            },
            {
                type: "assign",
                name: "baai",
                value: "1"
            },
            {
                type: "for",
                varName: "i",
                start: "1",
                end: "bit",
                step: "1",
                body: [
                    {
                        type: "assign",
                        name: "baai",
                        value: "baai __BLANK_blank_a__ 2"
                    }
                ]
            },
            {
                type: "assign",
                name: "saidai",
                value: "baai __BLANK_blank_b__ 1"
            },
            {
                type: "print",
                value: "\"場合の数は\" + baai + \"通り、最大の整数は\" + saidai"
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
                values: ["*", "-"],
                correct: true,
            },
            {
                values: ["+", "-"],
                correct: false,
                hint: "「2をかける」をくり返すので、たし算ではありません。+ だと 1 + 2 を8回で17にしかならず、2倍ずつには増えません。* を使うと 1→2→4→…→256 になります",
            },
            {
                values: ["*", "+"],
                correct: false,
                hint: "表せる最大の整数は場合の数より1小さいです（0から数えはじめるため）。+ だと 256 + 1 ＝ 257 になってしまいます。- を使って 256 - 1 ＝ 255 とします",
            },
            {
                values: ["/", "-"],
                correct: false,
                hint: "「2をかける」なのでわり算ではありません。/ だと 1 / 2 で小さくなり続けます。* を使って 2倍ずつ増やします",
            },
            {
                values: ["*", "*"],
                correct: false,
                hint: "最後は「1をひく」のでかけ算ではありません。* だと 256 * 1 ＝ 256 のままです。- を使って 256 - 1 ＝ 255 とします",
            }
        ],
        defaultHint: "8ビットは2を8回かけるので 2×2×…×2 ＝ 256通り。0から数えはじめるので表せる最大の整数は 256 − 1 ＝ 255 です。くり返しのかけ算は *、最後の「1をひく」は - を使おう"
    }, q030: {
        title: "画像のデータ量",
        addedAt: "2026-07-29",
        difficulty: 3,
        question: "デジタル画像は小さな点（画素）が並んでできています。横640画素・縦480画素で、1画素あたり24ビットで色を表す画像は何バイトになるでしょうか。画素数・全体のビット数・バイト数の順に計算しよう。1バイトは8ビットです（3か所の穴をうめよう）",
        ast: [
            {
                type: "assign",
                name: "yoko",
                value: "640"
            },
            {
                type: "assign",
                name: "tate",
                value: "480"
            },
            {
                type: "assign",
                name: "irobit",
                value: "24"
            },
            {
                type: "assign",
                name: "gasosu",
                value: "yoko __BLANK_blank_a__ tate"
            },
            {
                type: "assign",
                name: "sobit",
                value: "gasosu __BLANK_blank_b__ irobit"
            },
            {
                type: "assign",
                name: "byte",
                value: "sobit __BLANK_blank_c__ 8"
            },
            {
                type: "print",
                value: "\"画素数は\" + gasosu + \"画素、データ量は\" + byte + \"バイトです\""
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
                values: ["*", "*", "/"],
                correct: true,
            },
            {
                values: ["+", "*", "/"],
                correct: false,
                hint: "画素は縦横にびっしり並んでいるので、640 + 480 ＝ 1120 ではありません。横の640個が480行ぶん並ぶので、* を使って 640 * 480 ＝ 307200画素です",
            },
            {
                values: ["*", "+", "/"],
                correct: false,
                hint: "1画素につき24ビット使うので、307200画素ぶんの合計はかけ算です。+ だと 307200 + 24 で24ビットしか増えません。* を使いましょう",
            },
            {
                values: ["*", "*", "*"],
                correct: false,
                hint: "1バイト＝8ビットなので、ビット数を8でわるとバイト数になります。* だと逆に8倍になってしまいます。/ を使いましょう",
            },
            {
                values: ["*", "*", "%"],
                correct: false,
                hint: "% はわり算の「あまり」です。7372800 % 8 はあまりの0になってしまいます。何バイトぶんあるかを知りたいので、わり算の / を使いましょう",
            },
            {
                values: ["*", "/", "/"],
                correct: false,
                hint: "1画素あたり24ビットを「使う」ので、わり算ではなくかけ算です。/ だと 307200 / 24 ＝ 12800 とかえって小さくなってしまいます",
            },
            {
                values: ["*", "*", "-"],
                correct: false,
                hint: "8ビットのかたまりが何個あるかを数えるので、ひき算ではありません。- だと 7372800 - 8 とほとんど減りません。8でわって 921600バイトを求めます",
            }
        ],
        defaultHint: "画素数は 横 × 縦。全体のビット数は 画素数 × 1画素のビット数。バイト数はビット数 ÷ 8（1バイト＝8ビット）です"
    }, q031: {
        title: "うるう年の判定",
        addedAt: "2026-07-30",
        difficulty: 4,
        question: "うるう年は「4の倍数の年はうるう年。ただし100の倍数の年は平年。ただし400の倍数の年はうるう年」というルールで決まります。year（＝1900）について、うるう年なら uruu を1、平年なら0に書きかえながら判定するプログラムです。上から順に3つの条件で uruu を上書きしていくので、入れる式の順番がとても大事です（3か所の穴をうめよう）",
        ast: [
            {
                type: "assign",
                name: "year",
                value: "1900"
            },
            {
                type: "assign",
                name: "uruu",
                value: "0"
            },
            {
                type: "if",
                condition: "__BLANK_blank_a__ == 0",
                body: [
                    {
                        type: "assign",
                        name: "uruu",
                        value: "1"
                    }
                ]
            },
            {
                type: "if",
                condition: "__BLANK_blank_b__ == 0",
                body: [
                    {
                        type: "assign",
                        name: "uruu",
                        value: "0"
                    }
                ]
            },
            {
                type: "if",
                condition: "__BLANK_blank_c__ == 0",
                body: [
                    {
                        type: "assign",
                        name: "uruu",
                        value: "1"
                    }
                ]
            },
            {
                type: "ifelse",
                condition: "uruu == 1",
                ifBody: [
                    {
                        type: "print",
                        value: "year + \"年はうるう年です\""
                    }
                ],
                elseBody: [
                    {
                        type: "print",
                        value: "year + \"年は平年です\""
                    }
                ]
            }
        ],
        choices: [
            { label: "year % 4", value: "year % 4" },
            { label: "year % 100", value: "year % 100" },
            { label: "year % 400", value: "year % 400" },
            { label: "year / 4", value: "year / 4" },
            { label: "year / 100", value: "year / 100" },
            { label: "year / 400", value: "year / 400" },
        ],
        answers: [
            {
                values: ["year % 4", "year % 100", "year % 400"],
                correct: true,
            },
            {
                values: ["year % 400", "year % 100", "year % 4"],
                correct: false,
                hint: "順番が逆です。この並びだと最後の「4の倍数ならうるう年」がすべてを上書きしてしまい、1900年もうるう年になってしまいます。まず4の倍数でうるう年にして、次に100の倍数で平年にもどし、最後に400の倍数だけうるう年にします",
            },
            {
                values: ["year % 4", "year % 400", "year % 100"],
                correct: false,
                hint: "100と400が入れかわっています。この並びだと1900年が最後の「100の倍数」でうるう年に上書きされてしまいます。400の倍数の例外はいちばん最後に置きます",
            },
            {
                values: ["year % 100", "year % 4", "year % 400"],
                correct: false,
                hint: "1つ目は「4の倍数ならうるう年」という土台の条件です。100の倍数で先にうるう年にしてしまうと、そのあとの4の倍数で平年にもどってしまい、2024年のようなふつうのうるう年が平年になります",
            },
            {
                values: ["year / 4", "year % 100", "year % 400"],
                correct: false,
                hint: "「4の倍数かどうか」はわり算の「あまり」が0かで調べます。year / 4 は商なので 1900 / 4 ＝ 475 となり、0にならず倍数の判定ができません。% を使いましょう",
            },
            {
                values: ["year % 4", "year / 100", "year % 400"],
                correct: false,
                hint: "「100の倍数かどうか」も「あまり」で調べます。year / 100 は商の19になってしまい、0かどうかでは判定できません。year % 100 なら 1900 のあまりは0になります",
            },
            {
                values: ["year % 4", "year % 100", "year / 400"],
                correct: false,
                hint: "「400の倍数かどうか」も「あまり」で調べます。year / 400 は商なので、2000年でも 5 となって0になりません。year % 400 を使いましょう",
            },
            {
                values: ["year % 4", "year % 4", "year % 400"],
                correct: false,
                hint: "同じ条件を2回書くと、4の倍数の年をうるう年にしてすぐ平年にもどしてしまいます。2つ目には「100の倍数なら平年」の year % 100 を入れます",
            }
        ],
        defaultHint: "ルールの文章と同じ順番に、4 → 100 → 400 と書いていきます。上の行から順に uruu が上書きされるので、あとに書いた例外のほうが強くなります。倍数の判定はどれも % のあまりが0かどうかで調べよう"
    },
    q032: {
        title: "10進数を2進数に直す",
        addedAt: "2026-07-31",
        difficulty: 5,
        question: "10進数の n（＝13）を2進数の 1101 に直して表示するプログラムです。n を2でわったあまり（0か1）を下の位から順に取り出し、表示用の位（kurai＝1, 10, 100, …）をかけて足していきます。あまりの出し方、足し方、位の上げ方を選択肢から選ぼう（3か所の穴をうめよう）",
        ast: [
            {
                type: "assign",
                name: "n",
                value: "13"
            },
            {
                type: "assign",
                name: "nishin",
                value: "0"
            },
            {
                type: "assign",
                name: "kurai",
                value: "1"
            },
            {
                type: "while",
                condition: "n > 0",
                body: [
                    {
                        type: "assign",
                        name: "amari",
                        value: "__BLANK_blank_a__"
                    },
                    {
                        type: "assign",
                        name: "nishin",
                        value: "nishin + __BLANK_blank_b__"
                    },
                    {
                        type: "assign",
                        name: "kurai",
                        value: "__BLANK_blank_c__"
                    },
                    {
                        type: "assign",
                        name: "tsugi",
                        value: "n / 2"
                    },
                    {
                        type: "assign",
                        name: "n",
                        value: "切り捨て(tsugi)"
                    }
                ]
            },
            {
                type: "print",
                value: "\"2進数にすると\" + nishin"
            }
        ],
        choices: [
            { label: "n % 2", value: "n % 2" },
            { label: "n / 2", value: "n / 2" },
            { label: "amari * kurai", value: "amari * kurai" },
            { label: "amari + kurai", value: "amari + kurai" },
            { label: "kurai * 10", value: "kurai * 10" },
            { label: "kurai * 2", value: "kurai * 2" },
        ],
        answers: [
            {
                values: ["n % 2", "amari * kurai", "kurai * 10"],
                correct: true,
            },
            {
                values: ["n / 2", "amari * kurai", "kurai * 10"],
                correct: false,
                hint: "2進数の各けたは「2でわったあまり」です。n / 2 だと商（13÷2＝6）になり、0か1になりません。n % 2 を使いましょう",
            },
            {
                values: ["n % 2", "amari + kurai", "kurai * 10"],
                correct: false,
                hint: "あまり（0か1）は、そのけたの位に置きたいので位を「かけ」ます。amari + kurai だと、あまりが0のときでも位の数がそのまま足されてしまいます。amari * kurai なら、あまりが0のときは0が足されます",
            },
            {
                values: ["n % 2", "amari * kurai", "kurai * 2"],
                correct: false,
                hint: "n を2でわるので位も2倍にしたくなりますが、答えは「1101」という10進の見た目で組み立てています。kurai * 2 だと 1, 2, 4, 8 になり、1+0+4+8＝13 と元の数に戻ってしまいます。表示のけたを1つ上げるのは kurai * 10 です",
            },
            {
                values: ["n % 2", "kurai * 10", "amari * kurai"],
                correct: false,
                hint: "式を入れる場所が入れかわっています。nishin に足すのは「あまり×位」の amari * kurai、次に位を10倍するのが kurai * 10 です",
            },
            {
                values: ["n / 2", "amari + kurai", "kurai * 2"],
                correct: false,
                hint: "3か所とも違います。けたは n % 2 で取り出し、amari * kurai で位に置き、kurai * 10 で次のけたに進みます",
            }
        ],
        defaultHint: "13 → あまり1（1の位）→ 6 → あまり0（10の位）→ 3 → あまり1（100の位）→ 1 → あまり1（1000の位）→ 0 で終わり。下から 1,0,1,1 を並べて 1101 です。n % 2 であまりを取り出し、amari * kurai で位に置き、kurai * 10 で次のけたへ進みます"
    },
    q033: {
        title: "3人の中の最高点",
        addedAt: "2026-08-01",
        difficulty: 2,
        question: "3人のテストの点数 a（＝72）、b（＝85）、c（＝63）の中から、一番高い点数を見つけて表示しよう。まず saidai に a を入れておき、b・c と順に比べて「saidai より大きければ saidai を入れかえる」を繰り返します。2つの if の条件に入る比較の記号を選ぼう（2か所の穴をうめよう）",
        ast: [
            {
                type: "assign",
                name: "a",
                value: "72"
            },
            {
                type: "assign",
                name: "b",
                value: "85"
            },
            {
                type: "assign",
                name: "c",
                value: "63"
            },
            {
                type: "assign",
                name: "saidai",
                value: "a"
            },
            {
                type: "if",
                condition: "saidai __BLANK_blank_a__ b",
                body: [
                    {
                        type: "assign",
                        name: "saidai",
                        value: "b"
                    }
                ]
            },
            {
                type: "if",
                condition: "saidai __BLANK_blank_b__ c",
                body: [
                    {
                        type: "assign",
                        name: "saidai",
                        value: "c"
                    }
                ]
            },
            {
                type: "print",
                value: "\"一番高い点数は\" + saidai + \"点\""
            }
        ],
        choices: [
            { label: "<", value: "<" },
            { label: ">", value: ">" },
            { label: "==", value: "==" },
        ],
        answers: [
            {
                values: ["<", "<"],
                correct: true,
            },
            {
                values: [">", ">"],
                correct: false,
                hint: "> だと「saidai の方が大きいとき」に入れかえてしまい、小さい方が残ります。72 > 85 は成り立たず 72 のまま、次に 72 > 63 が成り立って 63 になり、答えは 63 になってしまいます",
            },
            {
                values: ["<", ">"],
                correct: false,
                hint: "1つ目は正しく 85 になりますが、2つ目が > なので 85 > 63 が成り立ち、せっかくの最高点 85 を 63 で上書きしてしまいます。2つ目も < にしましょう",
            },
            {
                values: [">", "<"],
                correct: false,
                hint: "1つ目が > だと 72 > 85 が成り立たず、最高点の b（85）を見のがしてしまいます。答えは 72 のままです。「今の saidai より大きければ入れかえる」は saidai < b と書きます",
            },
            {
                values: ["==", "<"],
                correct: false,
                hint: "== は「等しいか」を調べる記号なので、大小をくらべられません。72 == 85 は成り立たず、b の 85 を取りこぼします",
            },
            {
                values: ["==", "=="],
                correct: false,
                hint: "== は「等しいか」を調べる記号です。点数が同じときしか入れかえないので、saidai は最初の 72 のまま変わりません。大小をくらべる < を使いましょう",
            }
        ],
        defaultHint: "「今の最大 saidai より、くらべる相手の方が大きければ入れかえる」と考えよう。saidai < b なら saidai を b にします。72 → b(85) の方が大きいので 85 → c(63) は小さいのでそのまま、答えは 85 です"
    },
    q034: {
        title: "歩く速さ（時速）",
        addedAt: "2026-08-03",
        difficulty: 1,
        question: "12kmの道のりを3時間かけて歩きました。1時間あたり何km進んだか（時速）を表示するようにしよう",
        ast: [
            {
                type: "assign",
                name: "kyori",
                value: "12"
            },
            {
                type: "assign",
                name: "jikan",
                value: "3"
            },
            {
                type: "assign",
                name: "hayasa",
                value: "kyori __BLANK_blank_a__ jikan"
            },
            {
                type: "print",
                value: "\"時速\" + hayasa + \"kmです\""
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
                values: ["*"],
                correct: false,
                hint: "かけ算だと 12 × 3 で 時速36km になり、歩くどころか車なみの速さになってしまいます。12kmを3時間で「分ける」と考えよう",
            },
            {
                values: ["+"],
                correct: false,
                hint: "足し算だと 12 + 3 で 時速15km。km と 時間 という種類のちがう数どうしは足せません",
            },
            {
                values: ["-"],
                correct: false,
                hint: "ひき算だと 12 - 3 で 時速9km。ひき算では「1時間あたりに進む道のり」は求められません",
            }
        ],
        defaultHint: "速さは「1時間あたりに進む道のり」。12kmを3時間で等しく分けると、1時間ぶんが求まるよ"
    },
    q035: {
        title: "アンケートの割合（％）",
        addedAt: "2026-08-04",
        difficulty: 2,
        question: "クラス40人にアンケートをとったところ、34人が「毎日スマホを使う」と答えました。これは全体の何％かを求めて表示するようにしよう。割合（％）は「その人数を100倍してから、全体の人数でわる」で求められます。まず100倍した bai を、全体でわって wari を作ります（2か所の穴をうめよう）",
        ast: [
            {
                type: "assign",
                name: "zentai",
                value: "40"
            },
            {
                type: "assign",
                name: "tsukau",
                value: "34"
            },
            {
                type: "assign",
                name: "bai",
                value: "tsukau __BLANK_blank_a__ 100"
            },
            {
                type: "assign",
                name: "wari",
                value: "bai __BLANK_blank_b__ zentai"
            },
            {
                type: "print",
                value: "\"全体の\" + wari + \"％\""
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
                values: ["*", "/"],
                correct: true,
            },
            {
                values: ["/", "/"],
                correct: false,
                hint: "「100倍」なのでわり算ではなくかけ算です。34 / 100 では小さくなってしまいます。* を使って 34 * 100 ＝ 3400 とします",
            },
            {
                values: ["+", "/"],
                correct: false,
                hint: "「100倍」はたし算ではなくかけ算です。34 + 100 ＝ 134 では100倍になりません。* を使って 34 * 100 ＝ 3400 とします",
            },
            {
                values: ["*", "*"],
                correct: false,
                hint: "全体の人数はかけるのではなくわります。3400 * 40 ＝ 136000 と大きくなりすぎます。/ を使って 3400 / 40 ＝ 85 とします",
            },
            {
                values: ["*", "-"],
                correct: false,
                hint: "全体の人数はひくのではなくわります。3400 - 40 ＝ 3360 では割合になりません。/ を使って 3400 / 40 ＝ 85 とします",
            },
            {
                values: ["*", "%"],
                correct: false,
                hint: "% はわったあまりです。3400 % 40 ＝ 0 になってしまいます。あまりではなく商がほしいので / を使って 3400 / 40 ＝ 85 とします",
            }
        ],
        defaultHint: "割合（％）＝ その人数 × 100 ÷ 全体の人数 です。34 * 100 ＝ 3400、3400 / 40 ＝ 85 で、答えは85％になります"
    },
    q036: {
        title: "10進数を2進数に直す",
        addedAt: "2026-08-06",
        difficulty: 4,
        question: "整数 num（＝13）を2進数の表記（1101）に直して表示するようにしよう。2でわったあまり（0か1）が、下の桁から順に並びます。あまりに位の重み kurai（1, 10, 100, …）をかけて nishin にたし、num を2でわって桁をひとつ減らすことを、num が0になるまで繰り返します（3か所の穴をうめよう）",
        ast: [
            {
                type: "assign",
                name: "num",
                value: "13"
            },
            {
                type: "assign",
                name: "nishin",
                value: "0"
            },
            {
                type: "assign",
                name: "kurai",
                value: "1"
            },
            {
                type: "while",
                condition: "num > 0",
                body: [
                    {
                        type: "assign",
                        name: "amari",
                        value: "num __BLANK_blank_a__ 2"
                    },
                    {
                        type: "assign",
                        name: "nishin",
                        value: "amari __BLANK_blank_b__ kurai + nishin"
                    },
                    {
                        type: "assign",
                        name: "kurai",
                        value: "kurai * 10"
                    },
                    {
                        type: "assign",
                        name: "shou",
                        value: "num __BLANK_blank_c__ 2"
                    },
                    {
                        type: "assign",
                        name: "num",
                        value: "切り捨て(shou)"
                    }
                ]
            },
            {
                type: "print",
                value: "\"2進数にすると\" + nishin"
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
                values: ["%", "*", "/"],
                correct: true,
            },
            {
                values: ["/", "*", "/"],
                correct: false,
                hint: "2進数の各桁になるのは「2でわったあまり」です。/ だと商（13÷2＝6.5）になり、0か1になりません。% を使って 13 % 2 ＝ 1 としましょう",
            },
            {
                values: ["+", "*", "/"],
                correct: false,
                hint: "たし算では 13 + 2 ＝ 15 となり、桁の0か1になりません。あまりを出す % を使いましょう",
            },
            {
                values: ["%", "+", "/"],
                correct: false,
                hint: "あまり（0か1）を正しい桁に置くには、位の重み kurai をかけます。amari + kurai だと 1 + 100 のように位がずれてしまいます。* を使いましょう",
            },
            {
                values: ["%", "-", "/"],
                correct: false,
                hint: "ひき算では nishin がマイナスの方向にずれてしまいます。あまりを位の重みにのせるので amari * kurai です",
            },
            {
                values: ["%", "*", "%"],
                correct: false,
                hint: "桁をひとつ減らすには2で「わって」商にします。% だと num が 13 % 2 ＝ 1 のあと 1 % 2 ＝ 1 のまま変わらず、繰り返しが終わりません。/ を使いましょう",
            },
            {
                values: ["%", "*", "*"],
                correct: false,
                hint: "かけ算では num がどんどん大きくなり、0にならないので繰り返しが終わりません。桁を減らすのは num / 2 です",
            },
            {
                values: ["%", "*", "-"],
                correct: false,
                hint: "ひき算だと 13→11→9… と2ずつしか減らず、桁を半分にできません。2進数では2でわって商にします",
            }
        ],
        defaultHint: "num % 2 であまり（0か1）を取り出し、それに位の重み kurai をかけて nishin にたす、そして num / 2 で桁をひとつ減らす、と考えよう。13 → 1 → 01 → 101 → 1101 の順に下の桁から組み立てていきます"
    },
    q037: {
        title: "バーコードのチェックディジット",
        addedAt: "2026-08-07",
        difficulty: 5,
        question: "商品のバーコードの末尾にある「チェックディジット」は、読みまちがいを見つけるための1桁の数字です。7桁の番号を1桁ずつ入れた配列 code（＝[4,9,1,2,3,4,7]）があり、左から code[0], code[1], … , code[6] の7個です。下の桁（一の位）を1番目として、奇数番目の数字を3倍、偶数番目の数字を1倍し、合計 gokei を出します。その合計の下1桁 amari を10からひいたものがチェックディジットです。ただし、下1桁が0となった場合は、チェックディジットは0となります（3か所の穴をうめよう）",
        ast: [
            {
                type: "assign",
                name: "code",
                value: "[4,9,1,2,3,4,7]"
            },
            {
                type: "assign",
                name: "gokei",
                value: "0"
            },
            {
                type: "for",
                varName: "i",
                start: "1",
                end: "7",
                step: "1",
                body: [
                    {
                        type: "assign",
                        name: "banme",
                        value: "7 __BLANK_blank_a__ i"
                    },
                    {
                        type: "assign",
                        name: "keta",
                        value: "code[banme]"
                    },
                    {
                        type: "ifelse",
                        condition: "i % 2 == 1",
                        ifBody: [
                            {
                                type: "assign",
                                name: "omomi",
                                value: "3"
                            }
                        ],
                        elseBody: [
                            {
                                type: "assign",
                                name: "omomi",
                                value: "1"
                            }
                        ]
                    },
                    {
                        type: "assign",
                        name: "gokei",
                        value: "gokei + keta __BLANK_blank_b__ omomi"
                    }
                ]
            },
            {
                type: "assign",
                name: "amari",
                value: "gokei % 10"
            },
            {
                type: "ifelse",
                condition: "amari == __BLANK_blank_c__",
                ifBody: [
                    {
                        type: "assign",
                        name: "check",
                        value: "0"
                    }
                ],
                elseBody: [
                    {
                        type: "assign",
                        name: "check",
                        value: "10 - amari"
                    }
                ]
            },
            {
                type: "print",
                value: "\"チェックディジットは\" + check + \"です\""
            }
        ],
        choices: [
            { label: "+", value: "+" },
            { label: "-", value: "-" },
            { label: "*", value: "*" },
            { label: "/", value: "/" },
            { label: "%", value: "%" },
            { label: "0", value: "0" },
            { label: "1", value: "1" },
            { label: "10", value: "10" },
        ],
        answers: [
            {
                values: ["-", "*", "0"],
                correct: true,
            },
            {
                values: ["+", "*", "0"],
                correct: false,
                hint: "1つ目は「下から i 番目は配列の何番目か」を決めるところです。7 + i だと i ＝ 1 のとき code[8] になり、7個しかない配列にその番号はありません。下から1番目は右はしの code[6] なので 7 - i とします",
            },
            {
                values: ["*", "*", "0"],
                correct: false,
                hint: "7 * i だと i ＝ 1 のとき code[7] になり、配列の外を見てしまいます。番号は code[0] から code[6] までなので、7 - i で右はしからさかのぼります",
            },
            {
                values: ["/", "*", "0"],
                correct: false,
                hint: "7 / i だと i ＝ 3 のとき 2.33… と小数になり、配列の番号になりません。1ずつ左へずらしたいので、ひき算の 7 - i を使います",
            },
            {
                values: ["%", "*", "0"],
                correct: false,
                hint: "% はあまりです。7 % i だと i ＝ 1 で0、i ＝ 2 で1 とバラバラな番号になり、右から順に見ていけません。i が1ふえるごとに番号が1へるように 7 - i とします",
            },
            {
                values: ["-", "+", "0"],
                correct: false,
                hint: "重み omomi は「かける」ものです。keta + omomi だと 7 + 3 ＝ 10 となり、3倍したことになりません。keta * omomi で 7 * 3 ＝ 21 とします",
            },
            {
                values: ["-", "/", "0"],
                correct: false,
                hint: "わり算では 7 / 3 ＝ 2.33… と小数になり、3倍の重みになりません。「3倍」はかけ算なので * を使います",
            },
            {
                values: ["-", "%", "0"],
                correct: false,
                hint: "% はあまりです。keta % omomi だと 7 % 3 ＝ 1 となり、重みをかけたことになりません。3倍するのは * です",
            },
            {
                values: ["-", "*", "1"],
                correct: false,
                hint: "下1桁が1のときは 10 - 1 ＝ 9 で、ちゃんと1桁におさまります。特別あつかいがいるのは、10 - amari が2桁の10になってしまうとき、つまり下1桁が0のときです",
            },
            {
                values: ["-", "*", "10"],
                correct: false,
                hint: "amari は合計の下1桁なので0〜9にしかならず、10 になることはありません。これでは一度も使われない分岐です。2桁になってしまうのは下1桁が0のときなので、amari == 0 とします",
            }
        ],
        defaultHint: "配列の番号は code[0] から始まるので、下から i 番目は code[7 - i] です（i ＝ 1 なら右はしの code[6] ＝ 7）。重みは keta * omomi でかけます。この番号は gokei ＝ 60 なので下1桁は0。10 - 0 ＝ 10 は2桁になってしまうので、下1桁が0となった場合はチェックディジットを0とします。答えは0です"
    },
    q038: {
        title: "あめを分けたあまり",
        addedAt: "2026-08-10",
        difficulty: 1,
        question: "あめが20個あります。6人で同じ数ずつ分けると、何個あまるかを表示するようにしよう。a % b と書くと「a を b でわったあまり」が計算できます",
        ast: [
            {
                type: "assign",
                name: "ame",
                value: "20"
            },
            {
                type: "assign",
                name: "ninzu",
                value: "6"
            },
            {
                type: "assign",
                name: "amari",
                value: "ame __BLANK_blank_a__ ninzu"
            },
            {
                type: "print",
                value: "\"あまりは\" + amari + \"個です\""
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
                hint: "わり算だと 20 / 6 ＝ 3.33… となり、これは「1人分がおよそ何個か」を表す数です。ほしいのは分け終わったあとに残る個数なので、あまりを求める % を使います",
            },
            {
                values: ["-"],
                correct: false,
                hint: "ひき算だと 20 - 6 ＝ 14。これは1人に1個ずつ配っただけの残りで、6個ずつ配れるかぎり配ったあとの残りではありません",
            },
            {
                values: ["*"],
                correct: false,
                hint: "かけ算だと 20 * 6 ＝ 120 となり、あめが増えてしまいます。分けたあとに残る数はもとの20個より少ないはずです",
            },
            {
                values: ["+"],
                correct: false,
                hint: "足し算だと 20 + 6 ＝ 26。個数と人数という種類のちがう数を足しても、あまりの個数にはなりません",
            }
        ],
        defaultHint: "20個を6人に同じ数ずつ配ると、1人3個ずつで18個。配りきれずに残るのがあまりです。あまりを求める記号は % だよ"
    },
    q039: {
        title: "点数を10点きざみにする",
        addedAt: "2026-08-11",
        difficulty: 2,
        question: "テストの点数 ten（＝87点）を、10点きざみ（…70点、80点、90点）に切りそろえて表示するようにしよう。87点なら80点になります。まず10でわって小数を切り捨て、そのあと10でもとの大きさにもどします（2か所の穴をうめよう）",
        ast: [
            {
                type: "assign",
                name: "ten",
                value: "87"
            },
            {
                type: "assign",
                name: "wari",
                value: "ten __BLANK_blank_a__ 10"
            },
            {
                type: "assign",
                name: "kiri",
                value: "切り捨て(wari)"
            },
            {
                type: "assign",
                name: "kizami",
                value: "kiri __BLANK_blank_b__ 10"
            },
            {
                type: "print",
                value: "\"10点きざみにすると\" + kizami + \"点です\""
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
                values: ["/", "*"],
                correct: true,
            },
            {
                values: ["%", "*"],
                correct: false,
                hint: "% は10でわった「あまり」なので 87 % 10 ＝ 7、10倍しても70点になってしまいます。ほしいのは「10がいくつ分か」なので / でわりましょう",
            },
            {
                values: ["/", "/"],
                correct: false,
                hint: "87 / 10 ＝ 8.7 を切り捨てて8。ここでさらにわると 8 / 10 ＝ 0.8 と小さくなります。10がいくつ分かを点数にもどすには10をかけます",
            },
            {
                values: ["*", "*"],
                correct: false,
                hint: "87 * 10 ＝ 870 は切り捨てても870のまま。さらに10倍で8700点になります。まずは10でわって「10が何個分か」を求めましょう",
            },
            {
                values: ["/", "+"],
                correct: false,
                hint: "87 / 10 ＝ 8.7 を切り捨てて8。ここに10をたすと18点です。8は「10のかたまりが8個」という意味なので、たすのではなく10をかけます",
            },
            {
                values: ["-", "*"],
                correct: false,
                hint: "87 - 10 ＝ 77 を切り捨てても77、10倍して770点。ひき算では10点きざみになりません。10でわって切り捨て、10をかけるのが手順です",
            }
        ],
        defaultHint: "10点きざみにするコツは「10でわる → 切り捨てる → 10をかける」。87 / 10 ＝ 8.7、切り捨てて8、8 * 10 ＝ 80 で80点になります"
    },
    q040: {
        title: "80点以上は何人？（配列）",
        addedAt: "2026-08-12",
        difficulty: 3,
        question: "6人のテストの点数を配列 ten（＝[72,85,80,90,58,88]）に入れました。左から ten[0], ten[1], … , ten[5] の6個です。80点以上の人が何人いるかを数えて表示するようにしよう。配列の番号は0から始まること、「以上」は80そのものもふくむことに気をつけよう（2か所の穴をうめよう）",
        ast: [
            {
                type: "assign",
                name: "ten",
                value: "[72,85,80,90,58,88]"
            },
            {
                type: "assign",
                name: "nin",
                value: "0"
            },
            {
                type: "for",
                varName: "i",
                start: "0",
                end: "__BLANK_blank_a__",
                step: "1",
                body: [
                    {
                        type: "if",
                        condition: "ten[i] __BLANK_blank_b__ 80",
                        body: [
                            {
                                type: "assign",
                                name: "nin",
                                value: "nin + 1"
                            }
                        ]
                    }
                ]
            },
            {
                type: "print",
                value: "\"80点以上は\" + nin + \"人です\""
            }
        ],
        choices: [
            { label: "4", value: "4" },
            { label: "5", value: "5" },
            { label: "6", value: "6" },
            { label: ">=", value: ">=" },
            { label: ">", value: ">" },
            { label: "<=", value: "<=" },
            { label: "<", value: "<" }
        ],
        answers: [
            {
                values: ["5", ">="],
                correct: true
            },
            {
                values: ["6", ">="],
                correct: false,
                hint: "配列 ten は6個ですが、番号は ten[0] から ten[5] までです。6まで繰り返すと ten[6] を見にいってしまい、配列の外を読むことになります。個数が6なら、最後の番号は6-1で5です"
            },
            {
                values: ["4", ">="],
                correct: false,
                hint: "4までだと ten[5]（＝88点）を見ないまま終わってしまい、1人数え落とします。最後の番号は5です"
            },
            {
                values: ["5", ">"],
                correct: false,
                hint: "> だと「80より大きい」になり、ちょうど80点の ten[2] が数に入りません。「80点以上」は80そのものもふくむので >= を使います"
            },
            {
                values: ["6", ">"],
                correct: false,
                hint: "2か所とも違います。番号は ten[0]〜ten[5] なので5まで、「80点以上」は80をふくむので >= です"
            },
            {
                values: ["5", "<="],
                correct: false,
                hint: "<= だと「80点以下」の人を数えてしまいます。数えたいのは80点以上の人なので >= です"
            },
            {
                values: ["5", "<"],
                correct: false,
                hint: "< だと「80点より低い」人を数えることになります。向きが逆です。80点以上を数えるのは >= です"
            }
        ],
        defaultHint: "配列は ten[0] から始まり、6個なら最後は ten[5] です。i を0から5まで動かせば全員を1回ずつ調べられます。「80点以上」は80もふくむので >= を使おう"
    },
    q041: {
        title: "さがす数は左から何番目？（線形探索）",
        addedAt: "2026-08-13",
        difficulty: 4,
        question: "配列 data（＝[12,7,25,9,30,18]）の中から sagasu（＝25）と同じ数をさがし、それが左から何番目にあるかを表示しよう。basho は「まだ見つかっていない」というしるしとして0から始めます。配列の番号は data[0] から始まりますが、答えたいのは人が数える「左から何番目」（1から数える）であることに気をつけよう（3か所の穴をうめよう）",
        ast: [
            {
                type: "assign",
                name: "data",
                value: "[12,7,25,9,30,18]"
            },
            {
                type: "assign",
                name: "sagasu",
                value: "25"
            },
            {
                type: "assign",
                name: "basho",
                value: "0"
            },
            {
                type: "for",
                varName: "i",
                start: "0",
                end: "5",
                step: "1",
                body: [
                    {
                        type: "if",
                        condition: "data[i] __BLANK_blank_a__ sagasu",
                        body: [
                            {
                                type: "assign",
                                name: "basho",
                                value: "__BLANK_blank_b__"
                            }
                        ]
                    }
                ]
            },
            {
                type: "ifelse",
                condition: "basho __BLANK_blank_c__ 0",
                ifBody: [
                    {
                        type: "print",
                        value: "\"見つかりませんでした\""
                    }
                ],
                elseBody: [
                    {
                        type: "print",
                        value: "\"左から\" + basho + \"番目にあります\""
                    }
                ]
            }
        ],
        choices: [
            { label: "==", value: "==" },
            { label: "!=", value: "!=" },
            { label: ">=", value: ">=" },
            { label: ">", value: ">" },
            { label: "i", value: "i" },
            { label: "i + 1", value: "i + 1" },
            { label: "data[i]", value: "data[i]" }
        ],
        answers: [
            {
                values: ["==", "i + 1", "=="],
                correct: true
            },
            {
                values: ["==", "i", "=="],
                correct: false,
                hint: "i は配列の番号なので、25 が見つかるのは i が2のときです。でも人が数える「左から何番目」は3番目。番号に1をたして i + 1 にします。さらに i のままだと、data[0] で見つかったときに basho が0のままになり、「見つからなかった」と区別できなくなります"
            },
            {
                values: ["==", "data[i]", "=="],
                correct: false,
                hint: "data[i] は見つかった「値」そのもの（25）です。basho に25が入ってしまい、「25番目」と表示されます。ほしいのは値ではなく場所なので i + 1 です"
            },
            {
                values: ["!=", "i + 1", "=="],
                correct: false,
                hint: "!= は「ちがうとき」です。これだと sagasu とちがう数のたびに basho が書きかわり、最後に見た18の位置（6番目）が残ってしまいます。同じ数かどうかを調べるのは == です"
            },
            {
                values: [">=", "i + 1", "=="],
                correct: false,
                hint: ">= だと25以上の数（25と30）が両方あてはまり、あとから来た30の位置（5番目）で上書きされます。ちょうど同じ数だけを見つけたいので == を使います"
            },
            {
                values: [">", "i + 1", "=="],
                correct: false,
                hint: "> だと「25より大きい数」をさがすことになり、さがしている25そのものが当てはまりません。25と等しいかを調べる == にしましょう"
            },
            {
                values: ["==", "i + 1", "!="],
                correct: false,
                hint: "basho != 0 は「見つかった」ときに成り立ちます。でも最初の枝は「見つかりませんでした」を表示する側なので、表示が逆になります。0のままかどうかを調べる == を使います"
            },
            {
                values: ["==", "i + 1", ">"],
                correct: false,
                hint: "basho > 0 も「見つかった」という意味なので、こちらも「見つかりませんでした」と「左から○番目」が逆に出てしまいます。0のままかどうかは == 0 で調べます"
            },
            {
                values: ["==", "i", "!="],
                correct: false,
                hint: "2か所ちがいます。basho には「何番目」を入れたいので i + 1、最後の判定は0のままかどうかを見る == です"
            }
        ],
        defaultHint: "配列の番号 i は0から始まるので、「左から何番目」にするには i + 1 とします。0は「まだ見つかっていない」しるしなので、最後は basho == 0 かどうかで見つかったかを判定しよう"
    },
    q042: {
        title: "小さい順に並べかえる（となりと交換）",
        addedAt: "2026-08-14",
        difficulty: 5,
        question: "配列 data（＝[5,3,8,1]）を小さい順（1,3,5,8）に並べかえよう。となりどうし data[j] と data[j + 1] をくらべて、順番が逆なら2つを入れかえます。入れかえるときは、先に片方の値を temp によけておいてから移すのがコツです。よけずに上書きすると値が消えてしまうことに気をつけよう（3か所の穴をうめよう）",
        ast: [
            {
                type: "assign",
                name: "data",
                value: "[5,3,8,1]"
            },
            {
                type: "for",
                varName: "i",
                start: "0",
                end: "2",
                step: "1",
                body: [
                    {
                        type: "for",
                        varName: "j",
                        start: "0",
                        end: "2 - i",
                        step: "1",
                        body: [
                            {
                                type: "if",
                                condition: "data[j] __BLANK_blank_a__ data[j + 1]",
                                body: [
                                    {
                                        type: "assign",
                                        name: "temp",
                                        value: "data[j]"
                                    },
                                    {
                                        type: "assign",
                                        name: "data[j]",
                                        value: "__BLANK_blank_b__"
                                    },
                                    {
                                        type: "assign",
                                        name: "data[j + 1]",
                                        value: "__BLANK_blank_c__"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                type: "print",
                value: "data"
            }
        ],
        choices: [
            { label: ">", value: ">" },
            { label: "<", value: "<" },
            { label: "temp", value: "temp" },
            { label: "data[j]", value: "data[j]" },
            { label: "data[j + 1]", value: "data[j + 1]" }
        ],
        answers: [
            {
                values: [">", "data[j + 1]", "temp"],
                correct: true
            },
            {
                values: [">", "data[j + 1]", "data[j]"],
                correct: false,
                hint: "よけておいた temp を使わないのがおしい点です。data[j] に data[j + 1] を入れた時点で、data[j] は新しい値に変わっています。そのあと data[j + 1] に data[j] を入れると、同じ値が2つ並んでしまいます（[5,3,8,1] の最初で [3,3,8,1] になる）。もどす先には temp を使います"
            },
            {
                values: [">", "temp", "data[j + 1]"],
                correct: false,
                hint: "temp には data[j] と同じ値が入っているので、data[j] に temp を入れても何も変わりません。data[j + 1] に data[j + 1] を入れるのも同じです。つまり1回も入れかわらず、[5,3,8,1] のまま出てきます。左には相手の値、右には temp をいれましょう"
            },
            {
                values: [">", "data[j]", "temp"],
                correct: false,
                hint: "data[j] に data[j] を入れても値は変わりません。そのあと data[j + 1] に temp（＝大きいほうの値）が入るので、大きいほうが2つに増えて小さいほうが消えます（[5,3,8,1] の最初で [5,5,8,1]）。左には data[j + 1] を入れます"
            },
            {
                values: [">", "temp", "temp"],
                correct: false,
                hint: "どちらにも temp を入れると、となり合う2つが同じ値（大きいほう）になってしまいます（[5,3,8,1] の最初で [5,5,8,1]）。交換は「相手の値を自分に」「自分の値（temp）を相手に」の2手です"
            },
            {
                values: ["<", "data[j + 1]", "temp"],
                correct: false,
                hint: "< だと「左が右より小さいとき」に入れかえるので、大きい順（8,5,3,1）に並んでしまいます。小さい順にしたいので、左のほうが大きいとき＝ > のときに入れかえます"
            },
            {
                values: ["<", "data[j + 1]", "data[j]"],
                correct: false,
                hint: "2か所ちがいます。小さい順にするなら比べるのは >、もどす先は temp です。temp を使わないと、上書きしたあとの値を移すことになり同じ値が2つ並びます"
            }
        ],
        defaultHint: "2つの値の交換は3手です。①temp に data[j] をよける ②data[j] に data[j + 1] を入れる ③data[j + 1] に temp をもどす。比べるのは、左が右より大きいとき（>）だけ入れかえれば小さい順になります"
    },
    q043: {
        title: "ダウンロードにかかる時間",
        addedAt: "2026-08-15",
        difficulty: 2,
        question: "200MB（メガバイト）の動画を、通信速度100Mbps（1秒間に100メガビット送れる回線）でダウンロードすると何秒かかるでしょうか。データ量は「バイト」、通信速度は「ビット」が単位なので、まず単位をビットにそろえてから、速度でわって時間を求めます。1バイトは8ビットです（2か所の穴をうめよう）",
        ast: [
            {
                type: "assign",
                name: "size",
                value: "200"
            },
            {
                type: "assign",
                name: "speed",
                value: "100"
            },
            {
                type: "assign",
                name: "bit",
                value: "size __BLANK_blank_a__ 8"
            },
            {
                type: "assign",
                name: "byo",
                value: "bit __BLANK_blank_b__ speed"
            },
            {
                type: "print",
                value: "\"データ量は\" + bit + \"メガビット、ダウンロードに\" + byo + \"秒かかります\""
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
                values: ["*", "/"],
                correct: true,
            },
            {
                values: ["/", "/"],
                correct: false,
                hint: "1バイトは8ビットなので、バイトをビットに直すと数は8倍に増えます。/ だと 200 / 8 ＝ 25 と減ってしまい、答えも 0.25秒とおかしくなります。* を使って 200 * 8 ＝ 1600メガビットにしましょう",
            },
            {
                values: ["*", "*"],
                correct: false,
                hint: "1600メガビットを 1秒に100メガビット送れる回線で送るので、「100メガビットが何回分か」を数えます。* だと 1600 * 100 ＝ 160000秒（44時間以上）になってしまいます。/ でわりましょう",
            },
            {
                values: ["+", "/"],
                correct: false,
                hint: "200バイトに8をたすのではありません。1バイトごとに8ビットぶんあるので、+ だと 200 + 8 ＝ 208 とほとんど増えません。8倍する * が正しいです",
            },
            {
                values: ["-", "/"],
                correct: false,
                hint: "- だと 200 - 8 ＝ 192 と、かえって少なくなってしまいます。バイトをビットに直すときは8倍に増えるので * を使います",
            },
            {
                values: ["*", "-"],
                correct: false,
                hint: "1600 - 100 ＝ 1500 は「ビットの引き算」で、秒にはなりません。1秒あたり100メガビット送れるので、全体を100でわると何秒かかるかが出ます",
            },
            {
                values: ["*", "%"],
                correct: false,
                hint: "% はわり算の「あまり」です。1600 % 100 ＝ 0 になってしまい、時間が0秒になります。何秒かかるかを知りたいので / でわりましょう",
            },
            {
                values: ["*", "+"],
                correct: false,
                hint: "1600 + 100 ＝ 1700 では、速度が速いほど時間が長いことになっておかしいです。速い回線ほど短い時間ですむので、速度ではわり算をします",
            }
        ],
        defaultHint: "手順は2つ。①バイトをビットにそろえる（1バイト＝8ビットなので 200 * 8 ＝ 1600メガビット）②通信速度でわる（1600 / 100 ＝ 16秒）。単位をそろえてからわる、が計算のコツです"
    },
    q044: {
        title: "半分にしぼると何回でたどりつく？",
        addedAt: "2026-08-16",
        difficulty: 3,
        question: "1024ページの辞書から目当ての言葉をさがすとき、まん中を開いて「前半と後半のどちらにあるか」を決め、のこりを半分にしぼっていきます。のこり nokori が1ページになるまでに何回しぼればよいか、kaisu で数えて表示しよう。あてはまる記号を選ぼう（3か所の穴をうめよう）",
        ast: [
            {
                type: "assign",
                name: "nokori",
                value: "1024"
            },
            {
                type: "assign",
                name: "kaisu",
                value: "0"
            },
            {
                type: "while",
                condition: "nokori __BLANK_blank_a__ 1",
                body: [
                    {
                        type: "assign",
                        name: "nokori",
                        value: "nokori __BLANK_blank_b__ 2"
                    },
                    {
                        type: "assign",
                        name: "kaisu",
                        value: "kaisu __BLANK_blank_c__ 1"
                    }
                ]
            },
            {
                type: "print",
                value: "\"のこりは\" + nokori + \"ページ、しぼった回数は\" + kaisu + \"回です\""
            }
        ],
        choices: [
            { label: ">", value: ">" },
            { label: ">=", value: ">=" },
            { label: "<", value: "<" },
            { label: "+", value: "+" },
            { label: "-", value: "-" },
            { label: "/", value: "/" },
            { label: "%", value: "%" },
        ],
        answers: [
            {
                values: [">", "/", "+"],
                correct: true,
            },
            {
                values: [">=", "/", "+"],
                correct: false,
                hint: "止めたいのは「のこりが1ページになったとき」です。>= だと nokori が1のときにもう1回しぼってしまい、1 / 2 ＝ 0.5 で「のこりは0.5ページ」、回数も10回ではなく11回と出てしまいます。1ページより多いあいだだけ続けたいので > を使います",
            },
            {
                values: [">", "%", "+"],
                correct: false,
                hint: "% はわり算の「あまり」です。1024 % 2 ＝ 0 なので1回でのこりが0ページになり、「1回でたどりついた」とおかしな答えになります。半分にするのはわり算の / です",
            },
            {
                values: [">", "-", "+"],
                correct: false,
                hint: "- だと1回に2ページずつしか減らないので、512回もかかってしまいます。半分にしぼるのは「2をひく」ではなく「2でわる」です",
            },
            {
                values: [">", "/", "/"],
                correct: false,
                hint: "kaisu は0から始まるので、1でわっても 0 / 1 ＝ 0 のままで「0回」と出てしまいます。何回しぼったかは1回ずつ数えたいので kaisu + 1 とたし算にしましょう",
            },
            {
                values: [">=", "%", "+"],
                correct: false,
                hint: "2か所ちがいます。くらべるのは > （1ページより多いあいだだけ続ける）、しぼり方は nokori / 2 （2でわって半分）です",
            }
        ],
        defaultHint: "半分にしぼる作業は「のこりが1ページより多いあいだ（nokori > 1）」だけくり返します。1回しぼるごとに、のこりは半分（nokori / 2）、回数は1つふえます（kaisu + 1）。1024ページでもたった10回でたどりつけます（2を10回かけると1024になるからです）",
    },
    q045: {
        title: "おつりの硬貨の枚数",
        addedAt: "2026-08-19",
        difficulty: 3,
        question: "1780円のおつりを、500円玉・100円玉・10円玉を使って、できるだけ少ない枚数でわたします。それぞれ何枚になるかを表示しよう。大きい硬貨から順に「わり算の商（小数は切り捨て）がその硬貨の枚数」「わったあまりが次に回す残り」になります。あてはまる記号を選ぼう（3か所の穴をうめよう）",
        ast: [
            {
                type: "assign",
                name: "tsuri",
                value: "1780"
            },
            {
                type: "assign",
                name: "go",
                value: "切り捨て(tsuri / 500)"
            },
            {
                type: "assign",
                name: "nokori",
                value: "tsuri __BLANK_blank_a__ 500"
            },
            {
                type: "assign",
                name: "hyaku",
                value: "切り捨て(nokori / 100)"
            },
            {
                type: "assign",
                name: "hasuu",
                value: "nokori __BLANK_blank_b__ 100"
            },
            {
                type: "assign",
                name: "juu",
                value: "hasuu __BLANK_blank_c__ 10"
            },
            {
                type: "print",
                value: "\"500円玉が\" + go + \"枚\""
            },
            {
                type: "print",
                value: "\"100円玉が\" + hyaku + \"枚\""
            },
            {
                type: "print",
                value: "\"10円玉が\" + juu + \"枚\""
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
                values: ["%", "%", "/"],
                correct: true,
            },
            {
                values: ["/", "%", "/"],
                correct: false,
                hint: "1つ目は「500円玉をわたしたあとの残り」です。/ だと 1780 / 500 ＝ 3.56 という枚数まじりの数になり、100円玉が0枚とおかしくなります。残りは 1780 % 500 ＝ 280 円と、あまりで求めます",
            },
            {
                values: ["-", "%", "/"],
                correct: false,
                hint: "500円玉は3枚わたすので、ひくなら 1780 - 1500 です。- だと1枚ぶんの 1780 - 500 ＝ 1280 しかひけず、100円玉が12枚になってしまいます。何枚ぶんでも一度にひける % を使いましょう",
            },
            {
                values: ["%", "/", "/"],
                correct: false,
                hint: "2つ目は「100円玉もわたしたあとの残り」です。/ だと 280 / 100 ＝ 2.8 となり、10円玉が0.28枚とおかしくなります。残りは 280 % 100 ＝ 80 円と、あまりで求めます",
            },
            {
                values: ["%", "-", "/"],
                correct: false,
                hint: "100円玉は2枚わたすので、ひくなら 280 - 200 です。- だと1枚ぶんの 280 - 100 ＝ 180 しかひけず、10円玉が18枚になってしまいます。あまりの % なら一度で 80 円になります",
            },
            {
                values: ["%", "%", "%"],
                correct: false,
                hint: "10円玉の枚数は「わり算の商」です。% はあまりなので 80 % 10 ＝ 0 となり0枚になってしまいます。80円は10円玉8枚ちょうどなので、80 / 10 ＝ 8 とわり算にしましょう",
            }
        ],
        defaultHint: "大きい硬貨から順に「金額 / 硬貨の額 ＝ 枚数」「金額 % 硬貨の額 ＝ 次に回す残り」の2本立てです。1780円なら 500円玉は 切り捨て(1780 / 500) ＝ 3枚、残りは 1780 % 500 ＝ 280円、と進みます",
    },
    q046: {
        title: "通信のエラーを見つける（パリティチェック）",
        addedAt: "2026-08-20",
        difficulty: 4,
        question: "届いた8ビットのデータ bit（＝[1,0,1,1,0,1,0,1]）は、はじめの7ビットが本当のデータで、最後の bit[7] は「パリティビット」です。偶数パリティでは、はじめの7ビットにふくまれる1の個数が偶数なら0、奇数なら1をパリティビットにします。7ビットから正しいパリティビットを計算し、届いた bit[7] と同じかどうかで「正常」か「エラー」かを表示しよう。あてはまる記号を選ぼう（3か所の穴をうめよう）",
        ast: [
            {
                type: "assign",
                name: "bit",
                value: "[1,0,1,1,0,1,0,1]"
            },
            {
                type: "assign",
                name: "kosuu",
                value: "0"
            },
            {
                type: "for",
                varName: "i",
                start: "0",
                end: "6",
                step: "1",
                body: [
                    {
                        type: "if",
                        condition: "bit[i] __BLANK_blank_a__ 1",
                        body: [
                            {
                                type: "assign",
                                name: "kosuu",
                                value: "kosuu __BLANK_blank_b__ 1"
                            }
                        ]
                    }
                ]
            },
            {
                type: "assign",
                name: "parity",
                value: "kosuu __BLANK_blank_c__ 2"
            },
            {
                type: "print",
                value: "\"1の個数は\" + kosuu + \"個、計算したパリティビットは\" + parity + \"です\""
            },
            {
                type: "ifelse",
                condition: "parity == bit[7]",
                ifBody: [
                    {
                        type: "print",
                        value: "\"正常に届きました\""
                    }
                ],
                elseBody: [
                    {
                        type: "print",
                        value: "\"エラーが見つかりました\""
                    }
                ]
            }
        ],
        choices: [
            { label: "==", value: "==" },
            { label: "!=", value: "!=" },
            { label: ">", value: ">" },
            { label: "+", value: "+" },
            { label: "-", value: "-" },
            { label: "*", value: "*" },
            { label: "/", value: "/" },
            { label: "%", value: "%" },
        ],
        answers: [
            {
                values: ["==", "+", "%"],
                correct: true,
            },
            {
                values: ["!=", "+", "%"],
                correct: false,
                hint: "!= は「1ではないとき」、つまり0の個数を数えることになります。はじめの7ビットに0は3個なので kosuu は3、パリティは 3 % 2 ＝ 1 となり、届いた bit[7] の1とたまたま一致して「正常」と表示されます。本当はエラーなのに見のがしてしまいます。1の個数を数えたいので == を使います",
            },
            {
                values: [">", "+", "%"],
                correct: false,
                hint: "bit の中身は0か1しかないので、bit[i] > 1 になることは一度もありません。kosuu は0のままで、パリティも0のまま数えたことになりません。ちょうど1かどうかを調べる == にしましょう",
            },
            {
                values: ["==", "-", "%"],
                correct: false,
                hint: "- だと1が見つかるたびに kosuu が1ずつ減って -4 になってしまいます。個数を数えるときは1ずつふやす + です",
            },
            {
                values: ["==", "*", "%"],
                correct: false,
                hint: "kosuu は0から始まるので、何回かけても 0 * 1 ＝ 0 のままです。1が4個あっても「0個」と数えたことになります。数えるのは + です",
            },
            {
                values: ["==", "+", "/"],
                correct: false,
                hint: "/ だと 4 / 2 ＝ 2 となり、0か1しかないはずのパリティビットが2になってしまいます。知りたいのは「偶数か奇数か」なので、2でわったあまりを出す % を使います",
            },
            {
                values: ["==", "+", "*"],
                correct: false,
                hint: "* だと 4 * 2 ＝ 8 となり、パリティビットが8という、ありえない値になります。0か1にするには 2 でわったあまりの % です",
            },
            {
                values: ["!=", "+", "/"],
                correct: false,
                hint: "2か所ちがいます。数えたいのは1の個数なので ==、偶数か奇数かは2でわったあまりを見る % で調べます",
            }
        ],
        defaultHint: "パリティビットは「1の個数を偶数にそろえるためのおまけの1ビット」です。まず bit[i] == 1 になった回数を kosuu + 1 で数え、kosuu % 2 を計算すると、偶数なら0・奇数なら1になります。これが届いた bit[7] と食いちがっていれば、通信のとちゅうでビットが化けた（エラー）とわかります",
    },
    q047: {
        title: "関数が返すのはどの値？",
        addedAt: "2026-08-23 03:00",
        difficulty: 1,
        question: "関数は、よく使う処理に名前をつけてまとめたものです。ここでは、2つの数を受け取って合計を返す関数 tashizan を作りました。関数の中では、受け取った a と b を足した結果を goukei に入れています。呼び出したところに合計を持ち帰るには、どの値を返せばよいでしょうか。あてはまるものを選ぼう",
        ast: [
            {
                type: "func",
                name: "tashizan",
                params: "a, b",
                body: [
                    {
                        type: "assign",
                        name: "goukei",
                        value: "a + b"
                    },
                    {
                        type: "return",
                        value: "__BLANK_blank_a__"
                    }
                ]
            },
            {
                type: "assign",
                name: "kekka",
                value: "tashizan(4, 3)"
            },
            {
                type: "print",
                value: "\"4と3を足すと\" + kekka"
            }
        ],
        choices: [
            { label: "goukei", value: "goukei" },
            { label: "a", value: "a" },
            { label: "b", value: "b" },
            { label: "kekka", value: "kekka" },
        ],
        answers: [
            {
                values: ["goukei"],
                correct: true,
            },
            {
                values: ["a"],
                correct: false,
                hint: "a は受け取った1つ目の値そのものなので、返ってくるのは 4 だけです。足し算の答えは goukei に入っているので、goukei を返しましょう",
            },
            {
                values: ["b"],
                correct: false,
                hint: "b は受け取った2つ目の値そのものなので、返ってくるのは 3 だけです。足し算の答えは goukei に入っているので、goukei を返しましょう",
            },
            {
                values: ["kekka"],
                correct: false,
                hint: "kekka は関数の外の変数です。関数の中から外の変数は見えないので、値が無いあつかいになってしまいます。関数の中で作った goukei を返しましょう",
            }
        ],
        defaultHint: "「〜 を返す」は、その値を呼び出したところへ持ち帰る合図です。tashizan(4, 3) の場所に、返した値がそのまま入ります",
    },
    q048: {
        title: "おつりの関数、引数はどの順番？",
        addedAt: "2026-08-23 06:00",
        difficulty: 2,
        question: "おつりを計算する関数 otsuri を使います。この関数は、1つ目に「はらったお金」、2つ目に「品物のねだん」を受け取り、その差を返します。1000円をはらって780円の品物を買ったときのおつりを求めたい。呼び出すときの ( ) の中に、どの変数をどの順番で書けばよいでしょうか。あてはまるものを選ぼう（2か所の穴をうめよう）",
        ast: [
            {
                type: "func",
                name: "otsuri",
                params: "harau, nedan",
                body: [
                    {
                        type: "assign",
                        name: "kaeshi",
                        value: "harau - nedan"
                    },
                    {
                        type: "return",
                        value: "kaeshi"
                    }
                ]
            },
            {
                type: "assign",
                name: "harai",
                value: "1000"
            },
            {
                type: "assign",
                name: "kakaku",
                value: "780"
            },
            {
                type: "assign",
                name: "okane",
                value: "otsuri(__BLANK_blank_a__, __BLANK_blank_b__)"
            },
            {
                type: "print",
                value: "\"おつりは\" + okane + \"円です\""
            }
        ],
        choices: [
            { label: "harai", value: "harai" },
            { label: "kakaku", value: "kakaku" },
            { label: "harau", value: "harau" },
            { label: "nedan", value: "nedan" },
        ],
        answers: [
            {
                values: ["harai", "kakaku"],
                correct: true,
            },
            {
                values: ["kakaku", "harai"],
                correct: false,
                hint: "順番が逆です。1つ目が harau（はらったお金）、2つ目が nedan（ねだん）なので、この順だと 780 - 1000 になって -220 円になってしまいます",
            },
            {
                values: ["harau", "nedan"],
                correct: false,
                hint: "harau と nedan は関数の中だけで使う名前（引数）です。呼び出す側にはこの名前の変数はないので、値が無いあつかいになります。呼び出す側にある harai と kakaku をわたしましょう",
            },
            {
                values: ["harai", "nedan"],
                correct: false,
                hint: "1つ目の harai は合っています。2つ目の nedan は関数の中だけの名前なので、呼び出す側からは使えません。ねだんが入っているのは kakaku です",
            },
            {
                values: ["kakaku", "nedan"],
                correct: false,
                hint: "どちらもずれています。1つ目には「はらったお金」の harai、2つ目には「ねだん」の kakaku をわたします。harau・nedan は関数の中だけの名前です",
            }
        ],
        defaultHint: "引数は、書いた順にそのまま関数へわたります。1つ目が harau、2つ目が nedan なので、呼び出す側も「はらったお金、ねだん」の順にそろえます",
    },
    q049: {
        title: "関数を繰り返しの中で使う",
        addedAt: "2026-08-23 09:00",
        difficulty: 3,
        question: "1から4までの数を、それぞれ2乗して合計したい（1 + 4 + 9 + 16）。2乗を計算する関数 nijou を作り、繰り返しの中から呼び出して goukei にたしていきます。何回目かを数えている変数は i です。関数にわたす値として、あてはまるものを選ぼう",
        ast: [
            {
                type: "func",
                name: "nijou",
                params: "x",
                body: [
                    {
                        type: "return",
                        value: "x * x"
                    }
                ]
            },
            {
                type: "assign",
                name: "goukei",
                value: "0"
            },
            {
                type: "for",
                varName: "i",
                start: "1",
                end: "4",
                step: "1",
                body: [
                    {
                        type: "assign",
                        name: "ni",
                        value: "nijou(__BLANK_blank_a__)"
                    },
                    {
                        type: "assign",
                        name: "goukei",
                        value: "goukei + ni"
                    }
                ]
            },
            {
                type: "print",
                value: "\"1から4までの2乗の合計は\" + goukei"
            }
        ],
        choices: [
            { label: "i", value: "i" },
            { label: "x", value: "x" },
            { label: "goukei", value: "goukei" },
            { label: "4", value: "4" },
        ],
        answers: [
            {
                values: ["i"],
                correct: true,
            },
            {
                values: ["x"],
                correct: false,
                hint: "x は関数 nijou の中だけで使う名前（引数）です。繰り返している側には x という変数がないので、値が無いあつかいになり、合計は 0 のままです。何回目かを持っているのは i です",
            },
            {
                values: ["goukei"],
                correct: false,
                hint: "goukei は合計を入れておく箱です。最初は 0 なので、nijou(0) は 0 になり、いつまでたっても合計は 0 のままです。2乗したいのは、いま何回目かを表す i です",
            },
            {
                values: ["4"],
                correct: false,
                hint: "4 だと毎回 nijou(4) の 16 をたすので、16 が4回で 64 になってしまいます。1回目は 1、2回目は 2、…と変わる値が必要なので i をわたします",
            }
        ],
        defaultHint: "繰り返しの中では i が 1, 2, 3, 4 と変わります。その i をそのまま関数にわたせば、1, 4, 9, 16 が順に返ってきます",
    },
    q050: {
        title: "駐車料金の早見表",
        addedAt: "2026-08-25",
        difficulty: 2,
        question: "1時間あたり300円の駐車場があります。1時間から5時間までとめたときの料金の早見表を、上から順に表示しよう。何時間目かを数えている変数は i です。くり返しの終わりの数と、300 にかける数の2か所の穴をうめよう",
        ast: [
            {
                type: "for",
                varName: "i",
                start: "1",
                end: "__BLANK_blank_a__",
                step: "1",
                body: [
                    {
                        type: "assign",
                        name: "ryoukin",
                        value: "300 * __BLANK_blank_b__"
                    },
                    {
                        type: "print",
                        value: "i + \"時間で\" + ryoukin + \"円\""
                    }
                ]
            }
        ],
        choices: [
            { label: "4", value: "4" },
            { label: "5", value: "5" },
            { label: "6", value: "6" },
            { label: "i", value: "i" },
            { label: "300", value: "300" },
        ],
        answers: [
            {
                values: ["5", "i"],
                correct: true,
            },
            {
                values: ["4", "i"],
                correct: false,
                hint: "4時間ぶんまでしか表示されません。i は1から始まり、終わりの数もふくめてくり返すので、5時間ぶん出すには 5 と書きます",
            },
            {
                values: ["6", "i"],
                correct: false,
                hint: "6時間ぶんまで表示されてしまいます。終わりの数もふくめてくり返すので、1から6だと6回です。5 と書きます",
            },
            {
                values: ["5", "300"],
                correct: false,
                hint: "300 * 300 ＝ 90000円になってしまいます。かけるのは金額ではなく「とめた時間」です。時間は 1, 2, 3 … と変わっていくので i を入れます",
            },
            {
                values: ["5", "5"],
                correct: false,
                hint: "どの行も 300 * 5 ＝ 1500円になり、5行とも同じ料金の表になってしまいます。1時間目は1、2時間目は2 … と変わる i をかけます",
            },
            {
                values: ["5", "4"],
                correct: false,
                hint: "どの行も 300 * 4 ＝ 1200円になってしまいます。かける数は決まった数ではなく、くり返しのたびに変わる i です",
            }
        ],
        defaultHint: "料金は「1時間あたりの金額 × とめた時間」なので 300 * i です。とめた時間は、くり返しのたびに 1, 2, 3, 4, 5 と変わる i のこと。for は終わりの数もふくめてくり返すので、1時間から5時間までなら 1 から 5 までと書きます。300円、600円、900円、1200円、1500円と5行出れば正解です"
    },
    q051: {
        title: "アルファベットをずらす暗号（シーザー暗号）",
        addedAt: "2026-08-26",
        difficulty: 3,
        question: "シーザー暗号は、アルファベットを決まった数だけ後ろにずらして文字をかくす暗号です。A から Z までを並べた配列 abc を使い、W X Y Z の4文字を zure（＝3）だけずらして表示しよう。A が1番目、Z が26番目なので、番号 i を 23（＝W）から 26（＝Z）まで動かします。ずらした番号が26をこえたときだけ、A にもどるように26をひいて折り返します。26（＝Z）はまだ折り返さないことに気をつけよう（2か所の穴をうめよう）",
        ast: [
            {
                type: "assign",
                name: "abc",
                value: "[\"A\",\"B\",\"C\",\"D\",\"E\",\"F\",\"G\",\"H\",\"I\",\"J\",\"K\",\"L\",\"M\",\"N\",\"O\",\"P\",\"Q\",\"R\",\"S\",\"T\",\"U\",\"V\",\"W\",\"X\",\"Y\",\"Z\"]"
            },
            {
                type: "assign",
                name: "zure",
                value: "3"
            },
            {
                type: "for",
                varName: "i",
                start: "23",
                end: "26",
                step: "1",
                body: [
                    {
                        type: "assign",
                        name: "saki",
                        value: "i + zure"
                    },
                    {
                        type: "if",
                        condition: "saki __BLANK_blank_a__ 26",
                        body: [
                            {
                                type: "assign",
                                name: "saki",
                                value: "saki __BLANK_blank_b__ 26"
                            }
                        ]
                    },
                    {
                        type: "print",
                        value: "abc[i - 1] + \"は\" + abc[saki - 1] + \"になります\""
                    }
                ]
            }
        ],
        choices: [
            { label: ">", value: ">" },
            { label: ">=", value: ">=" },
            { label: "<", value: "<" },
            { label: "-", value: "-" },
            { label: "+", value: "+" },
        ],
        answers: [
            {
                values: [">", "-"],
                correct: true,
            },
            {
                values: [">=", "-"],
                correct: false,
                hint: "W だけがこわれます。W は 23+3 ＝ 26、つまり Z のことなので折り返さなくてよいのに、>= だと26も折り返して 26-26 ＝ 0 になり、abc にない0番をさしてしまいます。折り返すのは26をこえた27からなので > を使います",
            },
            {
                values: ["<", "-"],
                correct: false,
                hint: "< だと向きが逆で、26より小さいときだけ26をひきます。ほんとうに折り返したい X Y Z は 27・28・29 のままアルファベットの外をさしてしまいます。ひくのは26をこえたときです",
            },
            {
                values: [">", "+"],
                correct: false,
                hint: "条件は合っています。でも + だと27がさらに大きくなって53になり、ますますアルファベットの外に出てしまいます。26をこえたぶんを A から数えなおすので、26をひきます",
            },
            {
                values: [">=", "+"],
                correct: false,
                hint: "2か所とも違います。折り返すのは26をこえたとき（>）で、そのときは26をたすのではなくひきます（-）。いまは4文字ともアルファベットの外をさしています",
            },
            {
                values: ["<", "+"],
                correct: false,
                hint: "2か所とも違います。26をこえたとき（>）に、26をひいて（-）A にもどします",
            }
        ],
        defaultHint: "abc[1 - 1] が A、abc[26 - 1] が Z です。番号が1〜26の間にあれば、そのままアルファベットに直せます。W（23番目）は 23+3 ＝ 26 で Z のままでよく、X（24番目）は 24+3 ＝ 27 と26をこえるので 27-26 ＝ 1、つまり A にもどります。「こえたとき」だけ折り返すので、条件は >= ではなく > です"
    },
    q052: {
        title: "じゃんけんの勝ち負け（3つでひとまわり）",
        addedAt: "2026-09-03",
        difficulty: 4,
        question: "じゃんけんの手を グー＝0、チョキ＝1、パー＝2 という数字で表します。Aさんはパー（2）、Bさんはグー（0）を出しました。グー→チョキ→パー→グー…と3つの手はひとまわりしているので、sa ＝ te_a - te_b + 3 を3でわったあまり kekka を見ると、0のときはあいこ、そうでないときは勝ち負けが決まります。Aさんの勝ちになるのは kekka がいくつのときかな",
        ast: [
            {
                type: "assign",
                name: "te_a",
                value: "2"
            },
            {
                type: "assign",
                name: "te_b",
                value: "0"
            },
            {
                type: "assign",
                name: "sa",
                value: "te_a - te_b + 3"
            },
            {
                type: "assign",
                name: "kekka",
                value: "sa % 3"
            },
            {
                type: "print",
                value: "\"kekkaは\" + kekka + \"です\""
            },
            {
                type: "ifelse",
                condition: "kekka == 0",
                ifBody: [
                    {
                        type: "print",
                        value: "\"あいこ\""
                    }
                ],
                elseBody: [
                    {
                        type: "ifelse",
                        condition: "kekka == __BLANK_blank_a__",
                        ifBody: [
                            {
                                type: "print",
                                value: "\"Aさんの勝ち\""
                            }
                        ],
                        elseBody: [
                            {
                                type: "print",
                                value: "\"Bさんの勝ち\""
                            }
                        ]
                    }
                ]
            }
        ],
        choices: [
            { label: "0", value: "0" },
            { label: "1", value: "1" },
            { label: "2", value: "2" },
            { label: "3", value: "3" },
        ],
        answers: [
            {
                values: ["2"],
                correct: true,
            },
            {
                values: ["1"],
                correct: false,
                hint: "kekka は 5 % 3 ＝ 2 になるので、kekka == 1 は成り立たず「Bさんの勝ち」と表示されてしまいます。でもパー（2）はグー（0）に勝ちます。グーがチョキに勝つとき（2-1+3）% 3、チョキがパーに勝つとき（1-2+3）% 3 もどちらも 2 です。Aさんが勝つ番号は 2 のほうです",
            },
            {
                values: ["3"],
                correct: false,
                hint: "3 でわったあまりは 0・1・2 のどれかにしかならないので、kekka == 3 は一生成り立ちません。だれが何を出しても「Bさんの勝ち」になってしまいます。あまりとしてありえる 2 を選びましょう",
            },
            {
                values: ["0"],
                correct: false,
                hint: "kekka == 0 のときは、ひとつ外側の「もし」ですでに「あいこ」と表示されています。だから内側にもう一度 0 と書いても、そこには絶対にたどりつきません。ここに書くのはAさんが勝つときの番号 2 です",
            }
        ],
        defaultHint: "グー（0）→チョキ（1）→パー（2）→グー…と手は3つでひとまわりします。Aさんはパー（2）、Bさんはグー（0）なので sa ＝ 2 - 0 + 3 ＝ 5。これを 3 でわったあまりにすると 5 % 3 ＝ 2 です。じつは「グーがチョキに勝つ」「チョキがパーに勝つ」ときも同じ 2 になるので、kekka が 2 のときがAさんの勝ちです"
    },
    q053: {
        title: "同じ点なら同じ順位（テストの順位づけ）",
        addedAt: "2026-09-04",
        difficulty: 5,
        question: "4人のテストの点数 ten（＝[70, 90, 80, 90]）を、一人ずつ「何位か」に直して表示しよう。順位は「自分より高い点の人が何人いるか」を数えて、その人数に1をたせば求められます。同じ点の人は同じ順位（90点は2人とも1位で、2位はいない）になるようにしよう（3か所の穴をうめよう）",
        ast: [
            {
                type: "assign",
                name: "ten",
                value: "[70,90,80,90]"
            },
            {
                type: "for",
                varName: "i",
                start: "0",
                end: "3",
                step: "1",
                body: [
                    {
                        type: "assign",
                        name: "juni",
                        value: "__BLANK_blank_a__"
                    },
                    {
                        type: "for",
                        varName: "j",
                        start: "0",
                        end: "3",
                        step: "1",
                        body: [
                            {
                                type: "if",
                                condition: "ten[j] __BLANK_blank_b__ ten[i]",
                                body: [
                                    {
                                        type: "assign",
                                        name: "juni",
                                        value: "juni __BLANK_blank_c__ 1"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        type: "print",
                        value: "ten[i] + \"点は\" + juni + \"位\""
                    }
                ]
            }
        ],
        choices: [
            { label: "0", value: "0" },
            { label: "1", value: "1" },
            { label: ">", value: ">" },
            { label: ">=", value: ">=" },
            { label: "<", value: "<" },
            { label: "+", value: "+" },
            { label: "-", value: "-" }
        ],
        answers: [
            {
                values: ["1", ">", "+"],
                correct: true
            },
            {
                values: ["0", ">", "+"],
                correct: false,
                hint: "数え方は合っていますが、スタートが1つずれています。1番高い人は、自分より高い人が0人なので juni が 0 のままになり、90点が「0位」と出てしまいます。順位は1位から始まるので、最初に入れておくのは 1 です"
            },
            {
                values: ["1", ">=", "+"],
                correct: false,
                hint: ">= にすると「自分と同じ点」も数えてしまいます。j は自分自身も通るので、どの人も必ず1人分多く数えて 70点は5位。さらに90点は2人いてお互いを数えあうので、2人とも3位になってしまいます。数えたいのは「自分より高い人」だけなので > を使います"
            },
            {
                values: ["1", "<", "+"],
                correct: false,
                hint: "< だと「自分より低い人」を数えてしまうので、順番が逆さまになります。一番高い 90点が 3位、一番低い 70点が 1位 と出てしまいます。上に何人いるかを数えたいので > です"
            },
            {
                values: ["1", ">", "-"],
                correct: false,
                hint: "人数を数えるのにひき算にしています。juni は 1 から始まるので、高い人が見つかるたびに 0、-1、-2 と減ってしまい、70点が「-2位」と出ます。1人見つかるごとに順位は下がる（数字は大きくなる）ので + です"
            },
            {
                values: ["0", ">=", "+"],
                correct: false,
                hint: ">= で自分自身を余分に1人数えるぶんを、スタートの 0 が打ち消しています。点数がばらばらならこれでも合いますが、同じ点の人がいるとお互いを数えあってずれます。90点は2人とも2位になり、1位がいなくなってしまいます。「juni は1位からスタート」「数えるのは自分より高い人だけ（>）」が正しい組み合わせです"
            },
            {
                values: ["0", "<", "+"],
                correct: false,
                hint: "どちらもちがいます。< だと低い人を数えて順番が逆さまになり、スタートが 0 なので「0位」が出てしまいます。juni は 1 から始め、自分より高い人（>）を数えましょう"
            }
        ],
        defaultHint: "順位は「自分より上に何人いるか ＋ 1」で求まります。だから juni は 1 からスタートし、内側のくり返しでは「自分より高い点（ten[j] > ten[i]）」の人だけを 1 ずつプラスして数えます。= を入れないのがポイントで、同じ点の人はお互いを数えないので自然と同じ順位になります",
    },
    q054: {
        title: "2つの値を入れかえる（席のこうかん）",
        addedAt: "2026-09-08",
        difficulty: 2,
        question: "AさんとBさんの席をこうかんします。いま seki_a には 3、seki_b には 8 が入っています。これを入れかえて、Aさんが8番、Bさんが3番になるようにしよう。いきなり seki_a = seki_b としてしまうと、もとの 3 が上書きされて消えてしまうので、先に temp という別の箱にどけておきます。2か所の空らんにあてはまる変数を選ぼう",
        ast: [
            {
                type: "assign",
                name: "seki_a",
                value: "3"
            },
            {
                type: "assign",
                name: "seki_b",
                value: "8"
            },
            {
                type: "assign",
                name: "temp",
                value: "__BLANK_blank_a__"
            },
            {
                type: "assign",
                name: "seki_a",
                value: "seki_b"
            },
            {
                type: "assign",
                name: "seki_b",
                value: "__BLANK_blank_b__"
            },
            {
                type: "print",
                value: "\"Aさんの席は\" + seki_a + \"番\""
            },
            {
                type: "print",
                value: "\"Bさんの席は\" + seki_b + \"番\""
            }
        ],
        choices: [
            { label: "seki_a", value: "seki_a" },
            { label: "seki_b", value: "seki_b" },
            { label: "temp", value: "temp" }
        ],
        answers: [
            {
                values: ["seki_a", "temp"],
                correct: true
            },
            {
                values: ["seki_a", "seki_a"],
                correct: false,
                hint: "temp に 3 をどけたところまでは正解です。でも seki_b = seki_a を実行する時点では、その1つ前の行で seki_a が 8 に書きかわっています。だから seki_b にも 8 が入り、2人とも8番になってしまいます。使うのは、どけておいた temp です"
            },
            {
                values: ["seki_a", "seki_b"],
                correct: false,
                hint: "seki_b = seki_b は「自分に自分を入れる」ので、seki_b は 8 のまま何も変わりません。seki_a も 8 になっているので2人とも8番です。3 が入っているのは temp なので、temp を入れましょう"
            },
            {
                values: ["seki_b", "temp"],
                correct: false,
                hint: "どけておきたいのは、これから上書きされてしまう seki_a の 3 のほうです。temp = seki_b にすると temp は 8 になり、最後に seki_b = temp としても 8 が戻るだけ。3 はどこにも残らず消えてしまいます"
            },
            {
                values: ["seki_b", "seki_a"],
                correct: false,
                hint: "temp に 8 をどけても、seki_a = seki_b で 3 は上書きされて消えます。そのあと seki_b = seki_a とすると 8 が入り、2人とも8番です。消える前の 3 を temp にどけておくのがコツです"
            },
            {
                values: ["seki_b", "seki_b"],
                correct: false,
                hint: "temp を使わずに素通りしている形です。seki_a は 8 になり、seki_b は 8 のまま。2人とも8番になってしまいます。先に temp = seki_a として 3 を守っておきましょう"
            },
            {
                values: ["temp", "temp"],
                correct: false,
                hint: "1つ目の temp = temp は、まだ何も入っていない箱を自分に入れているだけで、意味がありません。ここでは、これから消えてしまう seki_a の 3 を temp にどけます"
            },
            {
                values: ["temp", "seki_a"],
                correct: false,
                hint: "temp = temp では 3 をどけられません。さらに seki_b = seki_a としても、seki_a はすでに 8 になっているので2人とも8番です。1つ目は seki_a、2つ目は temp にしましょう"
            },
            {
                values: ["temp", "seki_b"],
                correct: false,
                hint: "どちらの行も値が動いていません。seki_a だけが 8 に上書きされて、2人とも8番になります。入れかえには「①どける ②上書き ③どけた値を戻す」の3段階が必要です"
            }
        ],
        defaultHint: "入れかえは3段階です。①temp = seki_a で 3 を temp にどける ②seki_a = seki_b で seki_a を 8 にする（ここで seki_a のもとの 3 は消える）③seki_b = temp で、どけておいた 3 を seki_b に入れる。②のあとに seki_a を使っても、もう 3 は残っていないことに注意しよう",
    },
    q055: {
        title: "いちばん安いのはいくら？（最小値をさがす）",
        addedAt: "2026-09-09",
        difficulty: 3,
        question: "5つの店の値段を配列 nedan（＝[320,280,350,260,300]）に入れました。この中でいちばん安い値段を見つけて表示しよう。saiyasu に「今のところ一番安い値段」を入れておき、店を1つずつ見ながら、それより安ければ saiyasu を入れかえます。1つ目の店はもう saiyasu に入っているので、くり返しは i ＝ 1（2つ目の店）から始めます。ポイントは saiyasu の最初の値です。合計を数えるときのように 0 から始めてよいか、よく考えよう（2か所の穴をうめよう）",
        ast: [
            {
                type: "assign",
                name: "nedan",
                value: "[320,280,350,260,300]"
            },
            {
                type: "assign",
                name: "saiyasu",
                value: "__BLANK_blank_a__"
            },
            {
                type: "for",
                varName: "i",
                start: "1",
                end: "4",
                step: "1",
                body: [
                    {
                        type: "if",
                        condition: "nedan[i] __BLANK_blank_b__ saiyasu",
                        body: [
                            {
                                type: "assign",
                                name: "saiyasu",
                                value: "nedan[i]"
                            }
                        ]
                    }
                ]
            },
            {
                type: "print",
                value: "\"いちばん安いのは\" + saiyasu + \"円です\""
            }
        ],
        choices: [
            { label: "0", value: "0" },
            { label: "100", value: "100" },
            { label: "nedan[0]", value: "nedan[0]" },
            { label: "<", value: "<" },
            { label: ">", value: ">" },
            { label: "==", value: "==" },
        ],
        answers: [
            {
                values: ["nedan[0]", "<"],
                correct: true,
            },
            {
                values: ["nedan[0]", ">"],
                correct: false,
                hint: "スタートの値は正しいのですが、> だと「今より高ければ入れかえる」になり、いちばん高い 350 円が残ってしまいます。さがしたいのは安い方なので、< を使って「今より安ければ入れかえる」にしましょう",
            },
            {
                values: ["nedan[0]", "=="],
                correct: false,
                hint: "== は「等しいか」を調べる記号なので、安いか高いかをくらべられません。320 円とちょうど同じ値段の店は2つ目から先にないので、入れかえは一度も起きず、saiyasu は 320 のまま終わります",
            },
            {
                values: ["0", "<"],
                correct: false,
                hint: "合計を数えるときのくせで 0 から始めると失敗します。0 より安い店は1つもないので、if の中が一度も実行されず、答えは 0 円のままです。最初は「1つ目の店の値段」＝ nedan[0] を入れておきましょう",
            },
            {
                values: ["0", ">"],
                correct: false,
                hint: "2か所とも違います。0 から始めて > でくらべると、どの店も 0 より高いので入れかえが起こり続け、最後にはいちばん高い 350 円が残ります",
            },
            {
                values: ["0", "=="],
                correct: false,
                hint: "0 と等しい値段の店はないので、if の中は一度も実行されません。答えは 0 円のままです。最初の値は nedan[0]、くらべる記号は < です",
            },
            {
                values: ["100", "<"],
                correct: false,
                hint: "100 は「どの店よりも安い値段」なので、100 より安い店が見つからず、答えは 100 円になってしまいます。実際には売っていない値段を勝手に置くのではなく、nedan[0] を入れておくのが確実です",
            },
            {
                values: ["100", ">"],
                correct: false,
                hint: "2か所とも違います。100 から始めて > でくらべると、どの店も 100 より高いので入れかわり続け、いちばん高い 350 円が残ります",
            },
            {
                values: ["100", "=="],
                correct: false,
                hint: "ちょうど 100 円の店はないので入れかえが起こらず、答えは 100 円のままです。最初は nedan[0]（＝320）を入れ、< で「もっと安い店」をさがしましょう",
            }
        ],
        defaultHint: "最小値さがしは「まず1つ目を仮のチャンピオンにして、あとから来た相手が強ければ（安ければ）入れかえる」と考えます。だから saiyasu = nedan[0] から始め、くらべる相手は2つ目（i ＝ 1）から。もし nedan[i] < saiyasu なら入れかえます。合計のように 0 から始めると、0 より安い店は無いので 0 のまま終わってしまいます。答えは 260 円です"
    },
}
