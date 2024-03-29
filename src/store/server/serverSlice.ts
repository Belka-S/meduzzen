import * as TNK from 'store/server/serverThunks';

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
const handleCheckStatusSuccess = (
  state: TCommonInitialState,
  action: PayloadAction<{ result: string }>,
) => ({ ...state, status: action.payload.result });

const handleGetLogsSuccess = (
  state: TCommonInitialState,
  action: PayloadAction<{ result: string }>,
) => ({ ...state, logs: action.payload.result });

const handlePingSuccess = (
  state: TCommonInitialState,
  action: PayloadAction<{
    result: {
      loc: [string, 0];
      msg: string;
      type: string;
    };
  }>,
) => ({ ...state, ping: action.payload.result });

// server
const commonSlice = createSlice({
  name: 'common',
  initialState: commonInitialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(TNK.checkStatusThunk.fulfilled, handleCheckStatusSuccess)
      .addCase(TNK.getLogsThunk.fulfilled, handleGetLogsSuccess)
      .addCase(TNK.pingThunk.fulfilled, handlePingSuccess);
  },
});

// loading slice
const loadingSlice = createSlice({
  name: 'loading',
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
const errorSlice = createSlice({
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
  loading: loadingSlice.reducer,
  error: errorSlice.reducer,
});
