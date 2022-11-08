"use strict";

{
  /**
   * @typedef QUIZ
   * @property {number} correctNumber 問題番号
   * @property {string | undefined} note ノート
   * @property {string} question 問題文
   * @property {string[]} answers 回答の配列
   */

  /**
   * @description 問題と回答の定数
   * @type {QUIZ[]}
   */
  const ALL_QUIZ = [
    {
      id: 1,
      question:
        "日本のIT人材が2030年には最大どれくらい不足すると言われているでしょうか？",
      answers: ["約28万人", "約79万人", "約183万人"],
      correctNumber: 1,
      note: "経済産業省 2019年3月 － IT 人材需給に関する調査",
    },
    // 問題を一門ごとに番号付け
    //
    {
      id: 2,
      question:
        "既存業界のビジネスと、先進的なテクノロジーを結びつけて生まれた、新しいビジネスのことをなんと言うでしょう？",
      answers: ["INTECH", "BIZZTECH", "X-TECH"],
      correctNumber: 2,
    },
    {
      id: 3,
      question: "IoTとは何の略でしょう？",
      answers: [
        "Internet of Things",
        "Integrate into Technology",
        "Information on Tool",
      ],
      correctNumber: 0,
    },
    {
      id: 4,
      question:
        "イギリスのコンピューター科学者であるギャビン・ウッド氏が提唱した、ブロックチェーン技術を活用した「次世代分散型インターネット」のことをなんと言うでしょう？",
      answers: ["Society 5.0", "CyPhy", "SDGs"],
      correctNumber: 0,
      note: "Society5.0 - 科学技術政策 - 内閣府",
    },
    {
      id: 5,
      question:
        "イギリスのコンピューター科学者であるギャビン・ウッド氏が提唱した、ブロックチェーン技術を活用した「次世代分散型インターネット」のことをなんと言うでしょう？",
      answers: ["Web3.0", "NFT", "メタバース"],
      correctNumber: 0,
    },
    {
      id: 6,
      question:
        "先進テクノロジー活用企業と出遅れた企業の収益性の差はどれくらいあると言われているでしょうか？",
      answers: ["約2倍", "約5倍", "約11倍"],
      correctNumber: 1,
      note: "Accenture Technology Vision 2021",
    },
  ];

  /**
   * @description クイズコンテナーの取得
   * 下についての説明
   * @type {HTMLElement}
   */
  const quizContainer = document.getElementById("js-quizContainer");

  /**
   * @description クイズ１つ１つのHTMLを生成するための関数
   * @param quizItem { QUIZ }
   * @param questionNumber { number }
   * @returns {string}
   */

  // createパート始まり
  const createQuizHtml = (quizItem, questionNumber) => {
    /**qiはallquiz   qnは０から５までの間
     * @description 回答の生成
     * @type {string}
     */
    const answersHtml = quizItem.answers
      .map(
        (answer, answerIndex) => `<li class="p-quiz-box__answer__item">
        <button class="p-quiz-box__answer__button js-answer" data-answer="${answerIndex}">
          ${answer}<i class="u-icon__arrow"></i>
        </button>
      </li>`
      )
      .join("");
// map＝繰り返したものを配列として変えしてくれる（今回はクイズを）
// どうゆうこと？

    // join野中はまだ指定されてない  答え部分を生成

    // 引用テキストの生成
    const noteHtml = quizItem.note
      ? `<cite class="p-quiz-box__note">
      <i class="u-icon__note"></i>${quizItem.note}
    </cite>`
      : "";
    // quizItem.noteが存在すればtrue　　？？

    return `<section class="p-quiz-box js-quiz" data-quiz="${questionNumber}">
      <div class="p-quiz-box__question">
        <h2 class="p-quiz-box__question__title">
          <span class="p-quiz-box__label">Q${questionNumber + 1}</span>
          <span
            class="p-quiz-box__question__title__text">${
              quizItem.question
            }</span>
        </h2>
        <figure class="p-quiz-box__question__image">
          <img src="../assets/img/quiz/img-quiz0${quizItem.id}.png" alt="">
        </figure>
      </div>
      <div class="p-quiz-box__answer">
        <span class="p-quiz-box__label p-quiz-box__label--accent">A</span>
        <ul class="p-quiz-box__answer__list">
          ${answersHtml}
        </ul>
        <div class="p-quiz-box__answer__correct js-answerBox">
          <p class="p-quiz-box__answer__correct__title js-answerTitle"></p>
          <p class="p-quiz-box__answer__correct__content">
            <span class="p-quiz-box__answer__correct__content__label">A</span>
            <span class="js-answerText"></span>
          </p>
        </div>
      </div>
      ${noteHtml}
    </section>`;
  };
// returnで実引数を仮引数に入力
  // createQuizHtmlはこれらをhtmlに文字列としてquizcontainerに表記するよってここまで言ってる
  // ここまではhtmlの話




  
  /**
   * @description 配列の並び替え
   * @param arrays {Array}
   * @returns {Array}
   */
  const shuffle = (arrays) => {
    const array = arrays.slice();
    for (let i = array.length - 1; i >= 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
    }
    return array;
  };
  // 何をsliceしてる？
  //

  /**
   * @description quizArrayに並び替えたクイズを格納
   * @type {Array}
   */
  const quizArray = shuffle(ALL_QUIZ);
  // shuffleという関数が呼び出された→shuffleという関数の定義を見に行く

  /**
   * @type {string}
   * @description 生成したクイズのHTMLを #js-quizContainer に挿入
   */

  quizContainer.innerHTML = quizArray
    .map((quizItem, index) => {
      return createQuizHtml(quizItem, index);
    })
    .join("");
  // map歯配列を扱うメゾット、新しい配列を返す

  /**
   * @type {NodeListOf<Element>}
   * @description すべての問題を取得
   */
  const allQuiz = document.querySelectorAll(".js-quiz");

  /**
   * @description buttonタグにdisabledを付与
   * @param answers {NodeListOf<Element>}
   */
  const setDisabled = (answers) => {
    answers.forEach((answer) => {
      answer.disabled = true;
    });
  };

  /**
   * @description trueかfalseで出力する文字列を出し分ける
   * @param target {Element}
   * @param isCorrect {boolean}
   */
  const setTitle = (target, isCorrect) => {
    target.innerText = isCorrect ? "正解！" : "不正解...";
  };

  /**
   * @description trueかfalseでクラス名を付け分ける
   * @param target {Element}
   * @param isCorrect {boolean}
   */
  const setClassName = (target, isCorrect) => {
    target.classList.add(isCorrect ? "is-correct" : "is-incorrect");
  };

  /**
   * 各問題の中での処理
   */
  allQuiz.forEach((quiz) => {
    // 配列の各要素に同じ処理を繰り返す
    const answers = quiz.querySelectorAll(".js-answer");
    const selectedQuiz = Number(quiz.getAttribute("data-quiz"));
    // datequiz属性についてる値をとってくる
    const answerBox = quiz.querySelector(".js-answerBox");
    const answerTitle = quiz.querySelector(".js-answerTitle");
    const answerText = quiz.querySelector(".js-answerText");

    answers.forEach((answer) => {
      answer.addEventListener("click", () => {
        answer.classList.add("is-selected");
        const selectedAnswerNumber = Number(answer.getAttribute("data-answer"));

        // 全てのボタンを非活性化
        setDisabled(answers);
        // 上で定義されてる

        // 正解ならtrue, 不正解ならfalseをcheckCorrectに格納
        const correctNumber = quizArray[selectedQuiz].correctNumber;
        const isCorrect = correctNumber === selectedAnswerNumber;
        // 正誤判定

        // 回答欄にテキストやclass名を付与
        answerText.innerText = quizArray[selectedQuiz].answers[correctNumber];
        setTitle(answerTitle, isCorrect);
        setClassName(answerBox, isCorrect);
      });
    });
  });
}
