import React from 'react';
import { useGlobalContext } from './context';

const Questions = () => {
  const {
    quiz,
    questions,
    page,
    quit,
    skip,
    handleAnswer,
    score,
    clicked,
    setClicked,
    setCorrectAnswer,
  } = useGlobalContext();
  React.useEffect(() => {
    if (clicked) {
      const currentQuestion = questions[page];
      const { correct_answer } = currentQuestion;
      setCorrectAnswer(correct_answer);
      setClicked(false);
    }
  }, [clicked]);

  const currentQuestion = questions[page];
  const { correct_answer, incorrect_answers } = currentQuestion;
  const newAnswers = [...incorrect_answers, correct_answer];

  const shuffleArray = (arr) =>
    arr
      .map((a) => [Math.random(), a])
      .sort((a, b) => a[0] - b[0])
      .map((a) => a[1]);

  const newList = shuffleArray(newAnswers);
  return (
    <div className='quiz'>
      <p className='correct-answer'>
        Correct Answers: {score}/{quiz.amount}
      </p>
      <div className='setup-form'>
        <h3
          className='title'
          dangerouslySetInnerHTML={{ __html: currentQuestion.question }}
        ></h3>
        <div className='form-control options'>
          {newList.map((item, index) => {
            return (
              <button
                className='answer-btn'
                key={index}
                data-id={item}
                onClick={handleAnswer}
              >
                {item}
              </button>
            );
          })}
        </div>
        <div className='extra'>
          <button className='quit' onClick={quit}>
            Quit
          </button>
          <button className='next-btn' onClick={skip}>
            Skip
          </button>
        </div>
      </div>
    </div>
  );
};

export default Questions;
