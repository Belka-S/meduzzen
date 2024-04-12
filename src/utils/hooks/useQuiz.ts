import { useAppSelector } from 'store';
import * as selectors from 'store/quiz/quizSelectors';

export const useQuiz = () => {
  const quiz = useAppSelector(selectors.selectQuiz);
  const result = useAppSelector(selectors.selectResult);

  const loading = useAppSelector(selectors.selectLoading);
  const error = useAppSelector(selectors.selectError);

  return {
    quiz,
    result,

    loading,
    error,
  };
};
