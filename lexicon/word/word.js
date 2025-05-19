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
const h2 = document.createElement('h2');
const a = document.createElement('a');
a.href = '../../index.html';
a.className = "text-white";
a.textContent = '用語の辞典';
h2.appendChild(a);
header.appendChild(h2);

// 注意文の作成
const warning = document.createElement('div');
warning.className = "warning";
warning.innerHTML = `解説は厳密な正確さよりも、伝わりやすさを優先しています。<br />そのため、実際の定義とは多少異なる表現になっている場合があります。ご了承ください。`;
header.appendChild(warning);

// タイトル部分
const wordTitle = document.createElement('h3');
wordTitle.id = 'word-title';
wordTitle.innerHTML = `${title}`;
document.title = `${document.title}「${title}」`;

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
        a.href = "#";
        a.textContent = item.title;

        a.onclick = (e) => {
            e.preventDefault();
            if (displayMode === 'list') {
                const target = document.getElementById(`slide-${index}`);
                if (target) target.scrollIntoView({ behavior: 'smooth' });
            } else {
                currentIndex = index;
                const target = document.querySelector('.slide-nav');
                if (target) target.scrollIntoView({ behavior: 'smooth' });
            }
            updateDisplayMode();
        };

        li.appendChild(a);
        titleList.appendChild(li);
    }
});

// 画像セクション
const imageTitle = document.createElement('h4');
imageTitle.textContent = '画像で解説';

// ナビゲーションボタン
const nav = document.createElement('div');
nav.className = 'slide-nav';

const prevBtn = document.createElement('button');
prevBtn.textContent = '← 前へ';
const pageNum = document.createElement('p');
// pageNum.textContent は全画像数がわかってから生成する
const nextBtn = document.createElement('button');
nextBtn.textContent = '次へ →';
nav.appendChild(prevBtn);
nav.appendChild(pageNum);
nav.appendChild(nextBtn);

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

if (relatedWords.length !== 0) {
    // 関連単語セクション
    const relatedWordsTitle = document.createElement('h4');
    relatedWordsTitle.textContent = '関連単語';
    const relatedWordsList = document.createElement('div');
    relatedWordsList.id = 'related-words';
    relatedWordsList.className = 'content-item';

    const list = document.createElement('ul');

    relatedWords.forEach((relatedWord) => {
        const li = document.createElement('li');
        const aEle = document.createElement('a');
        aEle.innerHTML = relatedWord.word;
        aEle.href = `../ ${relatedWord.url} /index.html`;
        li.appendChild(aEle);
        list.appendChild(li);
    });
    relatedWordsList.appendChild(list);

    main.appendChild(relatedWordsTitle);
    main.appendChild(relatedWordsList);
}

// メイン要素に子要素を追加
main.insertBefore(wordTitle, main.lastElementChild);
main.insertBefore(videoTitle, main.lastElementChild);
main.insertBefore(videoExplanation, main.lastElementChild);
main.insertBefore(toc, main.lastElementChild);
main.insertBefore(titleList, main.lastElementChild);
main.insertBefore(imageTitle, main.lastElementChild);
main.insertBefore(toggleBtn, main.lastElementChild);
main.insertBefore(nav, main.lastElementChild);

const rows = document.querySelectorAll('.image-row');

// 初期段階でスライドモードにしておく
updateDisplayMode();

function updateDisplayMode() {
    if (displayMode === 'list') {
        rows.forEach(row => row.classList.add('show'));
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
        pageNum.textContent = `${currentIndex + 1}/${rows.length}`
        if (nav) nav.classList.add('show');
    }
}


// HTMLファイルでベタ打ちできるようにinnerHTMLを生成するための関数。
function createImageHTML(images) {
    const imageEle = document.createElement("div");
    // 一覧表示（従来通り）
    images.forEach((img, index) => {
        const imgRow = createImageRow(img, index);
        imgRow.id = `slide-${index}`;
        imageEle.appendChild(imgRow);
    });

    console.log(imageEle.innerHTML);
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
