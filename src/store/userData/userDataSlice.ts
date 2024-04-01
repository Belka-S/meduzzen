import { toast } from 'react-toastify';
import {
  TAnswers,
  TMyCompanyFromList,
  TNotification,
  TQuizPass,
  TRatingAnalytic,
} from 'store';
import { initialState, TInitialState } from 'store/userData/initialState';
import * as TNK from 'store/userData/userDataThunks';

import { createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit';

const thunkArr = [
  TNK.getCompaniesListThunk,
  TNK.getAnalyticThunk,
  TNK.getRatingThunk,
  TNK.getIvitesListThunk,
  TNK.getLastAnswersCsvThunk,
  TNK.getLastAnswersListThunk,
  TNK.getNotificationsThunk,
  TNK.getQuizzesPassThunk,
  TNK.getAnalyticForQuizThunk,
  TNK.getAnalyticInCompanyThunk,
  TNK.getRatingForQuizThunk,
  TNK.getRatingInCompanyThunk,
  TNK.getRequestsListThunk,
  TNK.markNotificationAsReadThunk,
];

// handlers
const fn = (type: 'pending' | 'fulfilled' | 'rejected') =>
  thunkArr.map(el => {
    if (type === 'pending') return el.pending;
    if (type === 'fulfilled') return el.fulfilled;
    else return el.rejected;
  });

const handleSuccess = () => {
  toast.success('Succeed');
};

const handleCompaniesSuccess = (
  state: TInitialState,
  action: PayloadAction<{ result: { companies: TMyCompanyFromList[] } }>,
) => ({ ...state, myCompanies: action.payload.result.companies });

const handleInvitesSuccess = (
  state: TInitialState,
  action: PayloadAction<{ result: { companies: TMyCompanyFromList[] } }>,
) => ({ ...state, invites: action.payload.result.companies });

const handleRequestsSuccess = (
  state: TInitialState,
  action: PayloadAction<{ result: { companies: TMyCompanyFromList[] } }>,
) => ({ ...state, requests: action.payload.result.companies });

const handleRatingSuccess = (
  state: TInitialState,
  action: PayloadAction<{ result: { rating: number } }>,
) => ({ ...state, rating: action.payload.result.rating });

const handleAnalyticSuccess = (
  state: TInitialState,
  action: PayloadAction<{ result: { rating: TRatingAnalytic[] } }>,
) => ({ ...state, analytic: action.payload.result.rating });

const handleRatingInCompanySs = (
  state: TInitialState,
  action: PayloadAction<{ result: { rating: number } }>,
) => ({ ...state, ratingInCompany: action.payload.result.rating });

const handleAnalytInCompanySs = (
  state: TInitialState,
  action: PayloadAction<{ result: { rating: TRatingAnalytic[] } }>,
) => ({ ...state, analyticInCompany: action.payload.result.rating });

const handleRatingForQuizSs = (
  state: TInitialState,
  action: PayloadAction<{ result: { rating: number } }>,
) => ({ ...state, ratingForQuiz: action.payload.result.rating });

const handleAnalyticForQuizSs = (
  state: TInitialState,
  action: PayloadAction<{ result: { rating: TRatingAnalytic[] } }>,
) => ({ ...state, analyticForQuiz: action.payload.result.rating });

const handleAnswersSuccess = (
  state: TInitialState,
  action: PayloadAction<{ result: { answers: TAnswers[] } }>,
) => ({ ...state, answers: action.payload.result.answers });

const handleQuizPassSuccess = (
  state: TInitialState,
  action: PayloadAction<{ result: { quizzes: TQuizPass[] } }>,
) => ({ ...state, quizzesPass: action.payload.result.quizzes });

const handleNotificationSuccess = (
  state: TInitialState,
  action: PayloadAction<{ result: { notifications: TNotification[] } }>,
) => ({ ...state, notifications: action.payload.result.notifications });

const handleMarkNoteSuccess = (
  state: TInitialState,
  action: PayloadAction<{ result: { notification_id: number } }>,
) => ({ ...state, readNoteId: action.payload.result.notification_id });

// slice
const userDataSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // success
      .addCase(TNK.getCompaniesListThunk.fulfilled, handleCompaniesSuccess)
      .addCase(TNK.getIvitesListThunk.fulfilled, handleInvitesSuccess)
      .addCase(TNK.getRequestsListThunk.fulfilled, handleRequestsSuccess)
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
        return { ...state, loading: true, error: true };
      })
      .addMatcher(isAnyOf(...fn('rejected')), (state, action) => {
        return { ...state, loading: false, error: action.payload };
      });
  },
});

export const userDataReducer = userDataSlice.reducer;
