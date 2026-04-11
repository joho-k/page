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

            // 実行
            buildTrace(test.ast);

            while (stepIndex < trace.length) {
                trace[stepIndex++]();
            }

            const passed = output === test.expected;

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