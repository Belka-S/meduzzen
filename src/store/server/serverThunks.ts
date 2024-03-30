import * as API from 'api/commonApi';
import axios from 'axios';
import { createAppAsyncThunk } from 'store';

export const checkStatusThunk = createAppAsyncThunk(
  'common/check',
  async (_, thunkAPI) => {
    try {
      return await API.checkStatus();
    } catch (error) {
      if (!axios.isAxiosError(error)) throw error;
      toast.error(error.message);
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);

export const getLogsThunk = createAppAsyncThunk(
  'common/logs',
  async (_, thunkAPI) => {
    try {
      return await API.getLogs();
    } catch (error) {
      if (!axios.isAxiosError(error)) throw error;
      toast.error(error.message);
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);

export const pingThunk = createAppAsyncThunk(
  'common/ping',
  async (val: string, thunkAPI) => {
    try {
      return await API.ping(val);
    } catch (error) {
      if (!axios.isAxiosError(error)) throw error;
      toast.error(error.message);
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);
