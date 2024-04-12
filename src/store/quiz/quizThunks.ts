import * as API from 'api/quizApi';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
  createAppAsyncThunk,
  TAnswers,
  TQuestion,
  TQuizCreate,
  TQuizUpdate,
} from 'store';

export const createQuizThunk = createAppAsyncThunk(
  'quiz/createQuiz',
  async (params: TQuizCreate, thunkAPI) => {
    try {
      return await API.createQuiz(params);
    } catch (error) {
      if (!axios.isAxiosError(error)) throw error;
      toast.error(error.message);
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);

export const getQuizThunk = createAppAsyncThunk(
  'quiz/getQuiz',
  async (params: { quiz_id: number }, thunkAPI) => {
    try {
      return await API.getQuiz(params);
    } catch (error) {
      if (!axios.isAxiosError(error)) throw error;
      toast.error(error.message);
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);

export const updateQuizThunk = createAppAsyncThunk(
  'quiz/updateQuiz',
  async (params: TQuizUpdate, thunkAPI) => {
    try {
      return await API.updateQuiz(params);
    } catch (error) {
      if (!axios.isAxiosError(error)) throw error;
      toast.error(error.message);
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);

export const deleteQuizThunk = createAppAsyncThunk(
  'quiz/deleteQuiz',
  async (params: { quiz_id: number }, thunkAPI) => {
    try {
      return await API.deleteQuiz(params);
    } catch (error) {
      if (!axios.isAxiosError(error)) throw error;
      toast.error(error.message);
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);

export const takeQuizThunk = createAppAsyncThunk(
  'quiz/takeQuiz',
  async (params: TAnswers & { quiz_id: number }, thunkAPI) => {
    try {
      return await API.takeQuiz(params);
    } catch (error) {
      if (!axios.isAxiosError(error)) throw error;
      toast.error(error.message);
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);

export const addQuestionThunk = createAppAsyncThunk(
  'quiz/addQuestion',
  async (params: TQuestion & { quiz_id: number }, thunkAPI) => {
    try {
      return await API.addQuestion(params);
    } catch (error) {
      if (!axios.isAxiosError(error)) throw error;
      toast.error(error.message);
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);

export const updateQuestionThunk = createAppAsyncThunk(
  'quiz/updateQuestion',
  async (params: TQuestion, thunkAPI) => {
    try {
      return await API.updateQuestion(params);
    } catch (error) {
      if (!axios.isAxiosError(error)) throw error;
      toast.error(error.message);
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);

export const deleteQuestionThunk = createAppAsyncThunk(
  'quiz/deleteQuestion',
  async (params: { question_id: number }, thunkAPI) => {
    try {
      return await API.deleteQuestion(params);
    } catch (error) {
      if (!axios.isAxiosError(error)) throw error;
      toast.error(error.message);
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);
