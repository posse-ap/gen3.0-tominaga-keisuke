`use strict`;
{
  const CORRECT_ANSWERS = [
    {
      index: 1,
      value: `約79万人`,
    },
    {
      index: 2,
      value: `X-TECH`,
    },
    {
      index: 0,
      value: `Internet of Things`,
    },
    {
      index: 0,
      value: `Society 5.0`,
    },
    {
      index: 0,
      value: `Web3.0`,
    },
    {
      index: 1,
      value: `約5倍`,
    },
    // 正解を定義
  ];

  const allQuiz = document.querySelectorAll(`.quiz`);

  const setDisabled = (answers) => {
    answers.forEach((answers) => {
      answers.disabled = true;
    });
    // ここなに？
  };
  const setTitle = (target, isCorrect) => {
    target.innerText = isCorrect ? `正解!` : `不正解...`;
  };
  // isCorrect という定数に一致するなら正解、でなければ不正解
  // 条件演算子という省略形
  const setClassName = (target, isCorrect) => {
    target.classList.add(isCorrect ? `is-correct` : `is-incorrect`);
  };
  // ??
  allQuiz.forEach((quiz) => {
    const answers = quiz.querySelectorAll(`.js-answer`);
    const selectedQuiz = Number(quiz.getAttribute(`data-quiz`));
    // console.log(selectedQuiz);
    //date-quiz属性の値をとってる
    const answerBox = quiz.querySelector(".js-answerBox");
    const answerTitle = quiz.querySelector(".js-answerTitle");
    const answerText = quiz.querySelector(".js-answerText");
    // html内の値をいっぱい取得してる
    answers.forEach((answer) => {
      answer.addEventListener("click", () => {
        // （）のイベントが起きた時
        answer.classList.add("is-selected");
        const selectedAnswer = Number(answer.getAttribute("data-answer"));

        // 全てのボタンを非活性化
        setDisabled(answers);
        // 一回押したらもう押せなくなる

        // 正解ならtrue, 不正解ならfalseをcheckCorrectに格納
        const isCorrect =
          CORRECT_ANSWERS[selectedQuiz].index === selectedAnswer;
        // 　　　　　　　　一問目のindexが０＝＝＝selectedanswerも０だったら正解

        // 回答欄にテキストやclass名を付与
        answerText.innerText = CORRECT_ANSWERS[selectedQuiz].value;
        setTitle(answerTitle, isCorrect);
        setClassName(answerBox, isCorrect);
        // ??
      });
    });
  });
}
// document.getElementById("button").onclick = function()

//   {document.getElementById("sample").value="正解です";
// }

// let sample.value = "正解です"
