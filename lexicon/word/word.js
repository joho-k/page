const bodyEle = document.getElementById("word-body");

let displayMode = 'slide'; // 'list' or 'slide'
let currentIndex = 0; // スライドモードで使用

// コンテナの作成
const contentDiv = bodyEle.querySelectorAll(".content")[0];
// ヘッダーの作成
const header = contentDiv.querySelectorAll("header")[0];
// メインコンテンツの作成
const main = contentDiv.querySelectorAll("main")[0];
// 画像セクション
const imageExplanation = contentDiv.querySelectorAll("#image-explanation")[0];

// コンテナ
const a = document.createElement('a');

// noheaderのときの処理
const params = new URLSearchParams(window.location.search);
const noHeader = params.get('state') === 'noheader';

a.href = '../../index.html';
a.className = 'back-to-list';
// スマホでは幅が足りないので「‹ 一覧」だけにする（word.css の .back-long）
a.innerHTML = '‹&nbsp;<span class="back-long">用語の辞典</span>一覧';
a.setAttribute('aria-label', '用語の辞典一覧');

// タイトルの帯：左に「用語の辞典一覧に戻る」、まん中に用語名。帯ごと画面の上に貼りつける
const pageTitle = main.querySelector('.page-title');
if (pageTitle) {
    const titleBar = document.createElement('div');
    titleBar.className = 'title-bar';
    pageTitle.before(titleBar);
    titleBar.append(a, pageTitle);
}


// タイトル部分は静的HTMLの <h1 class="page-title"> を使用（クローラにも見える／重複回避）。
// document.title も静的 <title> をそのまま使う（用語名の二重付与を避ける）。

// 動画セクション
const videoTitle = document.createElement('h4');
videoTitle.textContent = '動画で解説';
const videoExplanation = document.createElement('div');
videoExplanation.id = 'video-explanation';
videoExplanation.className = 'content-item';
// YouTubeの埋め込み
if (youtubeURLID !== null) {
    videoExplanation.innerHTML = `<div class="youtube-wrapper">
    <iframe src="https://youtube.com/embed/${youtubeURLID}" frameborder="0" allowfullscreen="allowfullscreen"></iframe>
    </div>`;
} else {
    videoExplanation.innerHTML = `<a>なし</a>`;
}

// 画像差し替え確かめ用。必ずコメントアウトすること。
// createImageHTML(image);

// 関連単語セクション
const relatedWordsTitle = document.createElement('h4');
relatedWordsTitle.textContent = '関連単語';
const relatedWordsList = document.createElement('div');
relatedWordsList.id = 'related-words';
relatedWordsList.className = 'content-item';

if (relatedWords.length !== 0) {
    const list = document.createElement('ul');

    relatedWords.forEach((relatedWord) => {
        const li = document.createElement('li');
        const aEle = document.createElement('a');
        aEle.innerHTML = relatedWord.word;
        aEle.href = `../${relatedWord.url}/index.html`;
        li.appendChild(aEle);
        list.appendChild(li);
    });
    relatedWordsList.appendChild(list);
} else {
    const textContent = document.createElement('a');
    textContent.textContent = "なし";
    relatedWordsList.appendChild(textContent);
}

// 目次
const toc = document.createElement('h4');
toc.textContent = '目次'
const titleList = document.createElement('ul');
titleList.className = 'title-list';
image.forEach((item, index) => {
    if (item.title) {
        const li = document.createElement('li');
        li.dataset.index = index;
        const a = document.createElement('a');
        a.href = `#slide-${index}`;
        a.textContent = item.title;

        a.onclick = (e) => {
            e.preventDefault();
            showView('slide');
            currentIndex = index;
            updateDisplayMode();
            const target =
                displayMode === 'list'
                    ? document.getElementById(`slide-${index}`)
                    : document.querySelector('.word-stage');
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        };

        li.appendChild(a);
        titleList.appendChild(li);
    }
});


// ナビゲーションボタン
const nav = document.createElement('div');
nav.className = 'slide-nav';

