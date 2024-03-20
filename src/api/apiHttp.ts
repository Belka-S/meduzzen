import axios from 'axios';

// base URL
export const baseURL = import.meta.env.VITE_PROD_BACK_HTTP;

// axios instance
const apiClient = axios.create({ baseURL });

// set token
const token = {
  set(token: string) {
    apiClient.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    apiClient.defaults.headers.common.Authorization = '';
  },
};

export { apiClient, token };
