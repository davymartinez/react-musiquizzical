import { useEffect, useState } from 'react'
import {nanoid} from 'nanoid'
import Question from './Question'
import ScaleLoader from 'react-spinners/ScaleLoader'

const override = {
    display: 'block',
    margin: '0 auto',
    borderColor: 'red'
}

const Quiz = () => {
    const [questions, setQuestions] = useState([])
    const [showCorrectAnswers, setShowCorrectAnswers] = useState(false)
    const [loading, setLoading] = useState(false)

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array
    }

    function getAnswers(correct, incorrect) {
        return incorrect.map(incorrectAnswer => ({
            answer: incorrectAnswer,
            isSelected: false,
            id: nanoid(),
            isCorrect: false
        })).concat({
            answer: correct,
            isSelected: false,
            id: nanoid(),
            isCorrect: true
        })
    }

    let ignore = false
    let url = "https://opentdb.com/api.php?amount=5&category=12"

    async function fetchQuestions() {
        const response = await fetch(url)
        const data = await response.json()
        const questionData = data.results.map(result => {
            let qnaArray = []
            let {question, correct_answer, incorrect_answers} = result
            let answers = getAnswers(correct_answer, incorrect_answers)

            qnaArray = [
                {
                    question: question, 
                    answers: shuffleArray(answers)
                }
            ]

            return qnaArray
        }).flat()

        if (!ignore) {
            setQuestions(questionData)
        }   
    }

    useEffect(() => {
        fetchQuestions()
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 1500)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    function selectAnswer(questionIndex, answerIndex) {
        setQuestions((prev) => prev.map((question, i) =>
            questionIndex !== i ? question : 
                {   
                    ...question,
                    answers: question.answers.map((answer, index) =>
                        answerIndex === index ? 
                            { ...answer, isSelected: true } : 
                            { ...answer, isSelected: false }
                    )
                }
        ));
    }

    function showCorrect() {
        setShowCorrectAnswers(true)
    }

    function launchNewGame() {
        setShowCorrectAnswers(false)
        fetchQuestions()
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 1500)
    }

    function calculateCorrectAnswers(questions) {
        return questions.reduce((acc, question) => {
            const correctAnswers = question.answers.filter(answer => (answer.isCorrect && answer.isSelected))
            return acc + correctAnswers.length
        }, 0)
    }

    return (
        loading ? 
            <ScaleLoader 
                color="#4D5B9E"
                cssOverride={override}
                height={70}
                margin={4}
                radius={4}
                width={8}
            /> : 
            (
                <div className='container'>
                    <div className='blob-lemony-questions-container'>
                        <img src="/src/assets/blob-lemony.png" alt="" />
                    </div>
                    {questions.map((question, index) => (
                        <Question
                            key={nanoid()}
                            questionIndex={index}
                            question={question.question}
                            answers={question.answers}
                            showCorrectAnswers={showCorrectAnswers}
                            selectAnswer={selectAnswer}
                        />
                    ))}

                    {(!showCorrectAnswers) ? 
                        (<button 
                            className='check-button'
                            onClick={showCorrect}
                        >
                            Check answers
                        </button>) : (
                            <div className='answer-and-button-container'>
                                <p>You scored {calculateCorrectAnswers(questions)}/{questions.length} correct answers</p>
                                <button
                                    className='play-again-button'
                                    onClick={launchNewGame}
                                >
                                    Play again
                                </button>
                            </div>
                        )
                    }
                    
                    <div className='blob-baby-questions-container'>
                        <img src="/src/assets/blob-baby.png" alt="" />
                    </div>
                </div>
            )
        
    )
}

export default Quiz