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


///////////////////////
// 問題ページを生成する //
///////////////////////

function renderquestionPage() {
    // URLのパラメータを取得
    const urlParams = new URLSearchParams(window.location.search);
    const num = urlParams.get('num'); // 問題番号
    const level = urlParams.get('level'); // 難易度

    // 初級、中級、上級の名前をマッピング
    const levelNames = {
        beginner: "初級",
        intermediate: "中級",
        advanced: "上級"
    };

    // 取得したパラメータに基づいて表示内容を更新
    const question = getquestion(num, level); // 問題データを取得

    // タイトルと内容を更新
    const title = `実プロ！ | 第${num}問(${levelNames[level]})`
    document.getElementById('question-number').textContent = num;
    document.getElementById('difficulty-level').textContent = levelNames[level];
    document.getElementById('question-title').textContent = title;
    document.getElementById('question-content').textContent = question.question;
    document.getElementById('output-content').textContent = question.output;
    document.getElementById('func-content').textContent = question.func || "なし";
    document.getElementById('code-content').innerHTML = formatCodeWithInput(question.code);
    document.title = `情報の教室 | ${title}`;
};

// 問題データを取得する関数（ダミーデータを返す）
function getquestion(num, level) {
    // 問題リストから対応する問題を取得
    const levelquestions = questions[level];
    return levelquestions[num - 1]; // numは1始まりなのでインデックスに合わせる
}

// コード内の '***' を入力フォームに変換する関数
let inputIdCounter = 1;
function formatCodeWithInput(code) {
    // '***' を <input type="text"> に変換
    let formattedCode = code.replace(/\*\*\*/g, function () {
        return `<input type="text" id="input-${inputIdCounter}" placeholder="(${inputIdCounter++})" />`;
    });

    // 改行 (\n) を <br> に変換
    formattedCode = formattedCode.replace(/\n/g, '<br>');

    return formattedCode;
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
        renderquestionPage();
    }

});
