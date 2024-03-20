import * as API from 'api/userApi';
import { AxiosError } from 'axios';
import { TAppDispatch, TRootState } from 'store';

import { createAsyncThunk } from '@reduxjs/toolkit';

export type TError = {
  message: string;
  description: string;
  code: number | undefined;
};

const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: TRootState;
  dispatch: TAppDispatch;
  rejectValue: TError;
  extra: { s: string; n: number };
}>();

// auth
export const registerThunk = createAppAsyncThunk(
  'auth/register',
  async (credentials: API.TCredentials, thunkAPI) => {
    try {
      return await API.register(credentials);
    } catch (error) {
      const err = error as AxiosError<TError>;
      if (!err.response) {
        throw error;
      }
      return thunkAPI.rejectWithValue(err.response.data);
    }
  },
);

export const loginThunk = createAppAsyncThunk(
  'auth/login',
  async (credentials: API.TCredentials, thunkAPI) => {
    try {
      return await API.login(credentials);
    } catch (error) {
      const err = error as AxiosError<TError>;
      if (!err.response) {
        throw error;
      }
      return thunkAPI.rejectWithValue(err.response.data);
    }
  },
);
