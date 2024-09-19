import { useQuiz } from "../Context/QuizContext";
import Options from "./options"
 function Question ( )  {
  const {state , dispatch} = useQuiz()
console.log(state.question);
  return (
    <div>
    <h4>{state.question.question}</h4>
    <Options question={state.question} dispatch={dispatch} answer={state.answer}/>
   
    </div>
  );
};

export default Question;