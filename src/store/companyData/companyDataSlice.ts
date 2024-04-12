import { toast } from 'react-toastify';
import { TAnswers, TQuiz, TRating, TRatingAnalytic, TUserOfList } from 'store';
import { TUsersWithQuizzesPassed } from 'store';
import * as TNK from 'store/companyData/companyDataThunks';
import { initialState, TInitialState } from 'store/companyData/initialState';

import { createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit';

const thunkArr = [
  TNK.getBlockedListThunk,
  TNK.getInvitesListThunk,
  TNK.getAnswersCsvCompanyThunk,
  TNK.getAnswersCsvQuizInCompanyThunk,
  TNK.getAnswersCsvUserInCompanyThunk,
  TNK.getAnswersCompanyThunk,
  TNK.getAnswersQuizInCompanyThunk,
  TNK.getAnswersUserInCompanyThunk,
  TNK.getMembersListThunk,
  TNK.getQuizzesPassInCompanyThunk,
  TNK.getQuizzesListThunk,
  TNK.getCompanyRequestsListThunk,
  TNK.getAnalyticQuizThunk,
  TNK.getAnalyticUserThunk,
  TNK.getAnalyticUsersThunk,
  TNK.getRatingQuizThunk,
  TNK.getRatingUserThunk,
  TNK.getRatingUsersThunk,
];

type TState = 'pending' | 'fulfilled' | 'rejected';
const fn = (state: TState) => thunkArr.map(el => el[state]);

// handlers
const handleSuccess = () => {
  toast.success('Succeed');
};

const handleMembersListSuccess = (
  state: TInitialState,
  action: PayloadAction<{ result: { users: TUserOfList[] } }>,
) => ({ ...state, members: action.payload.result.users });

const handleInvitesListSuccess = (
  state: TInitialState,
  action: PayloadAction<{ result: { users: TUserOfList[] } }>,
) => {
  state.invites = action.payload.result.users;
};

const handleRequestsListSuccess = (
  state: TInitialState,
  action: PayloadAction<{ result: { users: TUserOfList[] } }>,
) => {
  state.requests = action.payload.result.users;
};

const handleBlockedListSuccess = (
  state: TInitialState,
  action: PayloadAction<{ result: { users: TUserOfList[] } }>,
) => {
  state.blocked = action.payload.result.users;
};

const handleQuizzesListSuccess = (
  state: TInitialState,
  action: PayloadAction<{ result: { quizzes: TQuiz[] } }>,
) => {
  state.quizzes = action.payload.result.quizzes;
};

const handleAnswersCompanySs = (
  state: TInitialState,
  action: PayloadAction<{ result: { answers: TAnswers[] } }>,
) => {
  state.answersCompany = action.payload.result.answers;
};

const handleAnswersUserSs = (
  state: TInitialState,
  action: PayloadAction<{ result: { answers: TAnswers[] } }>,
) => {
  state.answersUser = action.payload.result.answers;
};

const handleAnswersQuizSs = (
  state: TInitialState,
  action: PayloadAction<{ result: { answers: TAnswers[] } }>,
) => {
  state.answersQuiz = action.payload.result.answers;
};

const handleRatingUsersSuccess = (
  state: TInitialState,
  action: PayloadAction<{ result: { rating: TRating[] } }>,
) => {
  state.ratingUsers = action.payload.result.rating;
};

const handleRatingUserSuccess = (
  state: TInitialState,
  action: PayloadAction<{ result: { rating: TRating[] } }>,
) => {
  state.ratingUser = action.payload.result.rating;
};

const handleRatingQuizSuccess = (
  state: TInitialState,
  action: PayloadAction<{ result: { rating: TRating[] } }>,
) => {
  state.ratingQuiz = action.payload.result.rating;
};

const handleAnalyticUsersSuccess = (
  state: TInitialState,
  action: PayloadAction<{
    result: { rating: Array<{ rating: TRatingAnalytic[]; user_id: number }> };
  }>,
) => {
  state.analyticUsers = action.payload.result.rating;
};

const handleAnalyticUserSuccess = (
  state: TInitialState,
  action: PayloadAction<{ result: { rating: TRatingAnalytic[] } }>,
) => {
  state.analyticUser = action.payload.result.rating;
};

const handleAnalyticQuizSuccess = (
  state: TInitialState,
  action: PayloadAction<{ result: { rating: TRatingAnalytic[] } }>,
) => {
  state.analyticQuiz = action.payload.result.rating;
};

const handleQuizzesPassSs = (
  state: TInitialState,
  action: PayloadAction<{ result: { users: TUsersWithQuizzesPassed[] } }>,
) => {
  state.quizzesPassed = action.payload.result.users;
};

// slice
const companyDataSlice = createSlice({
  name: 'companyData',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // success
      .addCase(TNK.getMembersListThunk.fulfilled, handleMembersListSuccess)
      .addCase(TNK.getInvitesListThunk.fulfilled, handleInvitesListSuccess)
      .addCase(
        TNK.getCompanyRequestsListThunk.fulfilled,
        handleRequestsListSuccess,
      )
      .addCase(TNK.getBlockedListThunk.fulfilled, handleBlockedListSuccess)
      .addCase(TNK.getQuizzesListThunk.fulfilled, handleQuizzesListSuccess)
      .addCase(TNK.getAnswersCompanyThunk.fulfilled, handleAnswersCompanySs)
      .addCase(TNK.getAnswersCsvCompanyThunk.fulfilled, handleSuccess)
      .addCase(TNK.getAnswersUserInCompanyThunk.fulfilled, handleAnswersUserSs)
      .addCase(TNK.getAnswersCsvUserInCompanyThunk.fulfilled, handleSuccess)
      .addCase(TNK.getAnswersQuizInCompanyThunk.fulfilled, handleAnswersQuizSs)
      .addCase(TNK.getAnswersCsvQuizInCompanyThunk.fulfilled, handleSuccess)
      .addCase(TNK.getRatingUsersThunk.fulfilled, handleRatingUsersSuccess)
      .addCase(TNK.getRatingUserThunk.fulfilled, handleRatingUserSuccess)
      .addCase(TNK.getRatingQuizThunk.fulfilled, handleRatingQuizSuccess)
      .addCase(TNK.getAnalyticUsersThunk.fulfilled, handleAnalyticUsersSuccess)
      .addCase(TNK.getAnalyticUserThunk.fulfilled, handleAnalyticUserSuccess)
      .addCase(TNK.getAnalyticQuizThunk.fulfilled, handleAnalyticQuizSuccess)
      .addCase(TNK.getQuizzesPassInCompanyThunk.fulfilled, handleQuizzesPassSs)
      // loading, error
      .addMatcher(isAnyOf(...fn('pending')), state => {
        return { ...state, loading: true, error: false };
      })
      .addMatcher(isAnyOf(...fn('fulfilled')), state => {
        return { ...state, loading: false, error: false };
      })
      .addMatcher(isAnyOf(...fn('rejected')), (state, action) => {
        return { ...state, loading: false, error: action.payload };
      });
  },
});

export const companyDataReducer = companyDataSlice.reducer;
