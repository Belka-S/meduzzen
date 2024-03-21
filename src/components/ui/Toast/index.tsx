import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import s from './index.module.scss';

const Toast = () => (
  <ToastContainer
    className={s.toast}
    position="bottom-left"
    autoClose={3000}
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
