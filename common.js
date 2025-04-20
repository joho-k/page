document.addEventListener('DOMContentLoaded', () => {
    const tooltipLinks = document.querySelectorAll('a[data-tooltip]');
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    tooltipLinks.forEach(link => {
        // 改行タグを入れる
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

    // 外をタップしたら閉じる
    document.addEventListener('touchstart', e => {
        if (![...tooltipLinks].some(link => link.contains(e.target))) {
            tooltipLinks.forEach(link => link.classList.remove('tooltip-active'));
        }
    });
});
