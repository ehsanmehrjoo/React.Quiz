 
import useQuizState from "../hook/useQuizState";

 function Progress ()  {
  const {state , numQuestion , maxPossiblePoints} = useQuizState();
  return (
    <header className="progress">
    <progress max={numQuestion} value={state.index +  Number(state.answer !== null) }></progress>
    <p>Question <strong>{state.index + 1}</strong> /{numQuestion}</p>
    <p><strong>{state.points}</strong> / {maxPossiblePoints} points</p>
    </header>
  );
};

export default Progress;