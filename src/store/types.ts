
import { makeStore, rootReducer, store } from 'store';

import { createAsyncThunk } from '@reduxjs/toolkit';

export type TRootState = ReturnType<typeof rootReducer>; // without rootReducer -> TRootState = ReturnType<typeof store.getState>;
export type TAppStore = ReturnType<typeof makeStore>;
export type TAppDispatch = typeof store.dispatch;

export type TError = {
  message: string;
  description: string;
  code: number | undefined;
};

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: TRootState;
  dispatch: TAppDispatch;
  rejectValue: TError;
  extra: { s: string; n: number };
}>();