const prevBtn = document.createElement('button');
prevBtn.textContent = '← 前へ';
const pageNum = document.createElement('p');
// pageNum.textContent は全画像数がわかってから生成する
const nextBtn = document.createElement('button');
nextBtn.textContent = '次へ →';
nav.appendChild(pageNum);

prevBtn.onclick = () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateDisplayMode();
    }
};

nextBtn.onclick = () => {
    if (currentIndex < image.length - 1) {
        currentIndex++;
        updateDisplayMode();
    }
};

// 表示切り替えボタン。スライド表示ではスライドの右上（全画面ボタンの隣）、一覧表示では一覧の上に置く
const toggleBtn = document.createElement('button');
toggleBtn.className = 'toggle-button';
function setToggleLabel() {
    toggleBtn.innerHTML = displayMode === 'list'
        ? '<i class="fa-solid fa-person-chalkboard"></i> スライド表示に切り替える'
        : '<i class="fa-solid fa-list"></i> 一覧表示';
    toggleBtn.setAttribute('aria-label', displayMode === 'list' ? 'スライド表示に切り替える' : '一覧表示に切り替える');
}
setToggleLabel();
toggleBtn.onclick = () => {
    displayMode = displayMode === 'list' ? 'slide' : 'list';
    setToggleLabel();
    updateDisplayMode();
};

// 画面配置：左にスライド、右に「動画・目次・表示切り替え・関連単語」の列
// 右の列は position: sticky で、一覧表示でスクロールしても画面に残る
const layout = document.createElement('div');
layout.className = 'word-layout';
const stage = document.createElement('div');
stage.className = 'word-stage';
const side = document.createElement('aside');
side.className = 'word-side';
main.insertBefore(layout, imageExplanation);
stage.appendChild(imageExplanation);
layout.appendChild(stage);
layout.appendChild(side);

// 動画が無い用語では「動画で解説」ごと出さない
if (youtubeURLID !== null) {
    side.appendChild(videoTitle);
    side.appendChild(videoExplanation);
}
// 用語の定義（静的HTMLの .term-lead）は、動画の下に「ひとことで解説」として出す
const termLead = main.querySelector('.term-lead');
if (termLead) {
    const leadTitle = document.createElement('h4');
    leadTitle.textContent = 'ひとことで解説';
    side.appendChild(leadTitle);
    side.appendChild(termLead);
}
side.appendChild(toc);
side.appendChild(titleList);
// 関連単語が無い用語では見出しごと出さない
if (relatedWords.length !== 0) {
    side.appendChild(relatedWordsTitle);
    side.appendChild(relatedWordsList);
}
videoExplanation.classList.remove('content-item');
relatedWordsList.classList.remove('content-item');
imageExplanation.classList.remove('content-item');
// 目次が無い（見出しの無い）用語では目次ごと出さない
if (!titleList.children.length) {
    toc.remove();
    titleList.remove();
}

