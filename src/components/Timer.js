import { useEffect } from "react";
import { useQuiz } from "../Context/QuizContext";

 function Timer ()  {
  const {state , dispatch} = useQuiz();

const mins = Math.floor(state.secondsRemaining / 60);
const seconds = state.secondsRemaining % 60;

    useEffect(function(){
     const id = setInterval(function(){
            dispatch({type : "tick"})
        }, 1000)
        return () => clearInterval(id)
    }, [dispatch]);
  return (
    <div className="timer">
   {mins < 10 && "0"}
   {mins}
   :
   {seconds < 10 && "0"}
   {seconds}
    </div>
  );
};

export default Timer;