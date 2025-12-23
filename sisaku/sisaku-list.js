const sisaku = [
    {
        name: "大学入試センター 共通テスト試作問題『情報I』",
        url: {
            question: "https://www.dnc.ac.jp/albums/abm.php?d=744&f=abm00003277.pdf&n=6-2-1_%E8%A9%A6%E4%BD%9C%E5%95%8F%E9%A1%8C%E3%80%8E%E6%83%85%E5%A0%B1%E2%85%A0%E3%80%8F%E2%80%BB%E4%BB%A4%E5%92%8C4%E5%B9%B412%E6%9C%8823%E6%97%A5%E4%B8%80%E9%83%A8%E4%BF%AE%E6%AD%A3.pdf",
            answer: "https://www.dnc.ac.jp/albums/abm.php?d=744&f=abm00003169.pdf&n=6-3-1_%E6%AD%A3%E8%A7%A3%E8%A1%A8%E3%80%8E%E6%83%85%E5%A0%B1%E2%85%A0%E3%80%8F.pdf",
            source: "https://www.dnc.ac.jp/kyotsu/kako_shiken_jouhou/r7/r7_kentoujoukyou/r7mondai.html",
        }
    },
    {
        name: "文部科学省 情報サンプル問題", url: {
            question: "https://www.mext.go.jp/content/20211014-mxt_daigakuc02-000018441_9.pdf"
        },
    },
    {
        name: "北海道情報大学 情報I サンプル問題", url: {
            question: "https://www.do-johodai.ac.jp/_cmswp/wp-content/uploads/R7sample_information.pdf",
            answer: "https://www.do-johodai.ac.jp/_cmswp/wp-content/uploads/R7sample_information_answer.pdf",
            source: "https://www.do-johodai.ac.jp/examinee/examinfo/r7_information_sample/",
        }
    },
    {
        name: "東北学院大学一般選抜 サンプル問題『情報』", url: {
            question: "https://www.tohoku-gakuin.ac.jp/admission/admissions/change/files/2025_joho.pdf?0711",
            source: "https://www.tohoku-gakuin.ac.jp/info/top/24019-1.html",
        }
    },
    {
        name: "電気通信大学 試作問題 情報(令和5年 11月公開)", url: {
            question: "https://nyushi.office.uec.ac.jp/information/pdf/kobetsu_sisakumondai.pdf",
            answer: "https://nyushi.office.uec.ac.jp/information/pdf/kobetsu_kaitou.pdf",
            source: "https://www.uec.ac.jp/news/admission/2024/20240722_6390.html",
        },
    },
    {
        name: "電気通信大学 試作問題 情報(令和6年 7月公開)", url: {
            question: "https://nyushi.office.uec.ac.jp/information/pdf/kobetsu_samplemondai.pdf",
            answer: "https://nyushi.office.uec.ac.jp/information/pdf/kobetsu_samplekaitou.pdf",
            source: "https://www.uec.ac.jp/news/admission/2024/20240722_6390.html",
        },
    },
    {
        name: "立命館大学 独自入試試作問題", url: {
            question: "https://ritsnet.ritsumei.jp/admission/general/asset/Informatics/2025joho_pre.pdf",
            source: "https://ritsnet.ritsumei.jp/admission/general/Informatics.html",
        },
    },
    {
        name: "南山大学 「情報」サンプル問題(2024年7月分)", url: {
            question: "https://www.nanzan-u.ac.jp/admission/news/2024/pdf/240719_mondai.pdf",
            answer: "https://www.nanzan-u.ac.jp/admission/news/2024/pdf/240719_kaitou-rei.pdf",
            source: "https://www.nanzan-u.ac.jp/admission/news/2024/240719_joho.html",
        },
    },
    {
        name: "南山大学 「情報」サンプル問題(2024年3月分)", url: {
            question: "https://www.nanzan-u.ac.jp/admission/news/2023/pdf/240326_mondai.pdf?240328",
            source: "https://www.nanzan-u.ac.jp/admission/news/2023/240326_joho.html",
            answer: "https://www.nanzan-u.ac.jp/admission/news/2023/pdf/240326_kaitou-rei.pdf?240328",
        },
    },
    {
        name: "北海道情報大学 令和7年度一般選抜1期問題(1日目)", url: {
            question: "https://www.do-johodai.ac.jp/_cmswp/wp-content/uploads/R7_informationI_1.pdf",
            answer: "https://www.do-johodai.ac.jp/_cmswp/wp-content/uploads/R7_informationI_1_answer.pdf",
            source: "https://www.do-johodai.ac.jp/examinee/examinfo/entrance_exam/",
        },
    },
    {
        name: "北海道情報大学 令和7年度一般選抜1期問題(2日目)", url: {
            question: "https://www.do-johodai.ac.jp/_cmswp/wp-content/uploads/R7_informationI_2.pdf",
            answer: "https://www.do-johodai.ac.jp/_cmswp/wp-content/uploads/R7_informationI_2_answer.pdf",
            source: "https://www.do-johodai.ac.jp/examinee/examinfo/entrance_exam/",
        },
    }
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
    let answerButton = {
        class: "no-link",
        target: "",
        href: "",
    }
    let sourceButton = {
        class: "no-link",
        target: "",
        href: "",
    }

    if (url.answer) {
        answerButton.class = "";
        answerButton.target = "_blank";
        answerButton.href = `href="${url.answer}"`;
    }

    if (url.source) {
        sourceButton.class = "source-link";
        sourceButton.target = "_blank";
        sourceButton.href = `href="${url.source}"`;
    }

    const answerLinkButtonHtml = `
    <a class="question-link-button ${answerButton.class}" ${answerButton.href} target="${answerButton.target}">答え</a>`
    return `
        <li>
            <span class="question-number">${index}</span>
            <span class="question-title"><a class="${sourceButton.class}" ${sourceButton.href} target="${sourceButton.target}">${name}</a></span>
            <a class="question-link-button" href="${url.question}" target="_blank">問題を解く</a>
            ${answerLinkButtonHtml}
        </li>
    `
}

//////////
// 描画 //
/////////
document.addEventListener('DOMContentLoaded', function () {
    renderSisakuList();
});