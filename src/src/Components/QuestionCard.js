import './QuestionCard.css';
import React, { useEffect, useState } from 'react';

const QuestionCard = ({ currentQuestionIndex, setCurrentQuestionIndex, question, options, correct_answer, score, setScore }) => {
    const [timeLeft, setTimeLeft] = useState(10);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prevState) => {
                const updatedTime = prevState - 1;
                if (updatedTime === 0) {
                    clearInterval(timer);
                    skipHandler();
                }
                return updatedTime;
            });
        }, 1000);

        return () => {
            clearInterval(timer);
        };

    }, [currentQuestionIndex]);

    function skipHandler() {
        setTimeLeft(10);
        setCurrentQuestionIndex((prevState) => {
            return prevState + 1;
        });
    }

    function answerHandler(e) {
        if (e.target.innerText === correct_answer) {
            setScore((prevState) => {
                return prevState + 1;
            });
        }
        skipHandler();
    }

    return (
        <div className='question_card'>
            <h4>Question {currentQuestionIndex + 1}</h4>
            <p>Question: {question}</p>
            <div className='option-btns'>
                {
                    options.map((elem, index) => {
                        return (
                            <button className='btn' onClick={answerHandler} key={index}>{elem}</button>
                        );
                    })
                }
            </div>
            <p>Time left: {timeLeft}</p>
            <button onClick={skipHandler} className='btn skip_btn'>Skip Question</button>
        </div>
    );
};

export default QuestionCard;
