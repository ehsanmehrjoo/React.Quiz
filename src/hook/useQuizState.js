import { useQuiz } from "../Context/QuizContext";

function useQuizState(){
    const {  state, dispatch, numQuestion, maxPossiblePoints} = useQuiz()
    return {state, dispatch, numQuestion, maxPossiblePoints}
}
export default useQuizState;