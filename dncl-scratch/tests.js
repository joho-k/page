// =========================
// テストケース
// =========================
const TESTS = [

    // ----------------
    // 基本（既存）
    // ----------------
    {
        name: "基本計算",
        ast: [
            { type: "assign", name: "x", value: "1+2*3" },
            { type: "print", value: "x" }
        ],
        expected: "7\n"
    },

    // ----------------
    // 代入 + 式
    // ----------------
    {
        name: "代入 + 加算",
        ast: [
            { type: "assign", name: "x", value: "1+2" },
            { type: "print", value: "x" }
        ],
        expected: "3\n"
    },

    {
        name: "代入 + 複合式",
        ast: [
            { type: "assign", name: "x", value: "1+2*3" },
            { type: "assign", name: "y", value: "x+4" },
            { type: "print", value: "y" }
        ],
        expected: "11\n"
    },

    {
        name: "あまり（%）",
        ast: [
            { type: "assign", name: "x", value: "10%3" },
            { type: "print", value: "x" }
        ],
        expected: "1\n"
    },
    {
        name: "切り捨て",
        ast: [
            { type: "assign", name: "x", value: "切り捨て(3.9)" },
            { type: "print", value: "x" }
        ],
        expected: "3\n"
    },
    {
        name: "切り上げ",
        ast: [
            { type: "assign", name: "x", value: "切り上げ(3.1)" },
            { type: "print", value: "x" }
        ],
        expected: "4\n"
    },
    {
        name: "四捨五入",
        ast: [
            { type: "assign", name: "x", value: "四捨五入(3.5)" },
            { type: "print", value: "x" }
        ],
        expected: "4\n"
    },
    {
        name: "四捨五入（式を引数にできる）",
        ast: [
            { type: "assign", name: "x", value: "四捨五入((1+2)/2)" },
            { type: "print", value: "x" }
        ],
        expected: "2\n"
    },
    {
        name: "乱数()",
        ast: [
            { type: "assign", name: "r", value: "乱数()" }
        ],
        assert: () => typeof vars.r === "number" && vars.r >= 0 && vars.r < 1
    },
    {
        name: "乱数() の代入値と表示値が一致",
        customRun: () => {
            vars = {};
            output = "";
            trace = [];
            stepIndex = 0;
            currentExplanation = "";

            buildTrace([
                { type: "assign", name: "x", value: "乱数()" },
                { type: "print", value: "x" }
            ]);

            runTraceStep(trace[stepIndex++]);
            const assigned = vars.x;
            const explanationMatches = currentExplanation.includes(String(assigned));

            runTraceStep(trace[stepIndex++]);
            const printed = Number(output.trim());

            return explanationMatches && printed === assigned;
        }
    },

    // ----------------
    // 配列
    // ----------------
    {
        name: "配列生成",
        ast: [
            { type: "assign", name: "a", value: "[1,2,3]" },
            { type: "print", value: "a" }
        ],
        expected: "[1,2,3]\n"
    },

    {
        name: "配列アクセス",
        ast: [
            { type: "assign", name: "a", value: "[5,10,15]" },
            { type: "print", value: "a[0]" },
            { type: "print", value: "a[1]" },
            { type: "print", value: "a[2]" }
        ],
        expected: "5\n10\n15\n"
    },

    {
        name: "配列 + 計算",
        ast: [
            { type: "assign", name: "a", value: "[1,2,3]" },
            { type: "print", value: "a[0]+a[1]+a[2]" }
        ],
        expected: "6\n"
    },

    {
        name: "配列 + あまり",
        ast: [
            { type: "assign", name: "a", value: "[2,4,6]" },
            { type: "print", value: "a[1]%3" }
        ],
        expected: "1\n"
    },

    // ----------------
    // 2次元配列
    // ----------------
    {
        name: "2次元配列アクセス",
        ast: [
            { type: "assign", name: "a", value: "[[1,2,3],[4,5,6]]" },
            { type: "print", value: "a[0][0]" },
            { type: "print", value: "a[0][2]" },
            { type: "print", value: "a[1][1]" }
        ],
        expected: "1\n3\n5\n"
    },

    {
        name: "2次元配列 添字代入",
        ast: [
            { type: "assign", name: "a", value: "[[0,0,0],[0,0,0]]" },
            { type: "assign", name: "a[1][2]", value: "9" },
            { type: "print", value: "a[1][2]" }
        ],
        expected: "9\n"
    },

    {
        name: "2次元配列（空から添字代入で生成）",
        ast: [
            { type: "assign", name: "a[0][0]", value: "1" },
            { type: "assign", name: "a[1][1]", value: "2" },
            { type: "print", value: "a" }
        ],
        expected: "[[1,0],[0,2]]\n",
        assert: () => Array.isArray(vars.a) && Array.isArray(vars.a[0]) && Array.isArray(vars.a[1])
    },

    // ----------------
    // for + 配列
    // ----------------
    {
        name: "配列 + for",
        ast: [
            { type: "assign", name: "a", value: "[2,4,6]" },
            {
                type: "for",
                varName: "i",
                start: "0",
                end: "2",
                step: "1",
                body: [
                    { type: "print", value: "a[i]" }
                ]
            }
        ],
        expected: "2\n4\n6\n"
    },

    {
        name: "配列 + for + 計算",
        ast: [
            { type: "assign", name: "a", value: "[1,2,3]" },
            {
                type: "for",
                varName: "i",
                start: "0",
                end: "2",
                step: "1",
                body: [
                    { type: "print", value: "a[i]*2" }
                ]
            }
        ],
        expected: "2\n4\n6\n"
    },

    {
        name: "配列 + for + 範囲外",
        ast: [
            { type: "assign", name: "a", value: "[0,1,2,3]" },
            {
                type: "for",
                varName: "i",
                start: "1",
                end: "10",
                step: "1",
                body: [
                    { type: "print", value: "a[i]" }
                ]
            }
        ],
        expected:
            "1\n2\n3\n0\n0\n0\n0\n0\n0\n0\n"
    },

    // ----------------
    // while
    // ----------------
    {
        name: "while（条件の間繰り返す）",
        ast: [
            { type: "assign", name: "i", value: "0" },
            {
                type: "while",
                condition: "i < 3",
                body: [
                    { type: "assign", name: "i", value: "i + 1" },
                    { type: "print", value: "i" }
                ]
            }
        ],
        expected: "1\n2\n3\n"
    },

    {
        name: "while（最初から条件が偽）",
        ast: [
            { type: "assign", name: "i", value: "3" },
            { type: "while", condition: "i < 3", body: [{ type: "print", value: "i" }] }
        ],
        expected: ""
    },

    // ----------------
    // if + 式
    // ----------------
    {
        name: "if + 計算条件",
        ast: [
            { type: "assign", name: "x", value: "5" },
            {
                type: "if",
                condition: "x%2==1",
                body: [
                    { type: "print", value: "1" }
                ]
            }
        ],
        expected: "1\n"
    },
    {
        name: "比較演算子 >",
        ast: [
            { type: "assign", name: "x", value: "5" },
            {
                type: "ifelse",
                condition: "x > 3",
                ifBody: [{ type: "print", value: '"T"' }],
                elseBody: [{ type: "print", value: '"F"' }]
            }
        ],
        expected: "T\n"
    },
    {
        name: "比較演算子 >=",
        ast: [
            { type: "assign", name: "x", value: "5" },
            {
                type: "ifelse",
                condition: "x >= 5",
                ifBody: [{ type: "print", value: '"T"' }],
                elseBody: [{ type: "print", value: '"F"' }]
            }
        ],
        expected: "T\n"
    },
    {
        name: "比較演算子 <",
        ast: [
            { type: "assign", name: "x", value: "5" },
            {
                type: "ifelse",
                condition: "x < 3",
                ifBody: [{ type: "print", value: '"T"' }],
                elseBody: [{ type: "print", value: '"F"' }]
            }
        ],
        expected: "F\n"
    },
    {
        name: "比較演算子 <=",
        ast: [
            { type: "assign", name: "x", value: "5" },
            {
                type: "ifelse",
                condition: "x <= 5",
                ifBody: [{ type: "print", value: '"T"' }],
                elseBody: [{ type: "print", value: '"F"' }]
            }
        ],
        expected: "T\n"
    },
    {
        name: "比較演算子 ==",
        ast: [
            { type: "assign", name: "x", value: "5" },
            {
                type: "ifelse",
                condition: "x == 4",
                ifBody: [{ type: "print", value: '"T"' }],
                elseBody: [{ type: "print", value: '"F"' }]
            }
        ],
        expected: "F\n"
    },
    {
        name: "比較演算子 !=",
        ast: [
            { type: "assign", name: "x", value: "5" },
            {
                type: "ifelse",
                condition: "x != 4",
                ifBody: [{ type: "print", value: '"T"' }],
                elseBody: [{ type: "print", value: '"F"' }]
            }
        ],
        expected: "T\n"
    },

    // ----------------
    // ネスト
    // ----------------
    {
        name: "2重ループ + 配列",
        ast: [
            { type: "assign", name: "a", value: "[1,2]" },
            {
                type: "for",
                varName: "i",
                start: "0",
                end: "1",
                step: "1",
                body: [
                    {
                        type: "for",
                        varName: "j",
                        start: "0",
                        end: "1",
                        step: "1",
                        body: [
                            { type: "print", value: "a[i]+a[j]" }
                        ]
                    }
                ]
            }
        ],
        expected:
            "2\n3\n3\n4\n"
    },

    // ----------------
    // 空配列
    // ----------------
    {
        name: "空配列",
        ast: [
            { type: "assign", name: "a", value: "[]" },
            { type: "print", value: "a" }
        ],
        expected: "[]\n"
    },

    // ----------------
    // 2次元配列
    // ----------------
    {
        name: "2次元配列",
        ast: [
            { type: "assign", name: "a", value: "[[1,2],[3,4]]" },
            { type: "print", value: "a[1][0]" }
        ],
        expected: "3\n"
    },
    {
        name: "文字列（ダブルクォート）",
        ast: [
            { type: "print", value: '"こんにちは"' }
        ],
        expected: "こんにちは\n"
    },

    {
        name: "文字列（全角クォート）",
        ast: [
            { type: "print", value: "“テストです”" }
        ],
        expected: "テストです\n"
    },

    {
        name: "文字列 + 数値（別々表示）",
        ast: [
            { type: "assign", name: "x", value: "5" },
            { type: "print", value: '"値は"' },
            { type: "print", value: "x" }
        ],
        expected: "値は\n5\n"
    },

    {
        name: "文字列 + 配列",
        ast: [
            { type: "assign", name: "a", value: "[1,2]" },
            { type: "print", value: '"配列:"' },
            { type: "print", value: "a" }
        ],
        expected: "配列:\n[1,2]\n"
    },

    {
        name: "空文字列",
        ast: [
            { type: "print", value: '""' }
        ],
        expected: "\n"
    },

    {
        name: "文字列内スペース",
        ast: [
            { type: "print", value: '"hello world"' }
        ],
        expected: "hello world\n"
    },

    {
        name: "文字列内記号",
        ast: [
            { type: "print", value: '"a+b=c"' }
        ],
        expected: "a+b=c\n"
    },

    {
        name: "文字列 + 配列アクセス",
        ast: [
            { type: "assign", name: "a", value: "[10,20]" },
            { type: "print", value: '"値:"' },
            { type: "print", value: "a[1]" }
        ],
        expected: "値:\n20\n"
    },

    // ----------------
    // かつ / または
    // ----------------
    {
        name: "かつ（両方とも真）",
        ast: [
            { type: "assign", name: "x", value: "5" },
            {
                type: "if",
                condition: "x > 0 かつ x < 10",
                body: [{ type: "print", value: '"はんい内"' }]
            }
        ],
        expected: "はんい内\n"
    },

    {
        name: "かつ（片方が偽なら実行しない）",
        ast: [
            { type: "assign", name: "x", value: "15" },
            {
                type: "ifelse",
                condition: "x > 0 かつ x < 10",
                ifBody: [{ type: "print", value: '"はんい内"' }],
                elseBody: [{ type: "print", value: '"はんい外"' }]
            }
        ],
        expected: "はんい外\n"
    },

    {
        name: "または（片方が真なら実行する）",
        ast: [
            { type: "assign", name: "ten", value: "45" },
            {
                type: "ifelse",
                condition: "ten >= 80 または ten <= 50",
                ifBody: [{ type: "print", value: '"よびだし"' }],
                elseBody: [{ type: "print", value: '"ふつう"' }]
            }
        ],
        expected: "よびだし\n"
    },

    {
        name: "かつ は または より先に計算する",
        ast: [
            { type: "assign", name: "x", value: "0" },
            {
                type: "ifelse",
                // 1 == 1（真） または 1 == 2 かつ 1 == 3（偽） → 真
                condition: "1 == 1 または 1 == 2 かつ 1 == 3",
                ifBody: [{ type: "print", value: '"真"' }],
                elseBody: [{ type: "print", value: '"偽"' }]
            }
        ],
        expected: "真\n"
    },

    {
        name: "かつ（配列と繰り返しの組み合わせ）",
        ast: [
            { type: "assign", name: "ten", value: "[55, 82, 91, 70]" },
            { type: "assign", name: "kazu", value: "0" },
            {
                type: "for",
                varName: "i",
                start: "0",
                end: "3",
                step: "1",
                body: [
                    {
                        type: "if",
                        condition: "ten[i] >= 80 かつ ten[i] <= 90",
                        body: [{ type: "assign", name: "kazu", value: "kazu + 1" }]
                    }
                ]
            },
            { type: "print", value: "kazu" }
        ],
        expected: "1\n"
    },

    {
        name: "かつ（条件繰り返し）",
        ast: [
            { type: "assign", name: "x", value: "0" },
            {
                type: "while",
                condition: "x < 5 かつ x != 3",
                body: [{ type: "assign", name: "x", value: "x + 1" }]
            },
            { type: "print", value: "x" }
        ],
        expected: "3\n"
    },

    {
        name: "文字列（if条件に影響しない）",
        ast: [
            { type: "assign", name: "x", value: "1" },
            { type: "print", value: '"OK"' },
            {
                type: "if",
                condition: "x==1",
                body: [
                    { type: "print", value: '"YES"' }
                ]
            }
        ],
        expected: "OK\nYES\n"
    },

    // ----------------
    // 関数（ユーザー定義）
    // ----------------
    {
        name: "関数: 引数と戻り値",
        ast: [
            {
                type: "func", name: "tashizan", params: "a, b",
                body: [{ type: "return", value: "a + b" }]
            },
            { type: "assign", name: "kekka", value: "tashizan(4, 3)" },
            { type: "print", value: "kekka" }
        ],
        expected: "7\n"
    },

    {
        name: "関数: 表示の中で呼ぶ",
        ast: [
            {
                type: "func", name: "nijou", params: "x",
                body: [{ type: "return", value: "x * x" }]
            },
            { type: "print", value: "nijou(6)" },
            { type: "print", value: "nijou(13)" }
        ],
        expected: "36\n169\n"
    },

    {
        name: "関数: 式の一部として呼ぶ",
        ast: [
            {
                type: "func", name: "nijou", params: "x",
                body: [{ type: "return", value: "x * x" }]
            },
            { type: "assign", name: "s", value: "nijou(3) + nijou(4)" },
            { type: "print", value: "s" }
        ],
        expected: "25\n"
    },

    {
        name: "関数: 入れ子の呼び出し",
        ast: [
            {
                type: "func", name: "nijou", params: "x",
                body: [{ type: "return", value: "x * x" }]
            },
            { type: "print", value: "nijou(nijou(2))" }
        ],
        expected: "16\n"
    },

    {
        name: "関数: 引数はローカル（呼び出し元は変わらない）",
        ast: [
            {
                type: "func", name: "kaeru", params: "x",
                body: [
                    { type: "assign", name: "x", value: "x + 100" },
                    { type: "return", value: "x" }
                ]
            },
            { type: "assign", name: "x", value: "1" },
            { type: "assign", name: "y", value: "kaeru(x)" },
            { type: "print", value: "x" },
            { type: "print", value: "y" }
        ],
        expected: "1\n101\n"
    },

    {
        name: "関数: 返したら残りは実行しない",
        ast: [
            {
                type: "func", name: "hantei", params: "n",
                body: [
                    {
                        type: "if", condition: "n >= 10",
                        body: [{ type: "return", value: '"2けた以上"' }]
                    },
                    { type: "return", value: '"1けた"' }
                ]
            },
            { type: "print", value: "hantei(97)" },
            { type: "print", value: "hantei(3)" }
        ],
        expected: "2けた以上\n1けた\n"
    },

    {
        name: "関数: 中で繰り返す",
        ast: [
            {
                type: "func", name: "goukei", params: "n",
                body: [
                    { type: "assign", name: "sum", value: "0" },
                    {
                        type: "for", varName: "i", start: "1", end: "n", step: "1",
                        body: [{ type: "assign", name: "sum", value: "sum + i" }]
                    },
                    { type: "return", value: "sum" }
                ]
            },
            { type: "print", value: "goukei(5)" }
        ],
        expected: "15\n"
    },

    {
        name: "関数: 呼び出しだけの行（戻り値を使わない）",
        ast: [
            {
                type: "func", name: "aisatsu", params: "namae",
                body: [{ type: "print", value: '"こんにちは、" + namae' }]
            },
            { type: "call", value: 'aisatsu("たろう")' },
            { type: "call", value: 'aisatsu("はなこ")' }
        ],
        expected: "こんにちは、たろう\nこんにちは、はなこ\n"
    },

    {
        name: "関数: 条件の中で呼ぶ",
        ast: [
            {
                type: "func", name: "amari", params: "a, b",
                body: [{ type: "return", value: "a % b" }]
            },
            {
                type: "ifelse", condition: "amari(10, 2) == 0",
                ifBody: [{ type: "print", value: '"偶数"' }],
                elseBody: [{ type: "print", value: '"奇数"' }]
            }
        ],
        expected: "偶数\n"
    },

    {
        name: "関数: 繰り返しの終わりの値に使う",
        ast: [
            {
                type: "func", name: "kaisu", params: "n",
                body: [{ type: "return", value: "n * 2" }]
            },
            {
                type: "for", varName: "i", start: "1", end: "kaisu(2)", step: "1",
                body: [{ type: "print", value: "i" }]
            }
        ],
        expected: "1\n2\n3\n4\n"
    },

    {
        name: "関数: 再帰（階乗）",
        ast: [
            {
                type: "func", name: "kaijou", params: "n",
                body: [
                    {
                        type: "if", condition: "n <= 1",
                        body: [{ type: "return", value: "1" }]
                    },
                    { type: "return", value: "n * kaijou(n - 1)" }
                ]
            },
            { type: "print", value: "kaijou(5)" }
        ],
        expected: "120\n"
    },

    {
        name: "関数: 配列を返す",
        ast: [
            {
                type: "func", name: "tsukuru", params: "",
                body: [{ type: "return", value: "[3, 1, 2]" }]
            },
            { type: "assign", name: "a", value: "tsukuru()" },
            { type: "print", value: "a[0]" },
            { type: "print", value: "a" }
        ],
        expected: "3\n[3,1,2]\n"
    },

    {
        name: "関数: 定義しただけでは実行されない",
        ast: [
            {
                type: "func", name: "damare", params: "",
                body: [{ type: "print", value: '"出ないはず"' }]
            },
            { type: "print", value: '"OK"' }
        ],
        expected: "OK\n"
    },
];

