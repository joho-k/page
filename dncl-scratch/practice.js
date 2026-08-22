/**
 * 練習問題リスト（dncl-scratch/index.html の「練習問題を解く」）。
 *
 * しぼりこみは 単元 × 難易度 × キーワード の3つ。
 * 単元と難易度は URL（?topic=loop&difficulty=3）に残すので、動画や授業から
 * 「この単元だけ」のリンクをそのまま配れる。
 */
let practiceDifficultyFilter = "";
let practiceTopicFilter = "";
let practiceSort = "newest";

function isNewQuiz(dateStr) {
    if (!dateStr) return false;
    const now = new Date();
    const added = new Date(dateStr);
    return now - added <= 1000 * 60 * 60 * 24 * 7;
}

function quizTopicIds(id, quiz) {
    return window.dnclTopics ? window.dnclTopics.topicIdsOf(quiz, id) : [];
}

function topicName(topicId) {
    const topic = window.dnclTopics && window.dnclTopics.topicById(topicId);
    return topic ? topic.name : "";
}

/** いまの絞り込みを URL に残す（戻るボタンを汚さないよう replaceState を使う） */
function syncPracticeUrl() {
    const params = new URLSearchParams(window.location.search);

    practiceTopicFilter ? params.set("topic", practiceTopicFilter) : params.delete("topic");
    practiceDifficultyFilter ? params.set("difficulty", practiceDifficultyFilter) : params.delete("difficulty");

    const query = params.toString();
    history.replaceState(null, "", `${window.location.pathname}${query ? "?" + query : ""}${window.location.hash}`);
}

function filteredEntries() {
    const search = document.getElementById("practice-search")?.value?.trim()?.toLowerCase() ?? "";

    let entries = Object.entries(window.quizData ?? {});

    if (search) {
        entries = entries.filter(([id, quiz]) => {
            const text = [id, quiz.title, quiz.question].join(" ").toLowerCase();
            return text.includes(search);
        });
    }

    if (practiceTopicFilter) {
        entries = entries.filter(([id, quiz]) => quizTopicIds(id, quiz).includes(practiceTopicFilter));
    }

    if (practiceDifficultyFilter) {
        entries = entries.filter(([_, quiz]) => String(quiz.difficulty ?? "") === practiceDifficultyFilter);
    }

    if (practiceSort === "newest") {
        entries.sort((a, b) => new Date(b[1].addedAt ?? 0) - new Date(a[1].addedAt ?? 0));
    }

    if (practiceSort === "id") {
        entries.sort((a, b) => a[0].localeCompare(b[0], undefined, { numeric: true }));
    }

    return entries;
}

function renderPracticeProblems() {
    const tbody = document.getElementById("practice-tbody");
    if (!tbody) return;

    const entries = filteredEntries();

    const note = document.getElementById("practice-result-note");
    if (note) {
        const label = practiceTopicFilter ? `「${topicName(practiceTopicFilter)}」の問題` : "すべての問題";
        note.textContent = `${label}：${entries.length}問`;
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

        // どの単元の問題かをタイトルの下に出す。押すとその単元だけに絞れる。
        const topicIds = quizTopicIds(id, quiz);
        if (topicIds.length) {
            const topicRow = document.createElement("div");
            topicRow.className = "practice-topics";

            topicIds.forEach((topicId) => {
                const chip = document.createElement("button");
                chip.type = "button";
                chip.className = "topic-chip";
                chip.dataset.topicChip = topicId;
                chip.textContent = topicName(topicId);
                chip.addEventListener("click", () => setTopicFilter(topicId));
                topicRow.append(chip);
            });

            tdTitle.append(topicRow);
        }

        // 内容は1行だけ。全文は「詳細」で開く
        const question = String(quiz.question ?? "");

        const tdContent = document.createElement("td");
        tdContent.className = "practice-content";

        const contentRow = document.createElement("div");
        contentRow.className = "practice-content-row";

        // 全文を入れておき、閉じている間だけ1行に省略する
        const contentLine = document.createElement("span");
        contentLine.className = "practice-content-line";
        contentLine.textContent = question;

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

        detailButton.addEventListener("click", () => {
            const open = contentLine.classList.toggle("is-open");
            detailButton.setAttribute("aria-expanded", String(open));
            detailButton.innerHTML = open
                ? '閉じる <i class="fa-solid fa-chevron-up"></i>'
                : '詳細 <i class="fa-solid fa-chevron-down"></i>';
        });

        tbody.append(tr);
    }
}

/** 単元タブ。問題が1問も無い単元（関数）はタブに出さない。 */
function renderTopicTabs() {
    const wrap = document.getElementById("topic-tabs");
    if (!wrap || !window.dnclTopics) return;

    const counts = window.dnclTopics.countByTopic(window.quizData ?? {});
    const total = Object.keys(window.quizData ?? {}).length;

    wrap.innerHTML = "";

    const tabs = [{ id: "", name: "すべて", count: total }].concat(
        window.dnclTopics.TOPICS
            .filter((t) => counts[t.id] > 0)
            .map((t) => ({ id: t.id, name: t.name, count: counts[t.id] }))
    );

    tabs.forEach((tab) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "topic-tab";
        button.dataset.topic = tab.id;
        button.setAttribute("role", "tab");
        button.innerHTML = `${tab.name}<span class="topic-tab-count">${tab.count}</span>`;
        button.addEventListener("click", () => setTopicFilter(tab.id));
        wrap.append(button);
    });

    markActiveTopicTab();
}

function markActiveTopicTab() {
    document.querySelectorAll("[data-topic]").forEach((b) => {
        const active = (b.dataset.topic ?? "") === practiceTopicFilter;
        b.classList.toggle("active", active);
        b.setAttribute("aria-selected", String(active));
    });

    document.querySelectorAll("[data-topic-chip]").forEach((b) => {
        b.classList.toggle("active", (b.dataset.topicChip ?? "") === practiceTopicFilter);
    });
}

/** 単元をしぼりこむ。単元カードや動画の下のリンクからも呼ぶ。 */
function setTopicFilter(topicId, options = {}) {
    practiceTopicFilter = topicId ?? "";

    markActiveTopicTab();
    renderPracticeProblems();
    syncPracticeUrl();

    if (options.scroll) {
        document.getElementById("problems")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
}

/** 動画や「難易度からえらぶ」からのリンク（?topic=loop&difficulty=3）を反映する */
function applyFiltersFromUrl() {
    const params = new URLSearchParams(window.location.search);

    const topic = params.get("topic") ?? "";
    if (window.dnclTopics && window.dnclTopics.topicById(topic)) {
        practiceTopicFilter = topic;
    }

    const difficulty = params.get("difficulty") ?? "";
    if (["1", "2", "3", "4", "5"].includes(difficulty)) {
        practiceDifficultyFilter = difficulty;

        document.querySelectorAll("[data-difficulty]")
            .forEach((b) => b.classList.toggle("active", (b.dataset.difficulty ?? "") === difficulty));

        const select = document.getElementById("practice-difficulty-select");
        if (select) select.value = difficulty;
    }
}

window.addEventListener("DOMContentLoaded", () => {

    applyFiltersFromUrl();

    renderTopicTabs();
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
                syncPracticeUrl();
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
            syncPracticeUrl();
        });

    document.getElementById("practice-sort-select")
        ?.addEventListener("change", (e) => {
            practiceSort = e.target.value;
            renderPracticeProblems();
        });
});
