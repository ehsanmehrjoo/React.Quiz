 
import useQuizState from "../hook/useQuizState";

 function FinisheScreen ()  {
  const {maxPossiblePoints , state , dispatch} = useQuizState();
    const percentage = (state.points / maxPossiblePoints) * 100;
  return (
    <>
    <p className="result">
    🤔You scored <strong>{state.points}</strong> out of {maxPossiblePoints} ({Math.ceil(percentage)}%)
    </p>
    <p className="highscore">(Highscore: {state.HighScore} points)</p>

    <button className="btn btn-ui" type="button" onClick={() => dispatch({type: "restarting"})}>Restart quiz </button>
    <button className="btn " type="button" onClick={() => dispatch({type: "ReviewAnswers"})}>Review the answers </button>
    </>
    
  );
};

export default FinisheScreen;