import { toast } from 'react-toastify';
import { TCommonResult, TQuiz } from 'store';
import { initialState, TInitialState } from 'store/quiz';
import * as TNK from 'store/quiz/quizThunks';

import { createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit';

const thunkArr = [
  TNK.addQuestionThunk,
  TNK.createQuizThunk,
  TNK.deleteQuestionThunk,
  TNK.deleteQuizThunk,
  TNK.getQuizThunk,
  TNK.takeQuizThunk,
  TNK.updateQuestionThunk,
  TNK.updateQuizThunk,
];

const fn = (type: 'pending' | 'fulfilled' | 'rejected') =>
  thunkArr.map(el => {
    if (type === 'pending') return el.pending;
    if (type === 'fulfilled') return el.fulfilled;
    else return el.rejected;
  });

// handlers
const handleResultSuccess = (
  state: TInitialState,
  action: PayloadAction<{
    result: TCommonResult;
    detail: string;
    status_code: number;
  }>,
) => {
  const { result, detail, status_code } = action.payload;
  status_code < 300 ? toast.success(detail) : toast.error(detail);
  state.result = result;
};

const handleGetQuizSuccess = (
  state: TInitialState,
  action: PayloadAction<TQuiz>,
) => {
  state.quiz = action.payload;
};

const handleTakeQuizSuccess = (
  state: TInitialState,
  action: PayloadAction<{ [key: string]: string }>,
) => {
  state.answers = action.payload;
};

// slice
const quizSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // quiz success
      .addCase(TNK.createQuizThunk.fulfilled, handleResultSuccess)
      .addCase(TNK.getQuizThunk.fulfilled, handleGetQuizSuccess)
      .addCase(TNK.deleteQuizThunk.fulfilled, handleResultSuccess)
      .addCase(TNK.takeQuizThunk.fulfilled, handleTakeQuizSuccess)
      // question success
      .addCase(TNK.addQuestionThunk.fulfilled, handleResultSuccess)
      .addCase(TNK.updateQuestionThunk.fulfilled, handleResultSuccess)
      .addCase(TNK.deleteQuestionThunk.fulfilled, handleResultSuccess)
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

export const quizReducer = quizSlice.reducer;

// export const {} = quizSlice.actions;
