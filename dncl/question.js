// URLのパラメータを取得
const urlParams = new URLSearchParams(window.location.search);
const num = urlParams.get('num'); // 問題番号
const level = urlParams.get('level'); // 難易度

////////////////////
// リストを作成する //
///////////////////

function renderquestionList() {

    // 各カテゴリをループ処理
    Object.keys(questions).forEach(level => {
        const questionList = document.querySelector(`#list-${level} ul`); // 対応するulを取得
        let questionListHtml = '';

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
    document.getElementById('output-content').innerHTML = formatLineBreak(question.output);
    document.getElementById('func-content').innerHTML =
        question.func ? formatLineBreak(question.func) : "なし";
    document.getElementById('code-content').innerHTML = formatCodeWithInput(question.code);
    addLineNumber(question.code);
    document.getElementById('hint-content').innerHTML =
        question.hint ? formatLineBreak(question.hint) : "なし";
    document.title = `情報の教室 | ${title}`;

    document.getElementById("prev-question").href = `./question.html?num=${Number(num) - 1}&level=${level}`;
    document.getElementById("next-question").href = `./question.html?num=${Number(num) + 1}&level=${level}`;

    addEventListenersToInputs()
};

// 問題データを取得する関数（ダミーデータを返す）
function getquestion(num, level) {
    // 問題リストから対応する問題を取得
    const levelquestions = questions[level];
    return levelquestions[num - 1]; // numは1始まりなのでインデックスに合わせる
}

// コード内の '***' を入力フォームに変換する関数
let inputIdCounter = 0;
function formatCodeWithInput(code) {
    const katakana = ['ア', 'イ', 'ウ', 'エ', 'オ', 'カ', 'キ', 'ク', 'ケ', 'コ', 'サ', 'シ', 'ス', 'セ', 'ソ', 'タ', 'チ', 'ツ', 'テ', 'ト', 'ナ', 'ニ', 'ヌ', 'ネ', 'ノ', 'ハ', 'ヒ', 'フ', 'ヘ', 'ホ'];
    // '***' を <input type="text"> に変換
    let formattedCode = code.replace(/\*{3,6}/g, function (match) {
        const inputClass = match.length === 3 ? "short-input" : "long-input";
        return `<input type="text" id="input-${inputIdCounter}" class="${inputClass}" placeholder="(${katakana[inputIdCounter++]})" />`;
    });


    // 改行 (\n) を <br> に変換
    formattedCode = formatLineBreak(formattedCode);

    return formattedCode;
}

function formatLineBreak(code) {
    return code.replace(/\n/g, '<br>')
}

function addLineNumber(code) {
    const lineNumbers = document.getElementById("line-numbers");

    // コードの行数を取得
    const codeLines = code.split("\n").length;

    // 行番号を生成
    let lineNumberHTML = "";
    for (let i = 1; i <= codeLines; i++) {
        lineNumberHTML += i + "<br/>";
    }

    // 行番号を挿入
    lineNumbers.innerHTML = lineNumberHTML;
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

///
///
document.getElementById("create-url-button").addEventListener("click", function () {
    const openTsuchinokoButton = document.getElementById("open-tsuchinoko-button");
    const closeButton = document.getElementById("close-button");

    let code = [...document.getElementById("code-content").childNodes].map((e) => {
        if (e.nodeName === "BR") {
            return "\n"; // <br> を \n に変換
        }
        return e.value !== undefined ? e.value : e.textContent;
    }).join("");
    let url = "https://t-daimon.jp/tsuchinoko/ide/?code=" + TSUCHINOKO.compress(code);

    // ダイアログを表示
    let dialog = document.getElementById("confirmation-dialog");
    dialog.showModal(); // ダイアログを表示

    const question = getquestion(num, level); // 問題データを取得
    document.getElementById('output-content-dialog').innerHTML = formatLineBreak(question.output);

    // OKボタンが押された場合（1回だけ実行）
    openTsuchinokoButton.addEventListener("click", function () {
        window.open(url, '_blank'); // 新しいタブでURLを開く
        dialog.close(); // ダイアログを閉じる
    }, { once: true });

    // キャンセルボタンが押された場合（1回だけ実行）
    closeButton.addEventListener("click", function () {
        dialog.close(); // ダイアログを閉じる
    }, { once: true });
});

function toHalfWidth(str) {
    // 全角英数字を半角に変換
    str = str.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function (s) {
        return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
    });
    return str;
}

function convertToHalfWidthOperators(str) {
    // 全角記号とその対応する半角記号のマッピング
    const fullWidthToHalfWidthMap = {
        '＜': '<',
        '＞': '>',
        '＝': '=',
        '／': '/',
        '＊': '*',
        '＋': '+',
        '－': '-',
        '％': '%',
        '（': '(',
        '）': ')',
        '［': '[',
        '］': ']'
    };

    // 正規表現で全角記号を半角記号に置換
    return str.replace(/[＜＞＝／＊＋－％（）［］]/g, function (match) {
        return fullWidthToHalfWidthMap[match];
    });
}



// エラーになるプログラムの書き方はすべて排除
function correctCodeStyle(str) {
    return convertToHalfWidthOperators(toHalfWidth(str))
}

function addEventListenersToInputs() {
    const inputs = document.querySelectorAll('input'); // DOM にあるすべての <input>
    inputs.forEach(input => {
        input.addEventListener('blur', function () {
            this.value = correctCodeStyle(this.value)
        });
    });
}
