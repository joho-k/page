let practiceDifficultyFilter = "";
let practiceSort = "newest";

function isNewQuiz(dateStr) {
    if (!dateStr) return false;
    const now = new Date();
    const added = new Date(dateStr);
    return now - added <= 1000 * 60 * 60 * 24 * 7;
}

function renderPracticeProblems() {
    const tbody = document.getElementById("practice-tbody");
    if (!tbody) return;

    const search = document.getElementById("practice-search")?.value?.trim()?.toLowerCase() ?? "";

    let entries = Object.entries(window.quizData ?? {});

    if (search) {
        entries = entries.filter(([id, quiz]) => {
            const text = [id, quiz.title, quiz.question].join(" ").toLowerCase();
            return text.includes(search);
        });
    }

    if (practiceDifficultyFilter) {
        entries = entries.filter(([_, quiz]) => {
            return String(quiz.difficulty ?? "") === practiceDifficultyFilter;
        });
    }

    if (practiceSort === "newest") {
        entries.sort((a, b) => {
            return new Date(b[1].addedAt ?? 0) - new Date(a[1].addedAt ?? 0);
        });
    }

    if (practiceSort === "id") {
        entries.sort((a, b) => {
            return a[0].localeCompare(b[0], undefined, { numeric: true });
        });
    }

    tbody.innerHTML = "";

    if (entries.length === 0) {
        const tr = document.createElement("tr");
        const td = document.createElement("td");
        td.colSpan = 4;
        td.className = "practice-empty";
        td.textContent = "該当する問題がありません。";
        tr.append(td);
        tbody.appendChild(tr);
        return;
    }

    for (const [id, quiz] of entries) {
        const tr = document.createElement("tr");

        const tdDifficulty = document.createElement("td");
        tdDifficulty.className = "practice-difficulty";

        const difficulty = Math.max(1, Math.min(5, Number(quiz.difficulty) || 1));

        tdDifficulty.textContent =
            "★".repeat(difficulty) +
            "☆".repeat(5 - difficulty);

        const tdTitle = document.createElement("td");

        const a = document.createElement("a");

        // 問題ごとの静的ページ（中身は editor と同じ画面。問題ごとのカード画像とURLを持つ）
        a.href = `./quiz/${encodeURIComponent(id)}/index.html`;

        a.innerHTML = `
${id}：${quiz.title ?? "問題"}
${isNewQuiz(quiz.addedAt) ? '<span class="practice-new">NEW</span>' : ""}
`;

        tdTitle.append(a);

        // 内容は1行だけ。全文は「詳細」で開く
        const question = String(quiz.question ?? "");

        const tdContent = document.createElement("td");
        tdContent.className = "practice-content";

        const contentRow = document.createElement("div");
        contentRow.className = "practice-content-row";

        const contentLine = document.createElement("span");
        contentLine.className = "practice-content-line";
        contentLine.textContent = question.split("\n")[0];

        const detailButton = document.createElement("button");
        detailButton.type = "button";
        detailButton.className = "practice-detail-button";
        detailButton.setAttribute("aria-expanded", "false");
        detailButton.innerHTML = '詳細 <i class="fa-solid fa-chevron-down"></i>';

        contentRow.append(contentLine, detailButton);
        tdContent.append(contentRow);

        const tdAddedAt = document.createElement("td");
        tdAddedAt.className = "practice-addedAt";

        const date = new Date(quiz.addedAt);
        const y = date.getFullYear();
        const m = date.getMonth() + 1;
        const d = date.getDate();

        tdAddedAt.textContent = `${y}/${m}/${d}` ?? "-";

        tr.append(tdDifficulty, tdTitle, tdContent, tdAddedAt);

        // 全文を出す行（初期は隠す）
        const detailRow = document.createElement("tr");
        detailRow.className = "practice-detail-row";
        detailRow.hidden = true;

        const detailCell = document.createElement("td");
        detailCell.colSpan = 4;
        detailCell.className = "practice-detail-body";
        detailCell.textContent = question;
        detailRow.append(detailCell);

        detailButton.addEventListener("click", () => {
            const open = detailRow.hidden;
            detailRow.hidden = !open;
            detailButton.setAttribute("aria-expanded", String(open));
            detailButton.innerHTML = open
                ? '閉じる <i class="fa-solid fa-chevron-up"></i>'
                : '詳細 <i class="fa-solid fa-chevron-down"></i>';
        });

        tbody.append(tr, detailRow);
    }
}

// トップページの「難易度からえらぶ」から ?difficulty=N で直接しぼりこめるようにする
function applyDifficultyFromUrl() {
    const value = new URLSearchParams(window.location.search).get("difficulty") ?? "";
    if (!["1", "2", "3", "4", "5"].includes(value)) return;

    practiceDifficultyFilter = value;

    document.querySelectorAll("[data-difficulty]")
        .forEach((b) => b.classList.toggle("active", (b.dataset.difficulty ?? "") === value));

    const select = document.getElementById("practice-difficulty-select");
    if (select) select.value = value;
}

window.addEventListener("DOMContentLoaded", () => {

    applyDifficultyFromUrl();

    renderPracticeProblems();

    document.getElementById("practice-search")
        ?.addEventListener("input", renderPracticeProblems);

    document.querySelectorAll("[data-difficulty]")
        .forEach((btn) => {
            btn.addEventListener("click", () => {
                practiceDifficultyFilter = btn.dataset.difficulty ?? "";

                document.querySelectorAll("[data-difficulty]")
                    .forEach((b) => b.classList.remove("active"));

                btn.classList.add("active");

                renderPracticeProblems();
            });
        });

    document.querySelectorAll("[data-sort]")
        .forEach((btn) => {
            btn.addEventListener("click", () => {
                practiceSort = btn.dataset.sort ?? "newest";

                document.querySelectorAll("[data-sort]")
                    .forEach((b) => b.classList.remove("active"));

                btn.classList.add("active");

                renderPracticeProblems();
            });
        });

    document.getElementById("practice-difficulty-select")
        ?.addEventListener("change", (e) => {
            practiceDifficultyFilter = e.target.value;
            renderPracticeProblems();
        });

    document.getElementById("practice-sort-select")
        ?.addEventListener("change", (e) => {
            practiceSort = e.target.value;
            renderPracticeProblems();
        });
});