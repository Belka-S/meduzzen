import * as TNK from 'store/common/commonThunks';

import {
  combineReducers,
  createSlice,
  isAnyOf,
  PayloadAction,
} from '@reduxjs/toolkit';

import { commonInitialState, TCommonInitialState } from './initialState';

const thunkArr = [TNK.checkStatusThunk, TNK.getLogsThunk, TNK.pingThunk];

const fn = (type: 'pending' | 'fulfilled' | 'rejected') =>
  thunkArr.map(el => {
    if (type === 'pending') return el.pending;
    if (type === 'fulfilled') return el.fulfilled;
    else return el.rejected;
  });

// fulfilled slice
const handleCheckStatusSucsess = (
  state: TCommonInitialState,
  action: PayloadAction<{ result: string }>,
) => ({ ...state, status: action.payload.result });

const handleGetLogsSucsess = (
  state: TCommonInitialState,
  action: PayloadAction<{ result: string }>,
) => ({ ...state, logs: action.payload.result });

const handlePingSucsess = (
  state: TCommonInitialState,
  action: PayloadAction<{
    result: {
      loc: [string, 0];
      msg: string;
      type: string;
    };
  }>,
) => ({ ...state, ping: action.payload.result });

const commonSlice = createSlice({
  name: 'common',
  initialState: commonInitialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(TNK.checkStatusThunk.fulfilled, handleCheckStatusSucsess)
      .addCase(TNK.getLogsThunk.fulfilled, handleGetLogsSucsess)
      .addCase(TNK.pingThunk.fulfilled, handlePingSucsess);
  },
});

// loading slice
const authIsLoadingSlice = createSlice({
  name: 'isLoading',
  initialState: false,
  reducers: {},
  extraReducers: builder => {
    builder
      .addMatcher(isAnyOf(...fn('pending')), () => true)
      .addMatcher(isAnyOf(...fn('fulfilled')), () => false)
      .addMatcher(isAnyOf(...fn('rejected')), () => false);
  },
});

// error slice
const authErrorSlice = createSlice({
  name: 'error',
  initialState: false,
  reducers: {},
  extraReducers: builder => {
    builder
      .addMatcher(isAnyOf(...fn('pending')), () => false)
      .addMatcher(isAnyOf(...fn('fulfilled')), () => false)
      .addMatcher(isAnyOf(...fn('rejected')), (_, action) => action.payload);
  },
});

export const commonReducer = combineReducers({
  server: commonSlice.reducer,
  isLoading: authIsLoadingSlice.reducer,
  error: authErrorSlice.reducer,
});
