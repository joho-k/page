function renderPracticeProblems() {
    const tbody = document.getElementById("practice-tbody");
    if (!tbody) return;

    const quizData = window.quizData ?? {};
    const ids = Object.keys(quizData);
    for (let id of ids) {
        const quiz = id ? quizData[id] : null;

        if (!quiz) {
            const tr = document.createElement("tr");
            const td = document.createElement("td");
            td.colSpan = 4;
            td.className = "practice-empty";
            td.textContent = "準備中です。";
            tr.append(td);
            tbody.replaceChildren(tr);
            return;
        }

        const tr = document.createElement("tr");

        const tdDifficulty = document.createElement("td");
        tdDifficulty.className = "practice-difficulty";
        const difficulty = Math.max(1, Math.min(5, Number(quiz.difficulty) || 1));
        tdDifficulty.textContent = "★".repeat(difficulty) + "☆".repeat(5 - difficulty);

        const tdTitle = document.createElement("td");
        const a = document.createElement("a");
        a.href = `./editor.html?mode=quiz&id=${encodeURIComponent(id)}`;
        a.textContent = `${id}：${quiz.title ?? "問題"}`;
        tdTitle.append(a);

        const tdContent = document.createElement("td");
        tdContent.textContent = String(quiz.question ?? "").split("\n")[0];

        const tdAddedAt = document.createElement("td");
        tdAddedAt.className = "practice-addedAt";
        tdAddedAt.textContent = quiz.addedAt ?? "-";

        tr.append(tdDifficulty, tdTitle, tdContent, tdAddedAt);
        tbody.appendChild(tr);
    }
}

renderPracticeProblems();
