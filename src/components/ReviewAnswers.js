 
import useQuizState from "../hook/useQuizState";

function ReviewAnswers() {
  const {state , dispatch} = useQuizState();
    return (
      <div className="review-answers">
        <h2>Review Your Answers</h2>
        <p>You scored {state.points} points.</p>
        <ul>
          {state.questions.map((question, index) => (
            <li key={index} className="review-item">
              <h3>Question {index + 1}: {question.question}</h3>
              <p>
                <strong>Your Answer:</strong>{" "}
                {question.options[question.answer]}
              </p>
              <p>
                <strong>Correct Answer:</strong>{" "}
                {question.options[question.correctOption]}
              </p>
              <p>
                <strong>Result:</strong>{" "}
                {question.answer === question.correctOption ? (
                  <span style={{ color: "green" }}>Correct</span>
                ) : (
                  <span style={{ color: "red" }}>Incorrect</span>
                )}
              </p>
            </li>
          ))}
        </ul>
        <button className="btn" onClick={() => dispatch({ type: "restarting" })}>
          Restart Quiz
        </button>
      </div>
    );
  }
  
  export default ReviewAnswers;
  