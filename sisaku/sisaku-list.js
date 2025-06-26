const sisaku = [
    { name: "大学入試センター 共通テスト試作問題『情報I』", url: "https://www.dnc.ac.jp/albums/abm.php?d=511&f=abm00003277.pdf&n=6-2-1_%E8%A9%A6%E4%BD%9C%E5%95%8F%E9%A1%8C%E3%80%8E%E6%83%85%E5%A0%B1%E2%85%A0%E3%80%8F%E2%80%BB%E4%BB%A4%E5%92%8C4%E5%B9%B412%E6%9C%8823%E6%97%A5%E4%B8%80%E9%83%A8%E4%BF%AE%E6%AD%A3.pdf" },
    { name: "文部科学省 情報サンプル問題", url: "https://www.mext.go.jp/content/20211014-mxt_daigakuc02-000018441_9.pdf" },
    { name: "北海道情報大学 情報I サンプル問題", url: "https://www.do-johodai.ac.jp/_cmswp/wp-content/uploads/R7sample_information.pdf" },
    { name: "東北学院大学一般選抜 サンプル問題『情報』", url: "https://www.tohoku-gakuin.ac.jp/admission/admissions/change/files/2025_joho.pdf?0711" },
    { name: "電気通信大学 試作問題 情報(令和5年 11月公開)", url: "https://nyushi.office.uec.ac.jp/information/pdf/kobetsu_sisakumondai.pdf" },
    { name: "電気通信大学 試作問題 情報(令和6年 7月公開)", url: "https://nyushi.office.uec.ac.jp/information/pdf/kobetsu_samplemondai.pdf" },
    { name: "立命館大学 独自入試試作問題", url: "https://ritsnet.ritsumei.jp/admission/general/asset/Informatics/2025joho_pre.pdf" },
    { name: "南山大学 「情報」サンプル問題", url: "https://www.nanzan-u.ac.jp/admission/news/2024/pdf/240719_mondai.pdf" },
]

////////////////////
// リストを作成する //
///////////////////

function renderSisakuList() {
    const questionList = document.querySelector(`#sisaku-list ul`); // 対応するulを取得
    let questionListHtml = '';

    // 各カテゴリをループ処理
    sisaku.forEach((question, index) => {
        // それぞれの問題をリスト化
        questionListHtml += createquestionListHtml(index + 1, question.name, question.url);
    });

    // innerHTMLに設定
    questionList.innerHTML = questionListHtml;
}


function createquestionListHtml(index, name, url) {
    return `
        <li>
            <span class="question-number">${index}</span>
            <span class="question-title">${name}</span>
            <a class="question-link-button" href="${url}" target="_blank">問題を解く</a>
        </li>
    `
}

//////////
// 描画 //
/////////
document.addEventListener('DOMContentLoaded', function () {
    renderSisakuList();
});