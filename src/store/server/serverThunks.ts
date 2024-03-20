import * as API from 'api/commonApi';
import { AxiosError } from 'axios';
import { createAppAsyncThunk, TError } from 'store/types';

// common
export const checkStatusThunk = createAppAsyncThunk(
  'common/check',
  async (_, thunkAPI) => {
    try {
      return await API.checkStatus();
    } catch (error) {
      const err = error as AxiosError<TError>;
      if (!err.response) {
        throw error;
      }
      return thunkAPI.rejectWithValue(err.response.data);
    }
  },
);

export const getLogsThunk = createAppAsyncThunk(
  'common/logs',
  async (_, thunkAPI) => {
    try {
      return await API.getLogs();
    } catch (error) {
      const err = error as AxiosError<TError>;
      if (!err.response) {
        throw error;
      }
      return thunkAPI.rejectWithValue(err.response.data);
    }
  },
);

export const pingThunk = createAppAsyncThunk(
  'common/ping',
  async (val: string, thunkAPI) => {
    try {
      return await API.ping(val);
    } catch (error) {
      const err = error as AxiosError<TError>;
      if (!err.response) {
        throw error;
      }
      return thunkAPI.rejectWithValue(err.response.data);
    }
  },
);
