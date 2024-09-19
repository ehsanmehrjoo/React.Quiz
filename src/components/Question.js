import { useQuiz } from "../Context/QuizContext";
import Options from "./options";

function Question() {
  const { state, dispatch } = useQuiz();
  
  // گرفتن سوال فعلی
  const currentQuestion = state.questions[state.index];
  
  // بررسی اگر سوال موجود نباشد
  if (!currentQuestion) {
    return <div>Loading question...</div>;
  }

  return (
    <div>
      {/* نمایش سوال */}
      <h4>{currentQuestion.question}</h4>

      {/* کامپوننت گزینه‌ها */}
      <Options
        question={currentQuestion}
        dispatch={dispatch}
        answer={state.answer}
      />
    </div>
  );
}

export default Question;
