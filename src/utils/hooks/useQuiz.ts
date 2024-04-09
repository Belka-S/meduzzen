import { useAppSelector } from 'store';
import * as selectors from 'store/quiz/quizSelectors';

export const useAction = () => {
  const quizzes = useAppSelector(selectors.selectQuizzes);
  const quiz = useAppSelector(selectors.selectQuiz);
  const answers = useAppSelector(selectors.selectAnswers);

  const loading = useAppSelector(selectors.selectLoading);
  const error = useAppSelector(selectors.selectError);

  return {
    quizzes,
    quiz,
    answers,

    loading,
    error,
  };
};
