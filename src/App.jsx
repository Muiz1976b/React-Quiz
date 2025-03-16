import React, { useState } from 'react';
import Questions from './assets/components/Questions';
import questions from './assets/questions';
import './App.css'

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [answerSubmitted, setAnswerSubmitted] = useState(false);
  const totalQuestions = questions.length

  const handleAnswerSubmit = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
      setFeedback('Correct!');
    } else {
      setWrongAnswers(wrongAnswers + 1);
      setFeedback('Sorry!');
    }
    setAnswerSubmitted(true);
  };

  const handleNextQuestion = () => {
    setAnswerSubmitted(false);
    setCurrentQuestion(currentQuestion + 1);
    setFeedback('');
  };
  const progressLow = {
    width: `${(score / totalQuestions) * 100}%`,

}
const progressCurrent = {
  width: `${(score / (wrongAnswers + score)) * 100}%`,
}
const progressMax = {
  width: `${((totalQuestions - wrongAnswers) / totalQuestions) * 100}%`,
};

  return (
    <div>
      {currentQuestion < totalQuestions ? (
        <Questions
          question={questions[currentQuestion]}
          handleAnswerSubmit={handleAnswerSubmit}
          currentQuestion={currentQuestion}
          totalQuestions={totalQuestions}
          key={currentQuestion}
        />
      ) : (
        <h2>
          Quiz complete! Your score is {score}/{questions.length}{' '}
          {wrongAnswers} wrong answers
        </h2>
      )}
      {feedback && <p>{feedback}</p>}
      {answerSubmitted && (
        <button className="next-btn" onClick={handleNextQuestion}>
          Next Question
        </button>
      )}
      {currentQuestion < totalQuestions ? (
  <div className='all-progress-info'>
    <div className="score-count">
      <p>Score: {(score / totalQuestions) * 100}%</p>
      <p>Max Score: {wrongAnswers ? `${((totalQuestions - wrongAnswers) / totalQuestions) * 100}%` : '100%'}</p>
    </div>
    <div className="progress-container-bottom">
      <div className="progress-bar-lowest" style={progressLow} />
      <div className="progress-bar-current" style={progressCurrent} />
      <div className="progress-bar-max" style={progressMax} />
    </div>
  </div>
) : (
  ''
)}

      
      
    </div>
  );
}



export default App;