// 実践（音を聞きくらべる・画像を作る など、スライドとは別のもの）は、スライドとは別の画面にする。
// 静的HTMLでは main にそのまま書いてあるので、ここで箱に移し、スライドの上のタブで切りかえる
// 実践が別のページ（practice/index.html）にある用語は、HTML にタブ（リンク）が書いてあるので、スライドの上に移すだけ
const linkTabs = main.querySelector(':scope > .view-tabs');
if (linkTabs) stage.prepend(linkTabs);
const practiceItems = [...main.children].filter(el => !el.matches('.title-bar, .word-layout, .view-tabs, script'));
let practice = null;
const hasSlides = !!imageExplanation.querySelector('.image-row');
const viewTabs = document.createElement('div');
viewTabs.className = 'view-tabs';
viewTabs.setAttribute('role', 'tablist');
const slideTab = document.createElement('button');
const practiceTab = document.createElement('button');
if (practiceItems.length) {
    practice = document.createElement('div');
    practice.className = 'word-practice';
    practice.append(...practiceItems);
    stage.appendChild(practice);
    const practiceHead = practice.querySelector('h3');
    slideTab.innerHTML = '<i class="fa-solid fa-person-chalkboard"></i> スライドで学ぶ';
    practiceTab.innerHTML = `<i class="fa-solid fa-hand-pointer"></i> 実践：${practiceHead ? practiceHead.textContent.trim() : '試してみよう'}`;
    [slideTab, practiceTab].forEach(tab => { tab.className = 'view-tab'; tab.setAttribute('role', 'tab'); });
    slideTab.onclick = () => showView('slide');
    practiceTab.onclick = () => showView('practice');
    viewTabs.append(slideTab, practiceTab);
    // スライドが1枚も無い用語（二分探索など）は実践だけなので、タブを出さない
    if (hasSlides) stage.prepend(viewTabs);
}
function isPracticeView() {
    return stage.classList.contains('is-practice');
}
function showView(view) {
    if (!practice) return;
    const onPractice = view === 'practice';
    stage.classList.toggle('is-practice', onPractice);
    slideTab.classList.toggle('active', !onPractice);
    practiceTab.classList.toggle('active', onPractice);
    slideTab.setAttribute('aria-selected', String(!onPractice));
    practiceTab.setAttribute('aria-selected', String(onPractice));
    // 一覧表示の切り替えはスライドの画面でだけ使う
    toggleBtn.hidden = onPractice;
    if (onPractice && fsOn) setFullscreen(false);
    // 実践の画面は URL の #practice で直接開ける
    if (!hasSlides) return;
    if (onPractice) history.replaceState(null, '', '#practice');
    else if (location.hash === '#practice') history.replaceState(null, '', location.pathname + location.search);
}
// スライドの説明文にある「実際に聞いてみよう」などのリンク（#sampling-test など）は、実践の画面を開いてそこへ飛ぶ
document.addEventListener('click', e => {
    const link = e.target.closest('a[href^="#"]');
    if (!link || !practice) return;
    const target = document.getElementById(decodeURIComponent(link.getAttribute('href').slice(1)));
    if (!target || !practice.contains(target)) return;
    e.preventDefault();
    showView('practice');
    target.scrollIntoView({ behavior: 'smooth', block: 'center' });
});

const rows = document.querySelectorAll('.image-row');

// 節の見出し（例：ランレングス法）。見出しは節の最初のスライドにしか無いので、
// 各スライドがどの節に属するかを前から引き継いで求め、スライドの上の帯に常に出す
const sectionOf = [];
image.forEach((item, i) => { sectionOf[i] = item.title || (i > 0 ? sectionOf[i - 1] : '') || ''; });
const sectionBar = document.createElement('div');
sectionBar.className = 'section-bar';
stage.insertBefore(sectionBar, imageExplanation);
function showSection(i) {
    sectionBar.textContent = sectionOf[i] || title;
    // 目次では、いま見ている節に印を付ける
    let current = null;
    titleList.querySelectorAll('li').forEach(li => { if (+li.dataset.index <= i) current = li; });
    titleList.querySelectorAll('li').forEach(li => li.classList.toggle('current', li === current));
    // 目次が長くて枠の中でスクロールしているときは、印の付いた節が見える位置まで送る
    if (current) {
        const top = current.offsetTop - titleList.offsetTop;
        if (top < titleList.scrollTop || top + current.offsetHeight > titleList.scrollTop + titleList.clientHeight) {
            titleList.scrollTop = top - 8;
        }
    }
}
// 一覧表示では、画面のいちばん上に見えているスライドの節を出す
window.addEventListener('scroll', () => {
    if (displayMode !== 'list' || isPracticeView()) return;
    const top = sectionBar.getBoundingClientRect().bottom;
    let idx = 0;
    rows.forEach((row, i) => { if (row.getBoundingClientRect().top <= top + 8) idx = i; });
    showSection(idx);
}, { passive: true });

