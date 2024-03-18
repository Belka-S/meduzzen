import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer } from 'react-toastify';

import s from './Toast.module.scss';

const Toast = () => (
  <ToastContainer
    className={s.toast}
    position="bottom-left"
    autoClose={4000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="light"
  />
);

export default Toast;
