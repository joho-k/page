// 使い方ツアー：説明する要素だけを明るく残し、まわりを黒い半透明で覆って案内する
(function () {
    // 各手順の指定方法
    //   selector(単数) / selectors(複数→囲む範囲) … スポットライトを当てる対象
    //   interactive … 対象（または clickSelector）を実際に押せるようにし、押すと次へ進む
    //   clickSelector … interactive で「押す対象」をスポットライトと別にしたいとき
    //   onEnter … 表示前に呼ぶ準備処理
    //   center … 対象を持たず、画面全体を暗くして中央にメッセージを出す

    // ステップ実行〜締めはエディター・問題モードで共通
    function sharedStepSteps() {
        return [
            {
                selector: 'button[onclick="stepStart()"]',
                title: "ここが一番の売り！ステップ実行",
                text: "このシステムの主役が「ステップ実行」です。プログラムを1行ずつ、自分のペースで動かせます。まずは「ステップ開始」を押してみましょう。",
                interactive: true
            },
            {
                selector: "#step-next-button",
                title: "「次へ」を押してみましょう",
                text: "ステップ実行こそ、このシステムの一番の魅力。プログラムの「次へ」を押すと、処理が1行だけ進みます。押してみましょう。",
                interactive: true,
                onEnter: ensureStepStarted
            },
            {
                selector: "#workspace-panel",
                title: "1行ずつハイライト",
                text: "プログラムを見てください。今まさに実行される1行がハイライトされます。",
                onEnter: ensureStepAdvanced
            },
            {
                selector: "#step-explanation",
                title: "図で動きを理解",
                text: "さらに、その処理の詳しい動きを図で理解できます。もう一度「次へ」を押してみましょう。",
                interactive: true,
                clickSelector: "#step-next-button",
                onEnter: ensureStepAdvanced
            },
            {
                selector: "#vars_title",
                title: "変数もリアルタイム更新",
                text: "実行したステップに合わせて、変数の中身もリアルタイムに更新されます。値がどう変化していくかが一目で分かります。",
                onEnter: ensureStepAdvanced
            },
            {
                center: true,
                title: "このシステムを使って\nプログラムの理解を深めよう！",
                text: "「次へ」「前へ」で行き来しながら、説明と図でプログラムの動きをじっくり追いかけてみてください。"
            }
        ];
    }

    // エディター（通常モード）
    function buildEditorSteps() {
        return [
            {
                selector: ".palette",
                title: "パーツ（部品）",
                text: "ここにあるのがプログラムの部品です。代入・表示・もし・繰り返しなどを選ぶと、右側のプログラムに追加されます。"
            },
            {
                selectors: ["#workspace-panel", ".program-view-switch"],
                title: "プログラムとコード",
                text: "選んだ部品はここに組み上がります。「ブロック」と「コード」を切り替えると、実際のプログラムのコードとして見比べられます。"
            },
            {
                selector: 'button[onclick="run()"]',
                title: "実行ボタン",
                text: "これが実行ボタンです。組み立てたプログラムを、ここを押して一気に動かします。"
            },
            {
                selector: 'button[onclick="run()"]',
                title: "押してみましょう",
                text: "実際に押してみましょう。プログラムが動いて、結果が表示されます。ボタンを押すか「次へ」で進めます。",
                interactive: true
            },
            {
                selectors: ["#vars_title", "#output"],
                title: "変数と出力",
                text: "実行すると、変数の中身が「変数」に、表示ブロックの結果が「出力」に出ます。プログラムがどう動いたかをここで確かめます。"
            },
            ...sharedStepSteps()
        ];
    }

    // 問題モード
    function buildQuizSteps() {
        return [
            {
                selector: ".quiz-question-row",
                title: "問題文",
                text: "まずはここで問題文を確認します。何を答える問題なのかを読み取りましょう。"
            },
            {
                selector: "#workspace-panel",
                title: "プログラム",
                text: "これが問題のプログラムです。全体の流れを読みながら、空欄に何が入るかを考えます。"
            },
            {
                selector: ".quiz-blank-active",
                title: "ハイライトされた空欄",
                text: "黄色く光っているのが、いま答える空欄です。タップすると、その空欄を選べます。"
            },
            {
                selector: ".quiz-choices-row",
                title: "選択肢はここ",
                text: "選択肢はここに並びます。選んだものが、選択中の空欄に入ります。"
            },
            {
                selector: "#workspace-panel",
                title: "回答したら",
                text: "選んだ選択肢が空欄に入ります。空欄が複数あるときは、同じように全部の空欄を埋めましょう。"
            },
            {
                selector: 'button[onclick="run()"]',
                title: "回答ボタンで確認",
                text: "すべての空欄を埋めたら、「回答」ボタンを押して答え合わせをします。"
            },
            {
                selector: "#quiz-actions-buttons",
                title: "結果の見方",
                text: "回答すると、正解・不正解とプログラムの出力結果が表示されます。間違えても何度でも挑戦できます。"
            },
            ...sharedStepSteps()
        ];
    }

    // ステップ開始を押さずに来た場合でも、ボタンと説明欄を出しておく
    function ensureStepStarted() {
        const nb = document.getElementById("step-next-button");
        if (nb && nb.hidden && typeof stepStart === "function") stepStart();
    }

    // 「次へ」を押さずにツアーを進めた場合でも、1行は実行済みにしてハイライトを出す
    function ensureStepAdvanced() {
        ensureStepStarted();
        if (typeof stepHistory !== "undefined" && stepHistory.length === 0 &&
            typeof stepNext === "function") {
            stepNext();
        }
    }

    const PAD = 8; // スポットライトの余白
    let STEPS = [];
    let index = 0;
    let blocker, spotlight, tip, nav, navCount, prevBtn, nextBtn;
    let liftedEl = null;       // クリックできるよう前面に出した要素
    let liftedStyle = null;    // 元に戻すための保存スタイル
    let onLiftedClick = null;

    function buildUI() {
        blocker = document.createElement("div");
        blocker.className = "tour-blocker";

        spotlight = document.createElement("div");
        spotlight.className = "tour-spotlight";

        tip = document.createElement("div");
        tip.className = "tour-tip";
        tip.innerHTML =
            '<p class="tour-tip-title"></p>' +
            '<p class="tour-tip-text"></p>' +
            '<button type="button" class="tour-tip-close" hidden>閉じる</button>';
        tip.querySelector(".tour-tip-close").onclick = endTour;

        nav = document.createElement("div");
        nav.className = "tour-nav";

        navCount = document.createElement("span");
        navCount.className = "tour-nav-count";

        prevBtn = document.createElement("button");
        prevBtn.type = "button";
        prevBtn.className = "tour-nav-prev";
        prevBtn.textContent = "前へ";
        prevBtn.onclick = () => go(index - 1);

        nextBtn = document.createElement("button");
        nextBtn.type = "button";
        nextBtn.className = "tour-nav-next";
        nextBtn.onclick = () => go(index + 1);

        const closeBtn = document.createElement("button");
        closeBtn.type = "button";
        closeBtn.className = "tour-nav-close";
        closeBtn.textContent = "閉じる";
        closeBtn.onclick = endTour;

        nav.append(navCount, prevBtn, nextBtn, closeBtn);
        document.body.append(blocker, spotlight, tip, nav);

        blocker.addEventListener("click", endTour);
        window.addEventListener("resize", reposition);
        window.addEventListener("keydown", onKey);
    }

    function onKey(e) {
        if (e.key === "Escape") endTour();
        else if (e.key === "ArrowRight" || e.key === "Enter") go(index + 1);
        else if (e.key === "ArrowLeft") go(index - 1);
    }

    // 対象要素を取得（非表示は除外。複数指定なら囲む範囲を使う）
    function getTargets(step) {
        const sels = step.selectors || [step.selector];
        return sels
            .map((s) => document.querySelector(s))
            .filter((el) => el && el.getClientRects().length);
    }

    function unionRect(els) {
        const rects = els.map((el) => el.getBoundingClientRect());
        const top = Math.min(...rects.map((r) => r.top));
        const left = Math.min(...rects.map((r) => r.left));
        const right = Math.max(...rects.map((r) => r.right));
        const bottom = Math.max(...rects.map((r) => r.bottom));
        return { top, left, right, bottom, width: right - left, height: bottom - top };
    }

    function go(i) {
        if (i < 0) return;
        releaseLifted();
        if (i >= STEPS.length) { endTour(); return; }
        index = i;
        const step = STEPS[i];
        if (step.onEnter) step.onEnter(); // 必要なら対象を表示してから測る
        if (step.center) { requestAnimationFrame(render); return; }
        const els = getTargets(step);
        if (!els.length) { go(i + 1); return; } // 対象が無ければ飛ばす
        els[0].scrollIntoView({ block: "center", behavior: "auto" });
        requestAnimationFrame(render);
    }

    function render() {
        const step = STEPS[index];

        // 共通：説明文と操作パネル
        tip.querySelector(".tour-tip-title").textContent = step.title;
        tip.querySelector(".tour-tip-text").textContent = step.text || "";
        tip.classList.toggle("tour-tip-center", !!step.center);
        tip.querySelector(".tour-tip-close").hidden = !step.center; // 締めのダイアログだけ閉じるボタン
        navCount.textContent = (index + 1) + " / " + STEPS.length;
        prevBtn.disabled = index === 0;
        nextBtn.textContent = index === STEPS.length - 1 ? "完了" : "次へ";

        // 締めのメッセージ：画面全体を暗くして中央に表示
        if (step.center) {
            spotlight.style.width = "0px";
            spotlight.style.height = "0px";
            spotlight.style.top = (window.innerHeight / 2) + "px";
            spotlight.style.left = (window.innerWidth / 2) + "px";
            placeTipCenter();
            return;
        }

        const els = getTargets(step);
        if (!els.length) return;
        const r = unionRect(els);

        // スポットライト
        spotlight.style.top = (r.top - PAD) + "px";
        spotlight.style.left = (r.left - PAD) + "px";
        spotlight.style.width = (r.width + PAD * 2) + "px";
        spotlight.style.height = (r.height + PAD * 2) + "px";

        // 「押してみましょう」など、対象を実際にクリックできるようにする
        if (step.interactive) {
            const clickEl = step.clickSelector ? document.querySelector(step.clickSelector) : els[0];
            if (clickEl) liftElement(clickEl);
        }

        placeTip(r);
    }

    // 対象を黒幕より前面に出してクリック可能にし、押したら次へ進む
    function liftElement(el) {
        liftedEl = el;
        liftedStyle = { position: el.style.position, zIndex: el.style.zIndex };
        if (getComputedStyle(el).position === "static") el.style.position = "relative";
        el.style.zIndex = "10000";
        onLiftedClick = () => go(index + 1);
        el.addEventListener("click", onLiftedClick, { once: true });
    }

    function releaseLifted() {
        if (!liftedEl) return;
        if (onLiftedClick) liftedEl.removeEventListener("click", onLiftedClick);
        liftedEl.style.position = liftedStyle.position;
        liftedEl.style.zIndex = liftedStyle.zIndex;
        liftedEl = liftedStyle = onLiftedClick = null;
    }

    // 説明文カードを対象の下→上→中央の順で収まる位置に置く
    function placeTip(r) {
        const m = 14;
        const tw = tip.offsetWidth;
        const th = tip.offsetHeight;
        const vw = window.innerWidth;
        const vh = window.innerHeight;

        let top, left;
        if (r.bottom + m + th <= vh) {
            top = r.bottom + m;
        } else if (r.top - m - th >= 0) {
            top = r.top - m - th;
        } else {
            top = Math.max(m, (vh - th) / 2);
        }
        left = r.left + r.width / 2 - tw / 2;
        left = Math.min(Math.max(m, left), vw - tw - m);
        top = Math.min(Math.max(m, top), vh - th - m);

        tip.style.top = top + "px";
        tip.style.left = left + "px";
    }

    function placeTipCenter() {
        tip.style.top = Math.max(14, (window.innerHeight - tip.offsetHeight) / 2) + "px";
        tip.style.left = Math.max(14, (window.innerWidth - tip.offsetWidth) / 2) + "px";
    }

    function reposition() {
        if (blocker) render();
    }

    function endTour() {
        releaseLifted();
        window.removeEventListener("resize", reposition);
        window.removeEventListener("keydown", onKey);
        [blocker, spotlight, tip, nav].forEach((n) => n && n.remove());
        blocker = spotlight = tip = nav = null;
    }

    window.startTour = function () {
        if (blocker) return; // 二重起動を防ぐ
        const quizMode = document.body.classList.contains("quiz-mode");
        STEPS = quizMode ? buildQuizSteps() : buildEditorSteps();

        // エディターで空っぽだと押しても結果が出ないので、例を1つ用意しておく
        const ws = document.getElementById("workspace");
        if (!quizMode && ws && ws.children.length === 0 && typeof loadExample1 === "function") {
            loadExample1();
        }
        index = 0;
        buildUI();
        go(0);
    };
})();
