// =========================
// テストケース
// =========================
const TESTS = [

    {
        name: "基本計算",
        ast: [
            { type: "assign", name: "x", value: "1+2*3" },
            { type: "print", value: "x" }
        ],
        expected: "7\n"
    },

    {
        name: "if true",
        ast: [
            { type: "assign", name: "x", value: "10" },
            {
                type: "if", condition: "x>5", body: [
                    { type: "print", value: "1" }
                ]
            }
        ],
        expected: "1\n"
    },

    {
        name: "for",
        ast: [
            {
                type: "for", varName: "i", start: "1", end: "3", step: "1", body: [
                    { type: "print", value: "i" }
                ]
            }
        ],
        expected: "1\n2\n3\n"
    },

    {
        name: "for + if（重要）",
        ast: [
            {
                type: "for", varName: "i", start: "1", end: "10", step: "1", body: [
                    {
                        type: "if", condition: "i>5", body: [
                            { type: "print", value: "i" }
                        ]
                    }
                ]
            }
        ],
        expected: "6\n7\n8\n9\n10\n"
    },

    {
        name: "ネスト",
        ast: [
            {
                type: "for", varName: "i", start: "1", end: "2", step: "1", body: [
                    {
                        type: "for", varName: "j", start: "1", end: "2", step: "1", body: [
                            { type: "print", value: "i+j" }
                        ]
                    }
                ]
            }
        ],
        expected: "2\n3\n3\n4\n"
    },

    // ----------------
    // 基本
    // ----------------
    {
        name: "配列生成",
        ast: [
            { type: "assign", name: "a", value: "[1,2,3]" },
            { type: "print", value: "a" }
        ],
        expected: "[1,2,3]\n"
    },

    // ----------------
    // 1次元配列テスト
    // ----------------
    {
        name: "1次元配列アクセス",
        ast: [
            { type: "assign", name: "a", value: "[5,10,15]" },
            { type: "print", value: "a[0]" },
            { type: "print", value: "a[1]" },
            { type: "print", value: "a[2]" }
        ],
        expected: "5\n10\n15\n"
    },

    {
        name: "1次元配列 + 計算",
        ast: [
            { type: "assign", name: "a", value: "[1,2,3]" },
            { type: "print", value: "a[0] + a[1] + a[2]" }
        ],
        expected: "6\n"
    },

    {
        name: "1次元配列 + for",
        ast: [
            { type: "assign", name: "a", value: "[2,4,6]" },
            {
                type: "for", varName: "i", start: "0", end: "2", step: "1", body: [
                    { type: "print", value: "a[i]" }
                ]
            }
        ],
        expected: "2\n4\n6\n"
    },

    {
        name: "1次元配列 + 範囲外",
        ast: [
            { type: "assign", name: "a", value: "[1,2,3]" },
            { type: "print", value: "a[5]" }
        ],
        expected: "0\n"
    },
    {
        name: "配列 + for + 範囲外",
        ast: [
            { type: "assign", name: "a", value: "[0,1,2,3]" },
            {
                type: "for", varName: "i", start: "1", end: "10", step: "1", body: [
                    { type: "print", value: "a[i]" }
                ]
            }
        ],
        expected:
            "1\n2\n3\n0\n0\n0\n0\n0\n0\n0\n"
    },

    {
        name: "2重ループ + 配列",
        ast: [
            { type: "assign", name: "a", value: "[1,2]" },
            {
                type: "for", varName: "i", start: "0", end: "1", step: "1", body: [
                    {
                        type: "for", varName: "j", start: "0", end: "1", step: "1", body: [
                            { type: "print", value: "a[i] + a[j]" }
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
    // ネスト配列
    // ----------------
    {
        name: "2次元配列",
        ast: [
            { type: "assign", name: "a", value: "[[1,2],[3,4]]" },
            { type: "print", value: "a[1][0]" }
        ],
        expected: "3\n"
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