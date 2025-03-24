// header.js - すべてのページにヘッダーを挿入するスクリプト

document.addEventListener('DOMContentLoaded', function () {
    // 現在のパスから階層レベルを判定する関数
    function getPathPrefix() {
        // 現在のURLパスを取得
        const path = window.location.pathname;

        // ルートからの階層の深さを判定（フォルダの数をカウント）
        // 末尾のファイル名を除外するため、最後の '/' の位置を確認
        const lastSlashIndex = path.lastIndexOf('/');
        if (lastSlashIndex <= 0) {
            // ルート直下またはホームページの場合
            return './';
        }

        // サブディレクトリ内の場合
        const pathWithoutFile = path.substring(0, lastSlashIndex + 1);
        const slashCount = (pathWithoutFile.match(/\//g) || []).length;

        // スラッシュの数に基づいて、相対パスのプレフィックスを返す
        // 例: '/dir1/dir2/file.html' → '../' (2階層)
        return '../'.repeat(slashCount - 1);
    }

    // 相対パスのプレフィックスを取得
    const pathPrefix = getPathPrefix();

    // ヘッダー要素を作成
    const header = document.createElement('div');
    header.className = 'header';

    // ヘッダーの内容
    header.innerHTML = `
        <div class="title">
            <a href="${pathPrefix}index.html">
                <img class="logo" src="${pathPrefix}img/logo_transparent.png" >
            </a>
        </div>
        <div class="hamburger-menu">
            <span></span>
            <span></span>
            <span></span>
        </div>
        <nav class="menu">
            <a href="${pathPrefix}dncl/index.html">実プロ</a>
            <a href="${pathPrefix}lexicon/index.html">用語の辞典</a>
            <a href="${pathPrefix}sisaku/index.html">試作問題リンク</a>
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSd7RzukGDWpTAVr45UYY1EzBKxxvTeRuqfI_XLaBbb0MI4T0A/viewform?usp=dialog"
            target="_blank" style="background-color: #c01565">
            お問い合わせ</a>
        </nav>
    `;

    // body要素の最初の子要素として挿入
    document.body.insertBefore(header, document.body.firstChild);

    // ハンバーガーメニューのクリックイベント
    const hamburger = header.querySelector('.hamburger-menu');
    const nav = header.querySelector('.menu');

    hamburger.addEventListener('click', function () {
        // メニューの開閉
        hamburger.classList.toggle('active');
        nav.classList.toggle('active');
    });

    // メニュー内クリックの伝播を停止
    nav.addEventListener('click', function (e) {
        e.stopPropagation();
    });

    // 画面外クリックでメニューを閉じる
    document.addEventListener('click', function (event) {
        const isClickInside = hamburger.contains(event.target) || nav.contains(event.target);

        if (!isClickInside && nav.classList.contains('active')) {
            hamburger.classList.remove('active');
            nav.classList.remove('active');
        }
    });

    // リサイズ対応（PCサイズになった時にメニューをリセット）
    window.addEventListener('resize', function () {
        if (window.innerWidth > 768 && nav.classList.contains('active')) {
            hamburger.classList.remove('active');
            nav.classList.remove('active');
        }
    });
});