// スライドの絵（HTML スライドか画像）を枠で包み、その上に「＜ ＞」を重ねる
rows.forEach(row => {
    const visual = row.querySelector('.hslide, figure > img');
    if (!visual) return;
    const frame = document.createElement('div');
    frame.className = 'slide-frame';
    visual.replaceWith(frame);
    frame.appendChild(visual);
});
pageNum.className = 'slide-count';
nav.remove();
prevBtn.className = 'slide-arrow prev';
nextBtn.className = 'slide-arrow next';
prevBtn.textContent = '‹';
nextBtn.textContent = '›';
prevBtn.setAttribute('aria-label', '前のスライド');
nextBtn.setAttribute('aria-label', '次のスライド');

// 全画面表示（スマホ向け）。いま見ているスライドだけを画面いっぱいに出す。
// iPhone の Safari は要素の全画面表示（requestFullscreen）に対応していないので、
// どの端末でも CSS で画面いっぱいに広げ、使える端末ではブラウザの全画面表示も重ねる。
// 縦持ちのときはスライドを90度回して、横向きの画面いっぱいに出す。
const fsBtn = document.createElement('button');
fsBtn.className = 'slide-fs';
fsBtn.setAttribute('aria-label', '全画面で見る');
fsBtn.innerHTML = '<i class="fa-solid fa-expand"></i>';
let fsOn = false;
function setFullscreen(on) {
    fsOn = on;
    document.body.classList.toggle('slide-fullscreen', on);
    fsBtn.innerHTML = on ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-expand"></i>';
    fsBtn.setAttribute('aria-label', on ? '全画面を閉じる' : '全画面で見る');
    const el = document.documentElement;
    if (on && el.requestFullscreen && !document.fullscreenElement) {
        el.requestFullscreen().then(() => {
            if (screen.orientation && screen.orientation.lock) screen.orientation.lock('landscape').catch(() => {});
        }).catch(() => {});
    }
    if (!on && document.fullscreenElement) document.exitFullscreen().catch(() => {});
}
fsBtn.onclick = () => setFullscreen(!fsOn);
document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement && fsOn) setFullscreen(false);
});
document.addEventListener('keydown', e => { if (e.key === 'Escape' && fsOn) setFullscreen(false); });

// 全画面のときは左右のスワイプでもめくれる（縦持ちで回しているときは上下のスワイプ）
let touchStart = null;
stage.addEventListener('touchstart', e => {
    if (!fsOn) return;
    touchStart = { x: e.touches[0].clientX, y: e.touches[0].clientY };
}, { passive: true });
stage.addEventListener('touchend', e => {
    if (!fsOn || !touchStart) return;
    const t = e.changedTouches[0];
    const rotated = window.innerHeight > window.innerWidth;
    const d = rotated ? t.clientY - touchStart.y : t.clientX - touchStart.x;
    const other = rotated ? t.clientX - touchStart.x : t.clientY - touchStart.y;
    touchStart = null;
    if (Math.abs(d) < 40 || Math.abs(d) < Math.abs(other)) return;
    // 回しているときは画面の上→下が、スライドの右→左にあたる
    if (rotated ? d > 0 : d < 0) nextBtn.click(); else prevBtn.click();
}, { passive: true });

// キーボードの ← → でもめくれる
document.addEventListener('keydown', e => {
    if (displayMode !== 'slide' || isPracticeView() || e.target.closest('input, textarea, select')) return;
    if (e.key === 'ArrowLeft') prevBtn.click();
    if (e.key === 'ArrowRight') nextBtn.click();
});

// 初期段階でスライドモードにしておく
updateDisplayMode();
// #practice（または実践の中の見出し）付きの URL なら実践の画面から開く
if (practice) {
    const hashTarget = location.hash.length > 1 && document.getElementById(decodeURIComponent(location.hash.slice(1)));
    const openPractice = location.hash === '#practice' || (hashTarget && practice.contains(hashTarget));
    showView(openPractice || !hasSlides ? 'practice' : 'slide');
    if (hashTarget && openPractice) hashTarget.scrollIntoView();
}

