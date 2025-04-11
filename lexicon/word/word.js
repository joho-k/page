const bodyEle = document.getElementById("word-body");

let displayMode = 'slide'; // 'list' or 'slide'
let currentIndex = 0; // スライドモードで使用

// コンテナの作成
const contentDiv = document.createElement('div');
contentDiv.className = 'content';

// ヘッダーの作成
const header = document.createElement('header');
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

// メインコンテンツの作成
const main = document.createElement('main');

// タイトル部分
const wordTitle = document.createElement('h3');
wordTitle.id = 'word-title';

// 動画セクション
const videoTitle = document.createElement('h4');
videoTitle.textContent = '動画で解説';
const videoExplanation = document.createElement('div');
videoExplanation.id = 'video-explanation';
videoExplanation.className = 'content-item';

// 画像セクション
const imageTitle = document.createElement('h4');
imageTitle.textContent = '画像で解説';
const imageExplanation = document.createElement('div');
imageExplanation.id = 'image-explanation';
imageExplanation.className = 'content-item';

// タイトルだけ抽出してHTMLリストを作成
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
                updateSlideToIndex(index);
            }
        };

        li.appendChild(a);
        titleList.appendChild(li);
    }
});

// 表示切り替えボタン
const toggleBtn = document.createElement('button');
toggleBtn.textContent = '一覧表示に切り替える';
toggleBtn.className = 'toggle-button';
toggleBtn.onclick = () => {
    displayMode = displayMode === 'list' ? 'slide' : 'list';
    toggleBtn.textContent = displayMode === 'list' ? 'スライド表示に切り替える' : '一覧表示に切り替える';
    // 再描画
    imageExplanation.innerHTML = '';
    imageExplanation.appendChild(createImageExplanation(image));
};

// メイン要素に子要素を追加
main.appendChild(wordTitle);

main.appendChild(videoTitle);
main.appendChild(videoExplanation);

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
        aEle.href = `../${relatedWord.url}/index.html`;
        li.appendChild(aEle);
        list.appendChild(li);
    });
    relatedWordsList.appendChild(list);

    main.appendChild(relatedWordsTitle);
    main.appendChild(relatedWordsList);
}

main.appendChild(toc);
main.appendChild(titleList);
main.appendChild(imageTitle);
main.appendChild(toggleBtn);
main.appendChild(imageExplanation);

// コンテンツにヘッダーとメインを追加
contentDiv.appendChild(header);
contentDiv.appendChild(main);

// タイトル関係
wordTitle.innerHTML = `${title}`;
document.title = `${document.title}「${title}」`;

// YouTubeの埋め込み
if (youtubeURLID !== null) {
    videoExplanation.innerHTML = `<div class="youtube-wrapper">
    <iframe src="https://youtube.com/embed/${youtubeURLID}" frameborder="0" allowfullscreen="allowfullscreen"></iframe>
    </div>`;
}

// 画像の表示を追加
imageExplanation.appendChild(createImageExplanation(image));

// 本体にコンテンツを追加
bodyEle.appendChild(contentDiv);


// 表示切り替え可能な画像セクション生成関数
function createImageExplanation(images) {
    const imageEle = document.createElement("div");

    if (displayMode === 'list') {
        // 一覧表示（従来通り）
        images.forEach((img, index) => {
            const imgRow = createImageRow(img, index);
            imgRow.id = `slide-${index}`;
            imageEle.appendChild(imgRow);
        });
    } else {
        // スライド表示
        const imgRow = createImageRow(images[currentIndex], currentIndex);
        imgRow.id = 'slide-row';
        imageEle.appendChild(imgRow);

        // スライドナビゲーション
        const nav = document.createElement('div');
        nav.className = 'slide-nav';

        const prevBtn = document.createElement('button');
        prevBtn.textContent = '← 前へ';
        prevBtn.disabled = currentIndex === 0;

        const nextBtn = document.createElement('button');
        nextBtn.textContent = '次へ →';
        nextBtn.disabled = currentIndex === images.length - 1;

        prevBtn.onclick = () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateSlide();
            }
        };

        nextBtn.onclick = () => {
            if (currentIndex < images.length - 1) {
                currentIndex++;
                updateSlide();
            }
        };

        nav.appendChild(prevBtn);
        nav.appendChild(nextBtn);
        imageEle.appendChild(nav);
    }

    return imageEle;
}


// スライド表示更新関数
function updateSlide() {
    const newRow = createImageRow(image[currentIndex], currentIndex);
    const oldRow = document.getElementById('slide-row');
    newRow.id = 'slide-row';
    oldRow.parentNode.replaceChild(newRow, oldRow);

    const prevBtn = document.querySelector('.slide-nav button:first-child');
    const nextBtn = document.querySelector('.slide-nav button:last-child');
    if (prevBtn && nextBtn) {
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex === image.length - 1;
    }
}


// 任意のインデックスにスライドジャンプ
function updateSlideToIndex(index) {
    if (index < 0 || index >= image.length) return;
    currentIndex = index;
    imageExplanation.innerHTML = '';
    imageExplanation.appendChild(createImageExplanation(image));
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

    figure.innerHTML += `<img src = "img/${serialNum}.png" />`;

    img.descriptions.forEach((description) => {
        descriptionEle.innerHTML += `<p> ${description}</p>`;
    });

    imgRow.appendChild(figure);
    imgRow.appendChild(descriptionEle);

    return imgRow;
}
