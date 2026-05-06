const PRACTICE_PROBLEMS = [
    {
        difficulty: 1,
        title: "基礎：入出力・代入",
        content: "変数、代入、表示、簡単な式の評価を確認します。",
        addedAt: "2026-05-06",
    },
    {
        difficulty: 2,
        title: "基礎：条件分岐",
        content: "「もし」「そうでなければ」を使った分岐の典型パターンを練習します。",
        addedAt: "2026-05-06",
    },
    {
        difficulty: 2,
        title: "基礎：繰り返し",
        content: "回数繰り返し・条件繰り返しと、カウンタや累積の考え方を身につけます。",
        addedAt: "2026-05-06",
    },
    {
        difficulty: 3,
        title: "標準：配列",
        content: "集計、最大/最小、探索など、共通テスト頻出の配列処理を練習します。",
        addedAt: "2026-05-06",
    },
    {
        difficulty: 3,
        title: "標準：アルゴリズム",
        content: "基本的な手順（入替、整列の考え方など）を小問で確認します。",
        addedAt: "2026-05-06",
    },
    {
        difficulty: 4,
        title: "応用：思考問題",
        content: "条件整理、境界値、手続きの読み取りを含む問題に挑戦します。",
        addedAt: "2026-05-06",
    },
];

function difficultyLabel(difficulty) {
    const clamped = Math.max(1, Math.min(5, Number(difficulty) || 1));
    const stars = "★".repeat(clamped) + "☆".repeat(5 - clamped);
    return `難易度 ${clamped}/5（${stars}）`;
}

function renderPracticeProblems(problems) {
    const tbody = document.getElementById("practice-tbody");
    if (!tbody) return;

    if (!Array.isArray(problems) || problems.length === 0) {
        const tr = document.createElement("tr");
        const td = document.createElement("td");
        td.colSpan = 4;
        td.className = "practice-empty";
        td.textContent = "準備中です。";
        tr.append(td);
        tbody.replaceChildren(tr);
        return;
    }

    tbody.replaceChildren(
        ...problems.map((problem) => {
            const tr = document.createElement("tr");

            const tdDifficulty = document.createElement("td");
            tdDifficulty.className = "practice-difficulty";
            tdDifficulty.textContent = difficultyLabel(problem.difficulty);

            const tdTitle = document.createElement("td");
            tdTitle.textContent = problem.title;

            const tdContent = document.createElement("td");
            tdContent.textContent = problem.content;

            const tdAddedAt = document.createElement("td");
            tdAddedAt.className = "practice-addedAt";
            tdAddedAt.textContent = problem.addedAt;

            tr.append(tdDifficulty, tdTitle, tdContent, tdAddedAt);
            return tr;
        }),
    );
}

renderPracticeProblems(PRACTICE_PROBLEMS);
