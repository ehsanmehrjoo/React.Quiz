import React, { createContext, useEffect, useReducer, useContext } from 'react';

const SECS_PER_QUESTION = 30;
const initialState = {
  questions: [],
  status: 'loading',
  index: 0,
  answer: null,
  points: 0,
  HighScore: 0,
  secondsRemaining: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'dataReceived':
      return { ...state, questions: action.payload, status: 'ready' };
    case 'start':
      return {
        ...state,
        status: 'active',
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case 'dataFailed':
      return { ...state, status: 'error' };
    case 'newAnswer': {
      const updatedQuestions = state.questions.map((question, index) =>
        index === state.index
          ? { ...question, answer: action.payload }
          : question
      );

      const question = updatedQuestions[state.index];

      return {
        ...state,
        questions: updatedQuestions,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
        answer: action.payload,
      };
    }
    case 'nextQuestion':
      return { ...state, index: state.index + 1, answer: null };
    case 'finished':
      return {
        ...state,
        status: 'finished',
        HighScore:
          state.points > state.HighScore ? state.points : state.HighScore,
      };
    case 'restarting':
      return { ...initialState, questions: state.questions, status: 'ready' };
    case 'tick': {
      const newSecondsRemaining = state.secondsRemaining - 1;
      return {
        ...state,
        secondsRemaining: newSecondsRemaining,
        status: newSecondsRemaining === 0 ? 'finished' : state.status,
      };
    }
    case 'ReviewAnswers':
      return { ...state, status: 'review' };
    default:
      throw new Error('Action unknown');
  }
}

const QuizContext = createContext();

function QuizProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const numQuestion = state.questions?.length || 0;
  const maxPossiblePoints = state.questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );

  useEffect(() => {
    fetch(`http://localhost:000/questions`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => {
        dispatch({ type: 'dataReceived', payload: data });
      })
      .catch((err) => dispatch({ type: 'dataFailed', payload: err }));
  }, []);

  return (
    <QuizContext.Provider
      value={{
        state,
        dispatch,
        numQuestion,
        maxPossiblePoints,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined)
    throw new Error('QuizContext was used outside the QuizProvider');
  return context;
}

export { QuizProvider, useQuiz };
