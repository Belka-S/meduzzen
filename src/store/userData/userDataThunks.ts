import * as API from 'api/userDataApi';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
  createAppAsyncThunk,
  store,
  TActionParams,
  TNotificationParams,
  TQuizUserParams,
  TUser,
} from 'store';

export const getCompaniesListThunk = createAppAsyncThunk(
  'userData/CompaniesList',
  async (params: Pick<TUser, 'user_id'>, thunkAPI) => {
    const { access_token } = store.getState().auth.token;
    try {
      return await API.getCompaniesList(access_token, params);
    } catch (error) {
      if (!axios.isAxiosError(error)) throw error;
      toast.error(error.message);
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);

export const getIvitesListThunk = createAppAsyncThunk(
  'userData/IvitesList',
  async (params: Pick<TUser, 'user_id'>, thunkAPI) => {
    const { access_token } = store.getState().auth.token;
    try {
      return await API.getIvitesList(access_token, params);
    } catch (error) {
      if (!axios.isAxiosError(error)) throw error;
      toast.error(error.message);
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);

export const getRequestsListThunk = createAppAsyncThunk(
  'userData/RequestsList',
  async (params: Pick<TUser, 'user_id'>, thunkAPI) => {
    const { access_token } = store.getState().auth.token;
    try {
      return await API.getRequestsList(access_token, params);
    } catch (error) {
      if (!axios.isAxiosError(error)) throw error;
      toast.error(error.message);
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);

export const getRatingThunk = createAppAsyncThunk(
  'userData/GlobalRating',
  async (params: Pick<TUser, 'user_id'>, thunkAPI) => {
    const { access_token } = store.getState().auth.token;
    try {
      return await API.getGlobalRating(access_token, params);
    } catch (error) {
      if (!axios.isAxiosError(error)) throw error;
      toast.error(error.message);
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);

export const getAnalyticThunk = createAppAsyncThunk(
  'userData/GlobalRatingAnalytic',
  async (params: Pick<TUser, 'user_id'>, thunkAPI) => {
    const { access_token } = store.getState().auth.token;
    try {
      return await API.getGlobalRatingAnalytic(access_token, params);
    } catch (error) {
      if (!axios.isAxiosError(error)) throw error;
      toast.error(error.message);
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);

export const getRatingInCompanyThunk = createAppAsyncThunk(
  'userData/RatingInCompany',
  async (params: TActionParams, thunkAPI) => {
    const { access_token } = store.getState().auth.token;
    try {
      return await API.getRatingInCompany(access_token, params);
    } catch (error) {
      if (!axios.isAxiosError(error)) throw error;
      toast.error(error.message);
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);

export const getAnalyticInCompanyThunk = createAppAsyncThunk(
  'userData/RatingAnalyticInCompany',
  async (params: TActionParams, thunkAPI) => {
    const { access_token } = store.getState().auth.token;
    try {
      return await API.getRatingAnalyticInCompany(access_token, params);
    } catch (error) {
      if (!axios.isAxiosError(error)) throw error;
      toast.error(error.message);
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);

export const getRatingForQuizThunk = createAppAsyncThunk(
  'userData/RatingForQuiz',
  async (params: TQuizUserParams, thunkAPI) => {
    const { access_token } = store.getState().auth.token;
    try {
      return await API.getRatingForQuiz(access_token, params);
    } catch (error) {
      if (!axios.isAxiosError(error)) throw error;
      toast.error(error.message);
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);

export const getAnalyticForQuizThunk = createAppAsyncThunk(
  'userData/RatingAnalyticForQuiz ',
  async (params: TQuizUserParams, thunkAPI) => {
    const { access_token } = store.getState().auth.token;
    try {
      return await API.getRatingAnalyticForQuiz(access_token, params);
    } catch (error) {
      if (!axios.isAxiosError(error)) throw error;
      toast.error(error.message);
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);

export const getLastAnswersListThunk = createAppAsyncThunk(
  'userData/LastAnswersList',
  async (params: Pick<TUser, 'user_id'>, thunkAPI) => {
    const { access_token } = store.getState().auth.token;
    try {
      return await API.getLastAnswersList(access_token, params);
    } catch (error) {
      if (!axios.isAxiosError(error)) throw error;
      toast.error(error.message);
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);

export const getLastAnswersCsvThunk = createAppAsyncThunk(
  'userData/LastAnswersCsv',
  async (params: Pick<TUser, 'user_id'>, thunkAPI) => {
    const { access_token } = store.getState().auth.token;
    try {
      return await API.getLastAnswersCsv(access_token, params);
    } catch (error) {
      if (!axios.isAxiosError(error)) throw error;
      toast.error(error.message);
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);

export const getQuizzesPassThunk = createAppAsyncThunk(
  'userData/QuizzesLastPass',
  async (params: Pick<TUser, 'user_id'>, thunkAPI) => {
    const { access_token } = store.getState().auth.token;
    try {
      return await API.getQuizzesLastPass(access_token, params);
    } catch (error) {
      if (!axios.isAxiosError(error)) throw error;
      toast.error(error.message);
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);

export const getNotificationsThunk = createAppAsyncThunk(
  'userData/NotificationsList',
  async (params: Pick<TUser, 'user_id'>, thunkAPI) => {
    const { access_token } = store.getState().auth.token;
    try {
      return await API.getNotificationsList(access_token, params);
    } catch (error) {
      if (!axios.isAxiosError(error)) throw error;
      toast.error(error.message);
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);

export const markNotificationAsReadThunk = createAppAsyncThunk(
  'userData/NotificationAsRead',
  async (params: TNotificationParams, thunkAPI) => {
    const { access_token } = store.getState().auth.token;
    try {
      return await API.markNotificationAsRead(access_token, params);
    } catch (error) {
      if (!axios.isAxiosError(error)) throw error;
      toast.error(error.message);
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);
