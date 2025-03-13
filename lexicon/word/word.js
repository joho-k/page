const bodyEle = document.getElementById("word-body");

// コンテナの作成
const contentDiv = document.createElement('div');
contentDiv.className = 'content';

// ヘッダーの作成
const header = document.createElement('header');
const h2 = document.createElement('h2');
h2.textContent = '用語の辞典';
header.appendChild(h2);

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

// メイン要素に子要素を追加
main.appendChild(wordTitle);

main.appendChild(videoTitle);
main.appendChild(videoExplanation);

if (relatedWords.length != 0) {
    // 関連単語セクション
    const relatedWordsTitle = document.createElement('h4');
    relatedWordsTitle.textContent = '関連単語';
    const relatedWordsList = document.createElement('div');
    relatedWordsList.id = 'related-words';
    relatedWordsList.className = 'content-item';

    const list = document.createElement('ul');

    relatedWords.forEach((relatedWord) => {
        // 単語リストをリンク付きで生成
        const li = document.createElement('li');

        const aEle = document.createElement('a');
        aEle.innerHTML = relatedWord.word;
        aEle.href = `../${relatedWord.url}/index.html`;

        li.appendChild(aEle);

        list.appendChild(li);
    })
    relatedWordsList.appendChild(list);

    main.appendChild(relatedWordsTitle);
    main.appendChild(relatedWordsList);
}

main.appendChild(imageTitle);
main.appendChild(imageExplanation);

// コンテンツにヘッダーとメインを追加
contentDiv.appendChild(header);
contentDiv.appendChild(main);

// タイトル関係
wordTitle.innerHTML = `${title}`
document.title = `${document.title}「${title}」`

if (youtubeURL !== null) {
    videoExplanation.innerHTML = `<div class="youtube-wrapper">
    <iframe src="${youtubeURL}" frameborder="0" allowfullscreen="allowfullscreen"></iframe>
    </div>`
}

imageExplanation.appendChild(createImageExplanation(image))

bodyEle.appendChild(contentDiv)

function createImageExplanation(images) {
    const imageEle = document.createElement("div");
    images.forEach((img, index) => {
        // 画像と説明を包括するdiv
        const imgRow = document.createElement("div");
        imgRow.className = "image-row"

        // スライドの画像を表示する要素
        const figure = document.createElement("figure");

        // スライドの説明
        const descriptionEle = document.createElement("div");
        descriptionEle.className = "image-row-description";

        // 画像の連番
        const serialNum = (index + 1).toString().padStart(2, '0');
        if (img.title) {
            figure.innerHTML = `<h5>${img.title}</h5>`
            descriptionEle.className += " image-row-description-padding-top"
        }
        figure.innerHTML += `<img src = "img/${serialNum}.png" />`

        img.descriptions.forEach((description) => {
            descriptionEle.innerHTML += `<p> ${description}</p>`;
        })

        imgRow.appendChild(figure);
        imgRow.appendChild(descriptionEle);

        imageEle.appendChild(imgRow);
    });
    return imageEle;
}