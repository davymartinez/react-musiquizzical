/* eslint-disable react/prop-types */
/* import { useState } from "react" */
import he from "he"

const Question = ({ question, answers, showCorrectAnswers, selectAnswer, questionIndex }) => {

    if (!question || !answers || answers.length === 0) {
        return null
    }

    const answersContent = answers.map((answer, index) => {
        const styles = {
            backgroundColor: answer.isSelected ? "#d6dbf5" : "#f5f7fb",
            borderColor: answer.isSelected ? "#d6dbf5" : "#4d5b9e",
        }

        const correctAnswerStyles = {
            backgroundColor: answer.isCorrect ? "#94d7a2" : answer.isSelected ? "#f8bcbc" : "#f5f7fb",
            borderColor: answer.isCorrect ? "#94d7a2" : answer.isSelected ? "#f8bcbc" : "#4d5b9e",
            opacity: answer.isCorrect ? "1" : "0.5",
        }
        
        return (
            <li
                className="answer-option"
                style={showCorrectAnswers ? correctAnswerStyles : styles}
                key={index}
                onClick={() => selectAnswer(questionIndex, index)}
            >
                {he.decode(answer.answer)}
            </li>
        )
    })

    return (
        <div className='question-container'>
            <h2 className="question-h2">{he.decode(question)}</h2>
            <ul className='answer-options-container'>
                {answersContent}
            </ul>
            <hr />
        </div>
    )
}

export default Question