import { TQuizResult, TRootState } from 'store';

export const selectQuiz = (state: TRootState) => state.quizzes.quiz;
export const selectResult = (state: TRootState) =>
  state.quizzes.result as TQuizResult;

export const selectLoading = (state: TRootState) => state.users.loading;
export const selectError = (state: TRootState) => state.users.error;
