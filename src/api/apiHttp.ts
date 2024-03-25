import axios from 'axios';
import { toast } from 'react-toastify';

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

// response interseptor
apiClient.interceptors.response.use(
  res => {
    toast.success(res.data.detail);
    return res;
  },
  async err => {
    toast.error(err.message.includes('401') ? 'Unauthorized' : err.message);
    return Promise.reject(err);
  },
);

export { apiClient, token };
