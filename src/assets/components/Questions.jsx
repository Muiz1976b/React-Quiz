import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';


function Questions({ question, handleAnswerSubmit, currentQuestion, totalQuestions }) {
    const difficultyStars = (difficulty) => {
        switch (difficulty) {
          case 'easy':
            return '★☆☆';
          case 'medium':
            return '★★☆';
          case 'hard':
            return '★★★';
          default:
            return '';
        }
      };
    
      

  const progress = {
    width: `${(currentQuestion / totalQuestions) * 100}%`,
  };


  const [selectedAnswer, setSelectedAnswer] = React.useState(null);

  const handleAnswerClick = (answer, isCorrect) => {
    if (!selectedAnswer) {
      setSelectedAnswer(answer);
      handleAnswerSubmit(isCorrect);
    }
  };

  const handleReset = () => {
    setSelectedAnswer(null);
  };

  return (
    <div>
      <div className="progress-container">
        <div className="progress-bar" style={progress}></div>
      </div>
      <div>
        <h2>Question {currentQuestion + 1} of {totalQuestions}</h2>
        <h3 className='category'>{question.category} </h3>
        <p className='difficulty'> {difficultyStars(question.difficulty)}</p>
      </div>
      <h3>{question.question}</h3>
      <ul>
        {question.type === 'multiple' ? (
          question.incorrect_answers.map((answer, index) => (
            <li key={index}>
              <button
                className={`selecting-button ${
                  selectedAnswer === answer ? 'selected' : ''
                }`}
                style={{
                  backgroundColor: selectedAnswer === answer ? '#1f7222' : '',
                }}
                onClick={() => handleAnswerClick(answer, false)}
              >
                {answer}
              </button>
            </li>
          ))
        ) : (
          <li>
            <button
              className={`selecting-button ${
                selectedAnswer === question.correct_answer ? 'selected' : ''
              }`}
              style={{
                backgroundColor: selectedAnswer === question.correct_answer ? '#1f7222' : '',
              }}
              onClick={() => handleAnswerClick(question.correct_answer, true)}
            >
              {question.correct_answer}
            </button>
          </li>
        )}
        {question.type === 'multiple' && (
          <li>
            <button
              className={`selecting-button ${
                selectedAnswer === question.correct_answer ? 'selected' : ''
              }`}
              style={{
                backgroundColor: selectedAnswer === question.correct_answer ? '#1f7222' : '',
              }}
              onClick={() => handleAnswerClick(question.correct_answer, true)}
            >
              {question.correct_answer}
            </button>
          </li>
        )}
      </ul>
      
      
    </div>
  );
}

export default Questions;