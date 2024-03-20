import * as API from 'api/userApi';
import { AxiosError } from 'axios';
import { createAppAsyncThunk, TError } from 'store/types';

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
