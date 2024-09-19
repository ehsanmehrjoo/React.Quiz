
 function FinisheScreen ({points, maxPossiblePoints , HighScore , dispatch})  {
  con
    const percentage = (points / maxPossiblePoints) * 100;
  return (
    <>
    <p className="result">
    🤔You scored <strong>{points}</strong> out of {maxPossiblePoints} ({Math.ceil(percentage)}%)
    </p>
    <p className="highscore">(Highscore: {HighScore} points)</p>

    <button className="btn btn-ui" type="button" onClick={() => dispatch({type: "restarting"})}>Restart quiz </button>
    <button className="btn " type="button" onClick={() => dispatch({type: "ReviewAnswers"})}>Review the answers </button>
    </>
    
  );
};

export default FinisheScreen;