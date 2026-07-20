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
    },
}
