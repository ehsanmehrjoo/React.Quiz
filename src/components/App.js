import "./index.css";
import Header from "./Header";
import Main from "./Main";
import Loader  from "./Loader";
import Error from "./Error";
import Starscreen from "./Starscreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinisheScreen from "./FinisheScreen";
import { useEffect, useReducer } from "react";
const initalstate   = {
  questions : [],
  
   // 'loading', 'error', 'ready', 'active', 'finished'
   status: "loading", // corrected status
   index: 0,
   answer: null,
   points: 0,
   HighScore: 0,
}
function reducer(state, action) {
  switch (action.type) {
    case "dataReceives":
      return { ...state, questions: action.payload, status: "ready" };
    case "start":
      return { ...state, status: "active" };
    case "dataFailed":
      return { ...state, status: "error" }; // Corrected to "error"
    case "newAnswer": {
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    }
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finished":
      return {
        ...state,
        status: "finished",
        HighScore:
          state.points > state.HighScore ? state.points : state.HighScore,
      };
    case "restarting":
      return {...initalstate, questions  : state.questions , status: "ready" }
    default:
      throw new Error("Action unknown");
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initalstate);

  const numQuestion = state.questions?.length || 0;
  const maxPossiblePoints = state.questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );

  useEffect(() => {
    fetch(`http://localhost:8000/questions`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        dispatch({ type: "dataReceives", payload: data });
      })
      .catch((err) => dispatch({ type: "dataFailed", payload: err }));
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {state.status === "loading" && <Loader />}
        {state.status === "error" && <Error />}
        {state.status === "ready" && (
          <Starscreen numQuestion={numQuestion} dispatch={dispatch} />
        )}
        {state.status === "active" && state.questions.length > 0 && (
          <>
            <Progress
              index={state.index}
              numQuestion={numQuestion}
              points={state.points}
              maxPossiblePoints={maxPossiblePoints}
              answer={state.answer}
            />
            <Question
              question={state.questions[state.index]}
              dispatch={dispatch}
              answer={state.answer}
            />
            <NextButton
              dispatch={dispatch}
              answer={state.answer}
              numQuestion={numQuestion}
              index={state.index}
            />
          </>
        )}
        {state.status === "finished" && (
          <FinisheScreen
            dispatch={dispatch}
            HighScore={state.HighScore}
            points={state.points}
            maxPossiblePoints={maxPossiblePoints}
          />
        )}
      </Main>
    </div>
  );
}