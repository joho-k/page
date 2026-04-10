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
    }

];

// =========================
// テスト実行（Console用）
// =========================
function runTests() {
    console.clear();

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