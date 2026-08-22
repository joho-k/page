/**
 * 共テプロトレのトップページ（dncl-scratch/index.html）の、問題リスト以外の部分。
 *   ・解説動画（サムネイルを押したときだけ YouTube を読み込む）
 *   ・単元カード（要点＋動画＋その単元の問題へ）
 *   ・問題数
 *
 * 問題リストのしぼりこみは practice.js が持っている（setTopicFilter を呼ぶ）。
 */
(function () {
    "use strict";

    const quizzes = Object.entries(window.quizData ?? {});
    const topics = window.dnclTopics;

    // ---- 動画 -------------------------------------------------------------
    // サムネイルは画像1枚。押されて初めて iframe を作るので、開いただけでは YouTube を読み込まない。
    function embedVideo(facade) {
        const videoId = facade.dataset.video;
        if (!videoId) return null;

        const wrap = document.createElement("div");
        wrap.className = "video-embed";
        if (facade.classList.contains("video-facade-lg")) wrap.classList.add("video-embed-lg");
        wrap.dataset.video = videoId;

        const iframe = document.createElement("iframe");
        iframe.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}?autoplay=1&rel=0`;
        iframe.title = facade.dataset.label || "解説動画";
        iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
        iframe.allowFullscreen = true;
        wrap.append(iframe);

        facade.replaceWith(wrap);

        // サイトから動画がどれだけ再生されたかを見るため
        if (typeof gtag === "function") {
            gtag("event", "video_start", {
                video_id: videoId,
                video_title: facade.dataset.label || videoId,
            });
        }

        return wrap;
    }

    /** 単元カードの「動画を見る」から、動画の場所まで連れていって再生する。 */
    function playVideo(videoId) {
        const embedded = document.querySelector(`.video-embed[data-video="${videoId}"]`);
        if (embedded) {
            embedded.scrollIntoView({ behavior: "smooth", block: "center" });
            return;
        }

        const facade = document.querySelector(`.video-facade[data-video="${videoId}"]`);
        if (!facade) return;

        facade.scrollIntoView({ behavior: "smooth", block: "center" });
        embedVideo(facade);
    }

    document.querySelectorAll(".video-facade").forEach((facade) => {
        facade.addEventListener("click", () => embedVideo(facade));
    });

    // ---- 問題数 -----------------------------------------------------------
    document.querySelectorAll("#protro-quiz-count, [data-quiz-count]").forEach((el) => {
        el.textContent = String(quizzes.length);
    });

    if (!topics) return;

    const counts = topics.countByTopic(window.quizData ?? {});

    document.querySelectorAll("[data-topic-count]").forEach((el) => {
        const count = counts[el.dataset.topicCount] ?? 0;
        el.textContent = `（${count}問）`;
    });

    // ---- 単元カード -------------------------------------------------------
    const cardList = document.getElementById("topic-cards");

    if (cardList) {
        cardList.innerHTML = "";

        topics.TOPICS.forEach((topic) => {
            const count = counts[topic.id] ?? 0;

            const li = document.createElement("li");
            li.className = "topic-card";
            if (topic.comingSoon) li.classList.add("topic-card-soon");

            const head = document.createElement("div");
            head.className = "topic-card-head";

            const h3 = document.createElement("h3");
            h3.textContent = topic.name;

            const badge = document.createElement("span");
            badge.className = "topic-card-count";
            badge.textContent = topic.comingSoon ? "準備中" : `${count}問`;

            head.append(h3, badge);
            li.append(head);

            const lead = document.createElement("p");
            lead.className = "topic-card-lead";
            lead.textContent = topic.lead;
            li.append(lead);

            if (topic.example) {
                const pre = document.createElement("pre");
                pre.className = "topic-card-code";
                const code = document.createElement("code");
                code.textContent = topic.example;
                pre.append(code);
                li.append(pre);
            }

            if (topic.pitfall) {
                const pitfall = document.createElement("p");
                pitfall.className = "topic-card-pitfall";
                pitfall.innerHTML = `<b>つまずきやすいところ</b>`;
                pitfall.append(document.createTextNode(topic.pitfall));
                li.append(pitfall);
            }

            const actions = document.createElement("div");
            actions.className = "topic-card-actions";

            if (topic.video) {
                const videoButton = document.createElement("button");
                videoButton.type = "button";
                videoButton.className = "topic-card-video";
                videoButton.innerHTML = `<i class="fa-solid fa-play"></i> ${topic.videoLabel} を見る`;
                videoButton.addEventListener("click", () => playVideo(topic.video));
                actions.append(videoButton);
            }

            if (count > 0) {
                const goButton = document.createElement("button");
                goButton.type = "button";
                goButton.className = "topic-card-go";
                goButton.textContent = `${topic.name}の問題を解く`;
                goButton.addEventListener("click", () => window.setTopicFilter(topic.id, { scroll: true }));
                actions.append(goButton);
            }

            if (topic.comingSoon) {
                const soon = document.createElement("p");
                soon.className = "topic-card-soon-note";
                soon.textContent = "問題と解説動画を準備しています。";
                li.append(soon);
            }

            if (actions.childElementCount) li.append(actions);

            cardList.append(li);
        });
    }
})();
