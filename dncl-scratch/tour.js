// 使い方ツアー：説明する要素だけを明るく残し、まわりを黒い半透明で覆って案内する
(function () {
    // 案内する手順。selector(単数) か selectors(複数→囲む範囲) で対象を指定する
    const STEPS = [
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
            selectors: ["#vars", "#output"],
            title: "変数と出力",
            text: "実行すると、変数の中身が「変数」に、表示ブロックの結果が「出力」に出ます。プログラムがどう動いたかをここで確かめます。"
        },
        {
            selector: 'button[onclick="stepStart()"]',
            title: "ステップ実行",
            text: "「ステップ開始」を押してみましょう。プログラムを1行ずつ動かす準備ができます。ボタンを押すか「次へ」で進めます。",
            interactive: true
        },
        {
            selectors: ["#step-prev-button", "#step-next-button", "#step-explanation"],
            title: "1行ずつ理解を広げよう",
            text: "「次へ」「前へ」で1行ずつ動かし、ここに出る説明を読みながら、プログラムの動きの理解を広げていきましょう。",
            // ステップ開始を押さずに来た場合でも、ボタンと説明欄を出しておく
            onEnter: () => {
                const nb = document.getElementById("step-next-button");
                if (nb && nb.hidden && typeof stepStart === "function") stepStart();
            }
        }
    ];

    const PAD = 8; // スポットライトの余白
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
        tip.innerHTML = '<p class="tour-tip-title"></p><p class="tour-tip-text"></p>';

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
        if (STEPS[i].onEnter) STEPS[i].onEnter(); // 必要なら対象を表示してから測る
        const els = getTargets(STEPS[i]);
        if (!els.length) { go(i + 1); return; } // 対象が無ければ飛ばす
        els[0].scrollIntoView({ block: "center", behavior: "auto" });
        requestAnimationFrame(render);
    }

    function render() {
        const step = STEPS[index];
        const els = getTargets(step);
        if (!els.length) return;
        const r = unionRect(els);

        // スポットライト
        spotlight.style.top = (r.top - PAD) + "px";
        spotlight.style.left = (r.left - PAD) + "px";
        spotlight.style.width = (r.width + PAD * 2) + "px";
        spotlight.style.height = (r.height + PAD * 2) + "px";

        // 説明文
        tip.querySelector(".tour-tip-title").textContent = step.title;
        tip.querySelector(".tour-tip-text").textContent = step.text;

        // 操作パネル
        navCount.textContent = (index + 1) + " / " + STEPS.length;
        prevBtn.disabled = index === 0;
        nextBtn.textContent = index === STEPS.length - 1 ? "完了" : "次へ";

        // 「押してみましょう」など、対象を実際にクリックできるようにする
        if (step.interactive) liftElement(els[0]);

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
        // 空っぽだと押しても結果が出ないので、例を1つ用意しておく
        const ws = document.getElementById("workspace");
        if (ws && ws.children.length === 0 && typeof loadExample1 === "function") {
            loadExample1();
        }
        index = 0;
        buildUI();
        go(0);
    };
})();
