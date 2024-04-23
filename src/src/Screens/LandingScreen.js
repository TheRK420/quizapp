import QuestionCard from "../Components/QuestionCard";
import "./LandingScreen.css";
import React, { useEffect, useState } from "react";

const LandingScreen = () => {
  const [questionData, setQuestionData] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const url = "https://opentdb.com/api.php?amount=10";  
    
    if (questionData.length === 0) {
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          console.log(data.results);
          if (data.results) {
            const formattedQuestions = data.results.map((elem) => ({
              question: elem.question,
              options: [...elem.incorrect_answers, elem.correct_answer],
              correct_answer: elem.correct_answer,
              score: 0,
            }));
            setQuestionData(formattedQuestions);
          }
        })
        .catch((error) => {
          console.error("Error fetching quiz questions:", error);
        });
    }
  }, [questionData.length]);

  function restartHandler() {
    setScore(0);
    setCurrentQuestionIndex(0);
  }

  return (
    <div id="container">
      <h1>Quiz App</h1>
      {questionData.length > 0 && currentQuestionIndex < questionData.length ? (
        <QuestionCard
          question={questionData[currentQuestionIndex].question}
          options={questionData[currentQuestionIndex].options}
          correct_answer={questionData[currentQuestionIndex].correct_answer}
          currentQuestionIndex={currentQuestionIndex}
          setCurrentQuestionIndex={setCurrentQuestionIndex}
          score={score}
          setScore={setScore}
        />
      ) : (
        <div id="quiz_end_card">
          <p>{questionData.length === 0 ? "Loading..." : "Quiz Ended"}</p>
          {currentQuestionIndex > 0 && (
            <>
              <p>Your Score: {score}</p>
              <button onClick={restartHandler} className="btn">
                Restart
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default LandingScreen;
