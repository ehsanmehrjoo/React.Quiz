import { useQuiz } from "../Context/QuizContext";

function Options() {
  const { state, dispatch } = useQuiz();
  const currentQuestion = state.questions[state.index]; // سوال فعلی
  const hasAnswer = state.answer !== null;

  // بررسی وجود سوال و گزینه‌ها
  if (!currentQuestion || !currentQuestion.options) {
    return <div>Loading options...</div>;
  }

  return (
    <div className="options">
      {currentQuestion.options.map((option, index) => (
        <button
          className={`btn btn-option ${index === state.answer ? 'answer' : ''} ${hasAnswer ? index === currentQuestion.correctOption ? 'correct' : 'wrong' : ""}`}
          key={option}
          disabled={hasAnswer}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
