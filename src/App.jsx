/* eslint-disable react/prop-types */
import { useState } from 'react'
import './App.css'
import IntroScreen from './IntroScreen'
import Quiz from './Quiz'

export default function App() {
  const [screen, setScreen] = useState("intro")
  const startQuiz = () => setScreen("")
  

  return (
    <>
      {
        screen === "intro" ? 
          <IntroScreen startQuiz={startQuiz}/> : 
          <Quiz />
      }
    </>
  )
}