// 原稿のテキストデータ化
// console.log(image
//     .map(item => (item.descriptions || []).join('')) // 1つの descriptions を改行でつなぐ
//     .join('\n') // 各 descriptions ブロックの間に空行を入れる
// )
function updateDisplayMode() {
    stage.classList.toggle('is-list', displayMode === 'list');
    if (displayMode === 'list' && fsOn) setFullscreen(false);
    if (displayMode === 'list') {
        rows.forEach(row => row.classList.add('show'));
        prevBtn.remove();
        nextBtn.remove();
        pageNum.remove();
        fsBtn.remove();
        toggleBtn.classList.remove('on-slide');
        stage.insertBefore(toggleBtn, imageExplanation);
        if (nav) nav.classList.remove('show');
        // 一覧表示をしながら、今まで見ていたスライドまでスクロールする
        const target = document.getElementById(`slide-${currentIndex}`);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    } else {
        rows.forEach((row, i) => {
            if (i === currentIndex) {
                row.classList.add('show');
            } else {
                row.classList.remove('show');
            }
        });
        // 「＜ ＞」はいま見ているスライドの上に置く
        const frame = rows[currentIndex] && rows[currentIndex].querySelector('.slide-frame');
        // ページ番号もスライドの上（右下）に出す。スライドの下に置くと、説明文が長いときに画面の外へ押し出される
        toggleBtn.classList.add('on-slide');
        if (frame) frame.append(prevBtn, nextBtn, pageNum, toggleBtn, fsBtn);
        pageNum.textContent = `${currentIndex + 1} / ${rows.length}`
        showSection(currentIndex);

        // 前へ・次へボタンの活性非活性の制御
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex === image.length - 1;
    }
}


// HTMLファイルでベタ打ちできるようにinnerHTMLを生成するための関数。
/* HTMLに以下の内容を追加。
<body id="word-body">
    <div class="content">
        <header>
        </header>
        <main>
            <div id="image-explanation" class="content-item">
                <!-- ここからベタ打ち。word.jsの createImageHTML を使う。 -->
                <!-- ここまでベタ打ち -->
            </div>
        </main>
    </div>
</body> 
*/
function createImageHTML(images) {
    const imageEle = document.createElement("div");
    // 一覧表示（従来通り）
    images.forEach((img, index) => {
        const imgRow = createImageRow(img, index);
        imgRow.id = `slide-${index}`;
        imageEle.appendChild(imgRow);
    });

    console.log(imageEle.innerHTML);

    // 画像差し替え確かめ用。必ずコメントアウトすること。
    // const imageExplanationEle = document.getElementById("image-explanation");
    // imageExplanationEle.appendChild(imageEle);
}

// 画像1枚分の表示を作る共通関数
function createImageRow(img, index) {
    const imgRow = document.createElement("div");
    imgRow.className = "image-row";

    const figure = document.createElement("figure");
    const descriptionEle = document.createElement("div");
    descriptionEle.className = "image-row-description";

    const serialNum = (index + 1).toString().padStart(2, '0');

    if (img.title) {
        figure.innerHTML = `<h5>${img.title}</h5>`;
        descriptionEle.className += " image-row-description-padding-top";
    }
    const desc = img.descriptions ? img.descriptions.join() : "";
    figure.innerHTML += `<img src = "img/${serialNum}.png" alt="${desc}" />`;

    img.descriptions.forEach((description) => {
        descriptionEle.innerHTML += `<p> ${description}</p>`;
    });

    imgRow.appendChild(figure);
    imgRow.appendChild(descriptionEle);

    return imgRow;
}
// 上に戻るボタン作成
const scrollTopBtn = document.createElement('button');
scrollTopBtn.textContent = '上に戻る';
scrollTopBtn.className = 'scroll-top-btn';
scrollTopBtn.style.display = 'none'; // 初期は非表示

scrollTopBtn.onclick = () => {
    bodyEle.scrollIntoView({ behavior: 'smooth' });
};

document.body.appendChild(scrollTopBtn);

// スクロールで表示制御
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopBtn.style.display = 'block';
    } else {
        scrollTopBtn.style.display = 'none';
    }
});
