

 function NextButton ({dispatch, answer ,index ,numQuestion})  {
    if(answer === null )return null
 if(index < numQuestion ) return (
    <button className="btn btn-ui" type="button" onClick={() => dispatch({type: "nextQuestion"})}>Next</button>
  );
  if(index === numQuestion ) return (
    <button className="btn btn-ui" type="button" onClick={() => dispatch({type: "nextQuestion"})}>Next</button>
  );
};

export default NextButton;