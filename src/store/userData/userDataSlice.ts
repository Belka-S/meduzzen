import { toast } from 'react-toastify';
import { TAnswers, TCompanyOfList, TNotification } from 'store';
import { TQuizPass, TRatingAnalytic } from 'store';
import { initialState, TInitialState } from 'store/userData/initialState';
import * as TNK from 'store/userData/userDataThunks';

import { createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit';

const thunkArr = [
  TNK.getCompaniesListThunk,
  TNK.getAnalyticThunk,
  TNK.getRatingThunk,
  TNK.getInvitesListThunk,
  TNK.getLastAnswersCsvThunk,
  TNK.getLastAnswersListThunk,
  TNK.getNotificationsThunk,
  TNK.getQuizzesPassThunk,
  TNK.getAnalyticForQuizThunk,
  TNK.getAnalyticInCompanyThunk,
  TNK.getRatingForQuizThunk,
  TNK.getRatingInCompanyThunk,
  TNK.getUserRequestsListThunk,
  TNK.markNotificationAsReadThunk,
];

// handlers
type TState = 'pending' | 'fulfilled' | 'rejected';
const fn = (state: TState) => thunkArr.map(el => el[state]);

const handleSuccess = () => {
  toast.success('Succeed');
};

const handleCompaniesSuccess = (
  state: TInitialState,
  action: PayloadAction<{ result: { companies: TCompanyOfList[] } }>,
) => {
  state.myCompanies = action.payload.result.companies;
};

const handleInvitesSuccess = (
  state: TInitialState,
  action: PayloadAction<{ result: { companies: TCompanyOfList[] } }>,
) => {
  state.invites = action.payload.result.companies;
};

const handleRequestsSuccess = (
  state: TInitialState,
  action: PayloadAction<{ result: { companies: TCompanyOfList[] } }>,
) => {
  state.requests = action.payload.result.companies;
};

const handleRatingSuccess = (
  state: TInitialState,
  action: PayloadAction<{ result: { rating: number } }>,
) => {
  state.rating = action.payload.result.rating;
};

const handleAnalyticSuccess = (
  state: TInitialState,
  action: PayloadAction<{ result: { rating: TRatingAnalytic[] } }>,
) => {
  state.analytic = action.payload.result.rating;
};

const handleRatingInCompanySs = (
  state: TInitialState,
  action: PayloadAction<{ result: { rating: number } }>,
) => {
  state.ratingInCompany = action.payload.result.rating;
};

const handleAnalytInCompanySs = (
  state: TInitialState,
  action: PayloadAction<{ result: { rating: TRatingAnalytic[] } }>,
) => {
  state.analyticInCompany = action.payload.result.rating;
};

const handleRatingForQuizSs = (
  state: TInitialState,
  action: PayloadAction<{ result: { rating: number } }>,
) => {
  state.ratingForQuiz = action.payload.result.rating;
};

const handleAnalyticForQuizSs = (
  state: TInitialState,
  action: PayloadAction<{ result: { rating: TRatingAnalytic[] } }>,
) => {
  state.analyticForQuiz = action.payload.result.rating;
};

const handleAnswersSuccess = (
  state: TInitialState,
  action: PayloadAction<{ result: { answers: TAnswers[] } }>,
) => {
  state.answers = action.payload.result.answers;
};

const handleQuizPassSuccess = (
  state: TInitialState,
  action: PayloadAction<{ result: { quizzes: TQuizPass[] } }>,
) => {
  state.quizzesPass = action.payload.result.quizzes;
};

const handleNotificationSuccess = (
  state: TInitialState,
  action: PayloadAction<{ result: { notifications: TNotification[] } }>,
) => {
  state.notifications = action.payload.result.notifications;
};

const handleMarkNoteSuccess = (
  state: TInitialState,
  action: PayloadAction<{ result: { notification_id: number } }>,
) => {
  state.readNoteId = action.payload.result.notification_id;
};

// slice
const userDataSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // success
      .addCase(TNK.getCompaniesListThunk.fulfilled, handleCompaniesSuccess)
      .addCase(TNK.getInvitesListThunk.fulfilled, handleInvitesSuccess)
      .addCase(TNK.getUserRequestsListThunk.fulfilled, handleRequestsSuccess)
      .addCase(TNK.getRatingThunk.fulfilled, handleRatingSuccess)
      .addCase(TNK.getAnalyticThunk.fulfilled, handleAnalyticSuccess)
      .addCase(TNK.getRatingInCompanyThunk.fulfilled, handleRatingInCompanySs)
      .addCase(TNK.getAnalyticInCompanyThunk.fulfilled, handleAnalytInCompanySs)
      .addCase(TNK.getRatingForQuizThunk.fulfilled, handleRatingForQuizSs)
      .addCase(TNK.getAnalyticForQuizThunk.fulfilled, handleAnalyticForQuizSs)
      .addCase(TNK.getLastAnswersListThunk.fulfilled, handleAnswersSuccess)
      .addCase(TNK.getLastAnswersCsvThunk.fulfilled, handleSuccess)
      .addCase(TNK.getQuizzesPassThunk.fulfilled, handleQuizPassSuccess)
      .addCase(TNK.getNotificationsThunk.fulfilled, handleNotificationSuccess)
      .addCase(TNK.markNotificationAsReadThunk.fulfilled, handleMarkNoteSuccess)
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

export const userDataReducer = userDataSlice.reducer;
