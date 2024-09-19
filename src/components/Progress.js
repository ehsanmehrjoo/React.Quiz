import { useQuiz } from "../Context/QuizContext";

 function Progress ()  {
  const {state} = useQuiz();
  return (
    <header className="progress">
    <progress max={state.numQuestion} value={state.index +  Number(state.answer !== null) }></progress>
    <p>Question <strong>{state.index + 1}</strong> /{state.numQuestion}</p>
    <p><strong>{state.points}</strong> / {state.maxPossiblePoints} points</p>
    </header>
  );
};

export default Progress;