// =========================
// テスト実行（Console用）
// =========================
function runTests() {
    let success = 0;

    TESTS.forEach((test, i) => {

        try {
            // 初期化
            vars = {};
            output = "";
            trace = [];
            stepIndex = 0;

            let passed;

            if (test.customRun) {
                passed = test.customRun();
            } else {
                // 実行
                buildTrace(test.ast);

                while (stepIndex < trace.length) {
                    runTraceStep(trace[stepIndex++]);
                }

                passed = test.assert ? test.assert() : output === test.expected;
            }

            if (passed) success++;

            // ログ
            console.group(`#${i + 1} ${test.name}`);

            if (passed) {
                console.log("✅ OK");
            } else {
                console.error("❌ NG");
                console.log("期待:", test.expected);
                console.log("実際:", output);
            }

            console.groupEnd();

        } catch (e) {
            console.group(`#${i + 1} ${test.name}`);
            console.error("❌ ERROR:", e.message);
            console.groupEnd();
        }
    });

    console.log(`\n🎯 合格: ${success}/${TESTS.length}`);
}

// =========================
// URL共有の簡易チェック（Console用）
// =========================
function testShareRoundtrip() {
    const ast = [
        { type: "assign", name: "a", value: "[1,2,3]" },
        { type: "print", value: "a[1]" },
        {
            type: "for",
            varName: "i",
            start: "0",
            end: "2",
            step: "1",
            body: [{ type: "print", value: "a[i]" }]
        }
    ];

    const encoded = (typeof encodeProgramAst === "function") ? encodeProgramAst(ast) : null;
    if (!encoded) return false;

    const decoded = (typeof decodeProgramAst === "function") ? decodeProgramAst(encoded) : null;
    return JSON.stringify(ast) === JSON.stringify(decoded);
}
