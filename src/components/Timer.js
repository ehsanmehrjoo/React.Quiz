import { useEffect } from "react";
import useQuizState from "../hook/useQuizState";

 function Timer ()  {
  const {state , dispatch} = useQuizState();

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