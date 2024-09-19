 
import useQuizState from "../hook/useQuizState";


 function NextButton ()  {
  const {state ,dispatch , numQuestion} = useQuizState();

    if(state.answer === null )return null
 if(state.index < numQuestion -1) return (
    <button className="btn btn-ui" type="button" onClick={() => dispatch({type: "nextQuestion"})}>Next</button>
  );
  if(state.index === numQuestion -1) return (
    <button className="btn btn-ui" type="button" onClick={() => dispatch({type: "finished"})}>Finish</button>
  );
};

export default NextButton;