/**
 * 問題の単元（変数と代入／条件分岐／繰り返し／配列／関数）と、単元ごとの解説動画をまとめて持つ。
 *
 * 単元は quiz-data.js の ast から機械的に判定する。
 * 問題を1問足せば単元は自動で付くので、quiz-data.js 側に単元を書く必要はない。
 * 判定と意図がずれる問題だけ TOPIC_OVERRIDE で直す。
 *
 * 使う側:
 *   window.dnclTopics.topicIdsOf(quiz)  … その問題の単元ID配列（["branch","loop"] など）
 *   window.dnclTopics.TOPICS            … 単元の定義（表示名・要点・動画）
 *
 * ブラウザからは <script src="topics.js"> で、Node からは quiz-data.js と同じく
 * new Function("window", src) で読み込む。
 */
(function () {
    "use strict";

    // 難しい順に並べる。1問に複数付くとき、代表（動画を出す順番）もこの並び。
    const TOPICS = [
        {
            id: "variable",
            name: "変数と代入",
            lead: "値を入れておく「箱」に名前をつけて、あとから取り出す。",
            example: "x = 25\ny = 30\nsum = x + y\n表示する(sum)",
            pitfall: "= は「等しい」ではなく「右の値を左に入れる」。だから sum = sum + 1 のように、自分自身を使って書き換えられる。",
            video: "hFkzjGTo498",
            videoLabel: "第1回 変数と代入",
        },
        {
            id: "branch",
            name: "条件分岐",
            lead: "条件が成り立つかどうかで、実行する処理を分ける。",
            example: 'もし score >= 80 ならば:\n  表示する("合格")\nそうでなければ:\n  表示する("不合格")',
            pitfall: "「80点以上」は >= 、「80点より上」は > 。80点ちょうどを含むかどうかで答えが変わる。",
            video: "I7Da9CiT0LQ",
            videoLabel: "第2回 条件分岐",
        },
        {
            id: "loop",
            name: "繰り返し",
            lead: "同じ処理を何回もする。回数が決まっているなら for、条件で続けるなら while。",
            example: "sum = 0\ni を 1 から 5 まで 1 ずつ増やしながら繰り返す:\n  sum = sum + i\n表示する(sum)",
            pitfall: "「1から5まで」は5回。0から数え始めると回数がずれる。while は i = i + 1 を書き忘れると終わらない。",
            video: "Lo0sNwFWQ3g",
            videoLabel: "第3回 繰り返し",
        },
        {
            id: "array",
            name: "配列",
            lead: "同じ種類の値をまとめて入れて、番号で取り出す。",
            example: "ten = [72,85,80,90,58,88]\n表示する(ten[0])",
            pitfall: "番号は0から始まる。6個入っていても最後は ten[5] で、ten[6] は無い。",
            video: null,
            videoLabel: null,
        },
        {
            id: "function",
            name: "関数",
            lead: "よく使う処理に名前をつけて、何度でも呼び出す。",
            example: null,
            pitfall: null,
            video: null,
            videoLabel: null,
            comingSoon: true,
        },
    ];

    // 自動判定が意図とずれる問題だけ、ここで単元を上書きする。
    //   例) q015: ["variable"]
    const TOPIC_OVERRIDE = {};

    const CONTROL = { if: "branch", ifelse: "branch", ifmulti: "branch", ifelsemulti: "branch", for: "loop", while: "loop" };
    const CHILD_KEYS = ["body", "ifBody", "elseBody", "then", "else", "branches"];

    // 配列は ast のノード種別に出てこない（値の中の文字列として現れる）ので、式から見つける。
    //   ten = [72,85,80]  … 配列を作っている
    //   ten[i] >= 80      … 配列から取り出している
    const ARRAY_RE = /(^\s*\[)|([A-Za-z_]\w*\s*\[)/;

    function scan(nodes, found) {
        if (!Array.isArray(nodes)) return;

        nodes.forEach((node) => {
            if (!node || typeof node !== "object") return;

            if (CONTROL[node.type]) found.add(CONTROL[node.type]);
            if (node.type === "array") found.add("array");

            Object.entries(node).forEach(([key, value]) => {
                if (typeof value === "string" && key !== "type" && ARRAY_RE.test(value)) {
                    found.add("array");
                } else if (Array.isArray(value) && CHILD_KEYS.includes(key)) {
                    scan(value, found);
                }
            });
        });
    }

    /** その問題の単元IDを、TOPICS の並び順で返す。制御構造も配列も無ければ「変数と代入」。 */
    function topicIdsOf(quiz, id) {
        if (id && TOPIC_OVERRIDE[id]) return TOPIC_OVERRIDE[id].slice();

        const found = new Set();
        scan((quiz && quiz.ast) || [], found);

        if (found.size === 0) found.add("variable");

        return TOPICS.filter((t) => found.has(t.id)).map((t) => t.id);
    }

    function topicById(topicId) {
        return TOPICS.find((t) => t.id === topicId) || null;
    }

    /** その問題に紐づく解説動画（単元のうち動画があるものだけ）。 */
    function videosOf(quiz, id) {
        return topicIdsOf(quiz, id)
            .map(topicById)
            .filter((t) => t && t.video);
    }

    /** 単元ID -> 問題数。 */
    function countByTopic(quizData) {
        const counts = {};
        TOPICS.forEach((t) => (counts[t.id] = 0));

        Object.entries(quizData || {}).forEach(([id, quiz]) => {
            topicIdsOf(quiz, id).forEach((t) => (counts[t] += 1));
        });

        return counts;
    }

    window.dnclTopics = { TOPICS, TOPIC_OVERRIDE, topicIdsOf, topicById, videosOf, countByTopic };
})();
