import React, { useState, useContext, useMemo } from 'react'
import { AppContext } from '../helpers/Context';


function Question() {
    //state management
    const [isAnswered, setIsAnswered] = useState(false)

    //Context management 
    const { score, setScore, questions, setGameState, currentQuestionIndex, setCurrentQuestionIndex } = useContext(AppContext)

    //helper function to shuffle array for questions/answers
    const shuffleArray = (array) => {
        return array.sort(() => Math.random() - 0.5)
    }

     //current question based on index 
     const currentQuestion = questions[currentQuestionIndex]

    //event handler to fetch next question
    const handleNextQuestion = () => {
        if(currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1)
        setIsAnswered(false)
        }
     
    }

   // Memoize the shuffled answers to prevent reshuffling on every render
  const allAnswers = useMemo(() => {
      //combine correct and incorrect answers in array
    if (currentQuestion) {
      return shuffleArray([currentQuestion.correct_answer, ...currentQuestion.incorrect_answers]);
    }
    return [];
  }, [currentQuestion]); // Re-shuffle only when the current question changes

    //Debugging
    console.log('Current Question:', currentQuestion); 
    console.log('Questions:', questions); 
    console.log('Current Question Index:', currentQuestionIndex); 

    //handle selected answer
    const handleAnswerSelection = (selectedAnswer) => {
        if (!isAnswered) {
            setIsAnswered(true) //update state based on selected answer: disable in button to false once clicked
            //check if selected answer is correct to increase score
            if (selectedAnswer === currentQuestion.correct_answer) {
                setScore(score + 1)
            }
            //change gameState after last question to the EndScreen
            if(currentQuestionIndex === questions.length - 1) {
                setTimeout(() => {setGameState('end')}, 2000)
                //TODO: Decide to utilize setTimeout to go to next question or keep next question button
            } else {
                setTimeout(() => handleNextQuestion(), 3000)
            }
        }
    }

    function decodeHtmlEntities(str) {
        const txt = document.createElement("textarea");
        txt.innerHTML = str;
        return txt.value;
      }
      
     
      
    
    //Debugging id current question does not render
    if (!currentQuestion) return <p>Loading...</p>;

    return (
        <>
{questions.length > 0 && currentQuestionIndex < questions.length && (
                <div>
                    <div className='question-display'>
                    <h2>Question {currentQuestionIndex + 1} out of {questions.length}</h2>
                        <p><strong>Category:</strong> {decodeHtmlEntities(currentQuestion.category)}</p>
                        <p><strong>Question:</strong> {decodeHtmlEntities(currentQuestion.question)}</p>
                    </div>
                    <div className='answers-display'>
                        {allAnswers.map((answer, index) => (
                            <button
                                key={index}
                                onClick={() => handleAnswerSelection(answer)}
                                disabled={isAnswered}
                                style={{
                                    backgroundColor: isAnswered && answer === currentQuestion.correct_answer ? 'green' : '',
                                    color: isAnswered && answer === currentQuestion.correct_answer ? 'white' : '',
                                  }}
                            >
                                {decodeHtmlEntities(answer)}
                            </button>
                        ))}
                    </div>
                    {/* {currentQuestionIndex < questions.length - 1 && (
                        <button className='next-question' onClick={handleNextQuestion}>Next Question</button>
                    )} */}
                    <div className='scoreBoard'>
                        <h2>Score: {score}</h2>
                    </div>
                </div>
            )}
        </>
    )
}

export default Question;