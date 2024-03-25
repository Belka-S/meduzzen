import { useDispatch, useSelector, useStore } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import type { TAppDispatch, TAppStore, TRootState } from 'store';

import { createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export const useAppSelector = useSelector.withTypes<TRootState>();
export const useAppStore = useStore.withTypes<TAppStore>();
// for reducers
export const useAppDispatch = useDispatch.withTypes<TAppDispatch>();
// for extraReducers
type TDispatch<T> = ThunkDispatch<T, never, PayloadAction>;
export const useAppExtraDispatch = () => useDispatch<TDispatch<TRootState>>();

type TThunk = {
  state: TRootState;
  dispatch: TAppDispatch;
  rejectValue: Error;
  extra: { s: string; n: number };
};
export const createAppAsyncThunk = createAsyncThunk.withTypes<TThunk>();
