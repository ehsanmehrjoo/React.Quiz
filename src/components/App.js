import "./index.css";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import Starscreen from "./Starscreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinisheScreen from "./FinisheScreen";
import Timer from "./Timer";
import Footer from "./Footer";
import ReviewAnswers from "./ReviewAnswers";
import { useQuiz } from "../Context/QuizContext";

// const SECS_PER_QUESTION = 30;
// const initialState = {
//   questions: [],
//   status: "loading",
//   index: 0,
//   answer: null,
//   points: 0,
//   HighScore: 0,
//   secondsRemaining: null,
// };

// function reducer(state, action) {
//   switch (action.type) {
//     case "dataReceived":
//       return { ...state, questions: action.payload, status: "ready" };
//     case "start":
//       return {
//         ...state,
//         status: "active",
//         secondsRemaining: state.questions.length * SECS_PER_QUESTION,
//       };
//     case "dataFailed":
//       return { ...state, status: "error" };
//       case "newAnswer": {
//         const updatedQuestions = state.questions.map((question, index) =>
//           index === state.index
//             ? { ...question, answer: action.payload }  // ذخیره پاسخ در سوال فعلی
//             : question
//         );
      
//         const question = updatedQuestions[state.index];
        
//         return {
//           ...state,
//           questions: updatedQuestions,
//           points:
//             action.payload === question.correctOption
//               ? state.points + question.points
//               : state.points,
//           answer: action.payload,
//         };
//       }
      
//     case "nextQuestion":
//       return { ...state, index: state.index + 1, answer: null };
//     case "finished":
//       return {
//         ...state,
//         status: "finished",
//         HighScore:
//           state.points > state.HighScore ? state.points : state.HighScore,
//       };
//     case "restarting":
//       return { ...initialState, questions: state.questions, status: "ready" };
//     case "tick": {
//       const newSecondsRemaining = state.secondsRemaining - 1;
//       return {
//         ...state,
//         secondsRemaining: newSecondsRemaining,
//         status: newSecondsRemaining === 0 ? "finished" : state.status,
//       };
//     }
//     case "ReviewAnswers":
//       return { ...state, status: "review" }; // حالت جدید برای مرور پاسخ‌ها
//     default:
//       throw new Error("Action unknown");
//   }
// }

export default function App() {
  // const [state, dispatch] = useReducer(reducer, initialState);

  // const numQuestion = state.questions?.length || 0;
  // const maxPossiblePoints = state.questions.reduce(
  //   (prev, cur) => prev + cur.points,
  //   0
  // );

  // useEffect(() => {
  //   fetch(`http://localhost:000/questions`)
  //     .then((res) => {
  //       if (!res.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       return res.json();
  //     })
  //     .then((data) => {
  //       dispatch({ type: "dataReceived", payload: data });
  //     })
  //     .catch((err) => dispatch({ type: "dataFailed", payload: err }));
  // }, []);
  const { state,dispatch, numQuestion, maxPossiblePoints} = useQuiz();
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
            <Progress />
            <Question />
            <Footer>
              <Timer />
              <NextButton
                dispatch={dispatch}
                answer={state.answer}
                numQuestion={numQuestion}
                index={state.index}
              />
            </Footer>
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
        {state.status === "review" && (
          <ReviewAnswers
            questions={state.questions}
            dispatch={dispatch}
            points={state.points}
          />
        )}
      </Main>
    </div>
  );
}
