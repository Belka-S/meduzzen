import * as API from 'api/companyDataApi';
import axios from 'axios';
import { toast } from 'react-toastify';
import { TActionParams, TCompany, TQuizCompanyParams } from 'store';
import { createAppAsyncThunk } from 'store';

export const getMembersListThunk = createAppAsyncThunk(
  'companyData/MembersList',
  async (params: Pick<TCompany, 'company_id'>, thunkAPI) => {
    try {
      return await API.getMembersList(params);
    } catch (error) {
      if (!axios.isAxiosError(error)) throw error;
      toast.error(error.message);
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);

export const getInvitesListThunk = createAppAsyncThunk(
  'companyData/InvitesList',
  async (params: Pick<TCompany, 'company_id'>, thunkAPI) => {
    try {
      return await API.getInvitesList(params);
    } catch (error) {
      if (!axios.isAxiosError(error)) throw error;
      toast.error(error.message);
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);

export const getRequestsListThunk = createAppAsyncThunk(
  'companyData/RequestsList',
  async (params: Pick<TCompany, 'company_id'>, thunkAPI) => {
    try {
      return await API.getRequestsList(params);
    } catch (error) {
      if (!axios.isAxiosError(error)) throw error;
      toast.error(error.message);
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);

export const getBlockedListThunk = createAppAsyncThunk(
  'companyData/BlockedList',
  async (params: Pick<TCompany, 'company_id'>, thunkAPI) => {
    try {
      return await API.getBlockedList(params);
    } catch (error) {
      if (!axios.isAxiosError(error)) throw error;
      toast.error(error.message);
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);

export const getQuizzesListThunk = createAppAsyncThunk(
  'companyData/QuizzesList',
  async (params: Pick<TCompany, 'company_id'>, thunkAPI) => {
    try {
      return await API.getQuizzesList(params);
    } catch (error) {
      if (!axios.isAxiosError(error)) throw error;
      toast.error(error.message);
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);

export const getAnswersCompanyThunk = createAppAsyncThunk(
  'companyData/AnswersListForCompany',
  async (params: Pick<TCompany, 'company_id'>, thunkAPI) => {
    try {
      return await API.getAnswersListForCompany(params);
    } catch (error) {
      if (!axios.isAxiosError(error)) throw error;
      toast.error(error.message);
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);

export const getAnswersCsvCompanyThunk = createAppAsyncThunk(
  'companyData/LastAnswersCsvForCompany',
  async (params: Pick<TCompany, 'company_id'>, thunkAPI) => {
    try {
      return await API.getLastAnswersCsvForCompany(params);
    } catch (error) {
      if (!axios.isAxiosError(error)) throw error;
      toast.error(error.message);
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);

export const getAnswersUserInCompanyThunk = createAppAsyncThunk(
  'companyData/LastAnswersListForUserInCompany',
  async (params: TActionParams, thunkAPI) => {
    try {
      return await API.getLastAnswersListForUserInCompany(params);
    } catch (error) {
      if (!axios.isAxiosError(error)) throw error;
      toast.error(error.message);
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);

export const getAnswersCsvUserInCompanyThunk = createAppAsyncThunk(
  'companyData/LastAnswersCsvForUserInCompany',
  async (params: TActionParams, thunkAPI) => {
    try {
      return await API.getLastAnswersCsvForUserInCompany(params);
    } catch (error) {
      if (!axios.isAxiosError(error)) throw error;
      toast.error(error.message);
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);

export const getAnswersQuizInCompanyThunk = createAppAsyncThunk(
  'companyData/LastAnswersListForQuizInCompany',
  async (params: TQuizCompanyParams, thunkAPI) => {
    try {
      return await API.getLastAnswersListForQuizInCompany(params);
    } catch (error) {
      if (!axios.isAxiosError(error)) throw error;
      toast.error(error.message);
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);

export const getAnswersCsvQuizInCompanyThunk = createAppAsyncThunk(
  'companyData/LastAnswersCsvForQuizInCompany',
  async (params: TQuizCompanyParams, thunkAPI) => {
    try {
      return await API.getLastAnswersCsvForQuizInCompany(params);
    } catch (error) {
      if (!axios.isAxiosError(error)) throw error;
      toast.error(error.message);
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);

export const getRatingUsersThunk = createAppAsyncThunk(
  'companyData/SummaryRatingForUsers',
  async (params: Pick<TCompany, 'company_id'>, thunkAPI) => {
    try {
      return await API.getSummaryRatingForUsers(params);
    } catch (error) {
      if (!axios.isAxiosError(error)) throw error;
      toast.error(error.message);
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);

export const getAnalyticUsersThunk = createAppAsyncThunk(
  'companyData/SummaryRatingAnalyticForUsers',
  async (params: Pick<TCompany, 'company_id'>, thunkAPI) => {
    try {
      return await API.getSummaryRatingAnalyticForUsers(params);
    } catch (error) {
      if (!axios.isAxiosError(error)) throw error;
      toast.error(error.message);
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);

export const getRatingUserThunk = createAppAsyncThunk(
  'companyData/SummaryRatingForUser',
  async (params: TActionParams, thunkAPI) => {
    try {
      return await API.getSummaryRatingForUser(params);
    } catch (error) {
      if (!axios.isAxiosError(error)) throw error;
      toast.error(error.message);
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);

export const getAnalyticUserThunk = createAppAsyncThunk(
  'companyData/SummaryRatingAnalyticForUser',
  async (params: TActionParams, thunkAPI) => {
    try {
      return await API.getSummaryRatingAnalyticForUser(params);
    } catch (error) {
      if (!axios.isAxiosError(error)) throw error;
      toast.error(error.message);
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);

export const getRatingQuizThunk = createAppAsyncThunk(
  'companyData/SummaryRatingForQuiz',
  async (params: TQuizCompanyParams, thunkAPI) => {
    try {
      return await API.getSummaryRatingForQuiz(params);
    } catch (error) {
      if (!axios.isAxiosError(error)) throw error;
      toast.error(error.message);
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);

export const getAnalyticQuizThunk = createAppAsyncThunk(
  'companyData/SummaryRatingAnalyticForQuiz',
  async (params: TQuizCompanyParams, thunkAPI) => {
    try {
      return await API.getSummaryRatingAnalyticForQuiz(params);
    } catch (error) {
      if (!axios.isAxiosError(error)) throw error;
      toast.error(error.message);
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);

export const getQuizzesPassInCompanyThunk = createAppAsyncThunk(
  'companyData/QuizzesLastPassInCompany',
  async (params: TQuizCompanyParams, thunkAPI) => {
    try {
      return await API.getQuizzesLastPassInCompany(params);
    } catch (error) {
      if (!axios.isAxiosError(error)) throw error;
      toast.error(error.message);
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);
