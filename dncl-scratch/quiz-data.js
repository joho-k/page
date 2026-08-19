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
        title: "おつりの硬貨の枚数",
        addedAt: "2026-08-19",
        difficulty: 3,
        question: "780円のおつりを、500円玉・100円玉・10円玉を使って、できるだけ少ない枚数でわたします。それぞれ何枚になるかを表示しよう。大きい硬貨から順に「わった商（小数は切り捨て）がその硬貨の枚数」「わったあまりが次に回す残り」になります（3か所の穴をうめよう）",
        ast: [
            {
                type: "assign",
                name: "tsuri",
                value: "780"
            },
            {
                type: "assign",
                name: "go",
                value: "__BLANK_blank_a__"
            },
            {
                type: "assign",
                name: "nokori",
                value: "__BLANK_blank_b__"
            },
            {
                type: "assign",
                name: "hyaku",
                value: "切り捨て(nokori / 100)"
            },
            {
                type: "assign",
                name: "hasuu",
                value: "nokori % 100"
            },
            {
                type: "assign",
                name: "juu",
                value: "__BLANK_blank_c__"
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
            { label: "切り捨て(tsuri / 500)", value: "切り捨て(tsuri / 500)" },
            { label: "切り捨て(tsuri / 100)", value: "切り捨て(tsuri / 100)" },
            { label: "tsuri % 500", value: "tsuri % 500" },
            { label: "切り捨て(nokori / 10)", value: "切り捨て(nokori / 10)" },
            { label: "切り捨て(hasuu / 10)", value: "切り捨て(hasuu / 10)" },
            { label: "hasuu % 10", value: "hasuu % 10" },
        ],
        answers: [
            {
                values: ["切り捨て(tsuri / 500)", "tsuri % 500", "切り捨て(hasuu / 10)"],
                correct: true,
            },
            {
                values: ["tsuri % 500", "切り捨て(tsuri / 500)", "切り捨て(hasuu / 10)"],
                correct: false,
                hint: "商とあまりが逆になっています。780 % 500 ＝ 280 は「500円玉をわたしたあとの残り」なので枚数にはなりません。枚数は 切り捨て(780 / 500) ＝ 1 枚のほうです",
            },
            {
                values: ["切り捨て(tsuri / 500)", "tsuri % 500", "hasuu % 10"],
                correct: false,
                hint: "10円玉の枚数も「わった商」です。hasuu ＝ 80 なので 80 % 10 ＝ 0 となり0枚になってしまいます。切り捨て(80 / 10) ＝ 8 枚が正しい枚数です",
            },
            {
                values: ["切り捨て(tsuri / 100)", "tsuri % 500", "切り捨て(hasuu / 10)"],
                correct: false,
                hint: "1つ目は500円玉の枚数です。切り捨て(780 / 100) ＝ 7 だと100円玉が7枚という意味になります。500でわって 切り捨て(780 / 500) ＝ 1 枚としましょう",
            },
            {
                values: ["切り捨て(tsuri / 500)", "切り捨て(tsuri / 100)", "切り捨て(hasuu / 10)"],
                correct: false,
                hint: "2つ目は「500円玉をわたしたあとの残り」です。切り捨て(780 / 100) ＝ 7 は金額ではありません。残りは 780 % 500 ＝ 280 円と、あまりで求めます",
            },
            {
                values: ["切り捨て(tsuri / 500)", "tsuri % 500", "切り捨て(nokori / 10)"],
                correct: false,
                hint: "nokori ＝ 280 は100円玉をわたす前の金額なので、切り捨て(280 / 10) ＝ 28 枚になってしまいます。100円玉の分をひいたあとの hasuu ＝ 80 を10でわりましょう",
            }
        ],
        defaultHint: "大きい硬貨から順に「切り捨て(金額 / 硬貨の額) ＝ 枚数」「金額 % 硬貨の額 ＝ 次に回す残り」の2本立てです。780円なら 切り捨て(780 / 500) ＝ 1枚、残り 780 % 500 ＝ 280円、と進みます"
    },
}
