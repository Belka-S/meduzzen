import { TRootState } from 'store';

export const selectQuiz = (state: TRootState) => state.quizzes.quiz;
export const selectResult = (state: TRootState) => state.quizzes.result;

export const selectLoading = (state: TRootState) => state.users.loading;
export const selectError = (state: TRootState) => state.users.error;
