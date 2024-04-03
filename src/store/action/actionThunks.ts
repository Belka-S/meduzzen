import * as API from 'api/actionApi';
import axios from 'axios';
import { toast } from 'react-toastify';
import { store, TActionParams, TCompany } from 'store';
import { createAppAsyncThunk } from 'store';

export const createActionFromUserThunk = createAppAsyncThunk(
  'action/createFromUser',
  async (params: Pick<TCompany, 'company_id'>, thunkAPI) => {
    const access_token = store.getState().auth.token?.access_token;
    if (!access_token) return;
    try {
      return await API.createActionFromUser(access_token, params);
    } catch (error) {
      if (!axios.isAxiosError(error)) throw error;
      toast.error(error.message);
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);

export const createActionFromCompanyThunk = createAppAsyncThunk(
  'action/createFromCompany',
  async (params: TActionParams, thunkAPI) => {
    const access_token = store.getState().auth.token?.access_token;
    if (!access_token) return;
    try {
      return await API.createActionFromCompany(access_token, params);
    } catch (error) {
      if (!axios.isAxiosError(error)) throw error;
      toast.error(error.message);
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);

export const acceptActionInviteThunk = createAppAsyncThunk(
  'action/acceptInvite',
  async (params: { action_id: number }, thunkAPI) => {
    const access_token = store.getState().auth.token?.access_token;
    if (!access_token) return;
    try {
      return await API.acceptActionInvite(access_token, params);
    } catch (error) {
      if (!axios.isAxiosError(error)) throw error;
      toast.error(error.message);
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);

export const acceptActionRequestThunk = createAppAsyncThunk(
  'action/acceptRequest',
  async (params: { action_id: number }, thunkAPI) => {
    const access_token = store.getState().auth.token?.access_token;
    if (!access_token) return;
    try {
      return await API.acceptActionRequest(access_token, params);
    } catch (error) {
      if (!axios.isAxiosError(error)) throw error;
      toast.error(error.message);
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);

export const declineActionThunk = createAppAsyncThunk(
  'action/decline',
  async (params: { action_id: number }, thunkAPI) => {
    const access_token = store.getState().auth.token?.access_token;
    if (!access_token) return;
    try {
      return await API.declineAction(access_token, params);
    } catch (error) {
      if (!axios.isAxiosError(error)) throw error;
      toast.error(error.message);
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);

export const addToAdminThunk = createAppAsyncThunk(
  'action/addMemberToAdmin',
  async (params: { action_id: number }, thunkAPI) => {
    const access_token = store.getState().auth.token?.access_token;
    if (!access_token) return;
    try {
      return await API.addMemberToAdmin(access_token, params);
    } catch (error) {
      if (!axios.isAxiosError(error)) throw error;
      toast.error(error.message);
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);

export const removeFromAdminThunk = createAppAsyncThunk(
  'action/removeMemberFromAdmin',
  async (params: { action_id: number }, thunkAPI) => {
    const access_token = store.getState().auth.token?.access_token;
    if (!access_token) return;
    try {
      return await API.removeMemberFromAdmin(access_token, params);
    } catch (error) {
      if (!axios.isAxiosError(error)) throw error;
      toast.error(error.message);
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);

export const addToBlockThunk = createAppAsyncThunk(
  'action/addMemberToBlock',
  async (params: { action_id: number }, thunkAPI) => {
    const access_token = store.getState().auth.token?.access_token;
    if (!access_token) return;
    try {
      return await API.addMemberToBlock(access_token, params);
    } catch (error) {
      if (!axios.isAxiosError(error)) throw error;
      toast.error(error.message);
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);

export const removeFromBlockThunk = createAppAsyncThunk(
  'action/removeMemberFromBlock',
  async (params: { action_id: number }, thunkAPI) => {
    const access_token = store.getState().auth.token?.access_token;
    if (!access_token) return;
    try {
      return await API.removeMemberFromBlock(access_token, params);
    } catch (error) {
      if (!axios.isAxiosError(error)) throw error;
      toast.error(error.message);
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);

export const leaveFromCompanyThunk = createAppAsyncThunk(
  'action/leaveMemberFromCompany',
  async (params: { action_id: number }, thunkAPI) => {
    const access_token = store.getState().auth.token?.access_token;
    if (!access_token) return;
    try {
      return await API.leaveMemberFromCompany(access_token, params);
    } catch (error) {
      if (!axios.isAxiosError(error)) throw error;
      toast.error(error.message);
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);
