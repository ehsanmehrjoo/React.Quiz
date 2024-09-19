import React, { createContext } from 'react'

const QuizContext = createContext();
function QuizProvider() {
  return (
     <QuizContext.Provider></QuizContext.Provider>
  )
}

export default QuizProvider