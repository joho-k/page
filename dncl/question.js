const questions = {
    beginner: [
        {
            title: "足し算を行うプログラム",
            question: "aとbの値を足した結果を表示せよ。",
            output: "30",
            code: `a = 10\nb = 20\n表示する(a + b)`
        },
        {
            title: "掛け算を行うプログラム",
            question: "aとbの値を掛け算した結果を表示せよ。",
            output: "300",
            code: `a = 10\nb = 30\n表示する(a * b)`
        }
    ],
    intermediate: [
        {
            title: "割り算を行うプログラム",
            question: "aをbで割った結果を表示せよ。",
            output: "5",
            code: `a = 10\nb = 2\n表示する(a / b)`
        }
    ],
    advanced: [
        {
            title: "素数判定プログラム",
            question: "与えられた数字が素数かどうかを判定するプログラムを作成せよ。",
            output: "30",
            code: `function isPrime(n) {\n  for (let i = ***; i < n; i++) {\n       if (*** === 0) return false;\n  }\n  return n > 1;\n}\n\nisPrime(5);`
        }
    ]
};

////////////////////
// リストを作成する //
///////////////////

function renderquestionList() {

    // 各カテゴリをループ処理
    Object.keys(questions).forEach(level => {
        const questionList = document.querySelector(`#list-${level} ul`); // 対応するulを取得
        let questionListHtml = "";

        // それぞれの問題をリスト化
        questions[level].forEach((question, index) => {
            questionListHtml += createquestionListHtml(level, index + 1, question.title);
        });

        // innerHTMLに設定
        questionList.innerHTML = questionListHtml;
    });
}


function createquestionListHtml(level, index, title) {
    return `
        <li>
            <span class="question-number">${index}</span>
            <span class="question-title">${title}</span>
            <a class="question-link-button" href="./question.html?num=${index}&level=${level}">問題を解く</a>
        </li>
    `
}



//////////
// 描画 //
/////////
document.addEventListener('DOMContentLoaded', function () {
    if (window.location.pathname.includes('index.html')) {
        // index.htmlの場合
        renderquestionList();
    } else if (window.location.pathname.includes('question.html')) {
        // question.htmlの場合
    }
});
