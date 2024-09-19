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
import useQuizState from "../hook/useQuizState";

 

export default function App() {
 
  const { state } = useQuizState();
  return (
    <div className="app">
      <Header />
      <Main>
        {state.status === "loading" && <Loader />}
        {state.status === "error" && <Error />}
        {state.status === "ready" && (
          <Starscreen   />
        )}
        {state.status === "active" && state.questions.length > 0 && (
          <>
            <Progress />
            <Question />
            <Footer>
              <Timer />
              <NextButton />
            </Footer>
          </>
        )}
        {state.status === "finished" && (
          <FinisheScreen
          
          />
        )}
        {state.status === "review" && (
          <ReviewAnswers />
        )}
      </Main>
    </div>
  );
}
