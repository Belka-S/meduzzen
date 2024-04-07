import * as API from 'api/userDataApi';
import axios from 'axios';
import { toast } from 'react-toastify';
import { createAppAsyncThunk, TActionParams } from 'store';
import { TNotificationParams, TQuizUserParams, TUser } from 'store';

export const getCompaniesListThunk = createAppAsyncThunk(
  'userData/CompaniesList',
  async (params: Pick<TUser, 'user_id'>, thunkAPI) => {
    try {
      return await API.getCompaniesList(params);
    } catch (error) {
      if (!axios.isAxiosError(error)) throw error;
      toast.error(error.message);
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);

export const getInvitesListThunk = createAppAsyncThunk(
  'userData/IvitesList',
  async (params: Pick<TUser, 'user_id'>, thunkAPI) => {
    try {
      return await API.getIvitesList(params);
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
    try {
      return await API.getRequestsList(params);
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
    try {
      return await API.getGlobalRating(params);
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
    try {
      return await API.getGlobalRatingAnalytic(params);
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
    try {
      return await API.getRatingInCompany(params);
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
    try {
      return await API.getRatingAnalyticInCompany(params);
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
    try {
      return await API.getRatingForQuiz(params);
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
    try {
      return await API.getRatingAnalyticForQuiz(params);
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
    try {
      return await API.getLastAnswersList(params);
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
    try {
      return await API.getLastAnswersCsv(params);
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
    try {
      return await API.getQuizzesLastPass(params);
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
    try {
      return await API.getNotificationsList(params);
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
    try {
      return await API.markNotificationAsRead(params);
    } catch (error) {
      if (!axios.isAxiosError(error)) throw error;
      toast.error(error.message);
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);
