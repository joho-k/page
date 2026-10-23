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
a.textContent = '‹ 用語の辞典一覧';

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
        const a = document.createElement('a');
        a.href = `#slide-${index}`;
        a.textContent = item.title;

        a.onclick = (e) => {
            e.preventDefault();
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

// 表示切り替えボタン
const toggleBtn = document.createElement('button');
toggleBtn.textContent = '一覧表示に切り替える';
toggleBtn.className = 'toggle-button';
toggleBtn.onclick = () => {
    displayMode = displayMode === 'list' ? 'slide' : 'list';
    toggleBtn.textContent = displayMode === 'list' ? 'スライド表示に切り替える' : '一覧表示に切り替える';
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
side.appendChild(toggleBtn);
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
}
// 一覧表示では、画面のいちばん上に見えているスライドの節を出す
window.addEventListener('scroll', () => {
    if (displayMode !== 'list') return;
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
    if (displayMode !== 'slide' || e.target.closest('input, textarea, select')) return;
    if (e.key === 'ArrowLeft') prevBtn.click();
    if (e.key === 'ArrowRight') nextBtn.click();
});

// 初期段階でスライドモードにしておく
updateDisplayMode();

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
        if (frame) frame.append(prevBtn, nextBtn, pageNum, fsBtn);
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
