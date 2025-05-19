// header.js - ヘッダー挿入 + ツールチップ処理 + state=noheaderリンク付与（loadイベント）

window.addEventListener('load', () => {
    const currentParams = new URLSearchParams(window.location.search);
    const hasNoHeader = currentParams.get('state') === 'noheader';

    // -----------------------
    // tooltip（タッチ対応含む）
    // -----------------------
    const tooltipLinks = document.querySelectorAll('a[data-tooltip]');
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    tooltipLinks.forEach(link => {
        const raw = link.getAttribute('data-tooltip');
        const formatted = raw.replace(/\\n/g, '\n');
        link.setAttribute('data-tooltip', formatted);

        if (isTouchDevice) {
            link.addEventListener('touchstart', e => {
                if (!link.classList.contains('tooltip-active')) {
                    e.preventDefault();
                    tooltipLinks.forEach(l => l.classList.remove('tooltip-active'));
                    link.classList.add('tooltip-active');
                } else {
                    link.classList.remove('tooltip-active');
                    window.location = link.href;
                }
            });
        }
    });

    document.addEventListener('touchstart', e => {
        if (![...tooltipLinks].some(link => link.contains(e.target))) {
            tooltipLinks.forEach(link => link.classList.remove('tooltip-active'));
        }
    });

    // -----------------------
    // noheader: リンクにstate=noheader付与（_blank以外）
    // -----------------------
    if (hasNoHeader) {
        document.querySelectorAll('a[href]').forEach(link => {
            const isNewTab = link.getAttribute('target') === '_blank';

            if (!isNewTab) {
                try {
                    const url = new URL(link.href, window.location.origin);
                    if (url.searchParams.get('state') !== 'noheader') {
                        url.searchParams.set('state', 'noheader');
                        link.href = url.toString();
                    }
                } catch (e) {
                    // 無効なリンクは無視
                }
            }
        });

        // ヘッダーは表示しない
        return;
    }

    // -----------------------
    // header（通常時のみ）
    // -----------------------

    function getPathPrefix() {
        const path = window.location.pathname;
        const lastSlashIndex = path.lastIndexOf('/');
        if (lastSlashIndex <= 0) return './';
        const pathWithoutFile = path.substring(0, lastSlashIndex + 1);
        const slashCount = (pathWithoutFile.match(/\//g) || []).length;
        return '../'.repeat(slashCount - 1);
    }

    const pathPrefix = getPathPrefix();

    const header = document.createElement('div');
    header.className = 'header';
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
    document.body.insertBefore(header, document.body.firstChild);

    const hamburger = header.querySelector('.hamburger-menu');
    const nav = header.querySelector('.menu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        nav.classList.toggle('active');
    });

    nav.addEventListener('click', e => {
        e.stopPropagation();
    });

    document.addEventListener('click', event => {
        const isClickInside = hamburger.contains(event.target) || nav.contains(event.target);
        if (!isClickInside && nav.classList.contains('active')) {
            hamburger.classList.remove('active');
            nav.classList.remove('active');
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && nav.classList.contains('active')) {
            hamburger.classList.remove('active');
            nav.classList.remove('active');
        }
    });
});
