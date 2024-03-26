import { useState } from 'react';
import ProfileBtn from 'components/ProfileBtn';
import Button from 'components/ui/Button';
import Modal from 'components/ui/Modal';
import { useAppDispatch } from 'store';
import { logout } from 'store/auth';
import { useAuth } from 'utils/hooks';

import { useAuth0 } from '@auth0/auth0-react';

import PasswordForm from '../PasswordForm';

import s from './index.module.scss';

const LogoutBtn = () => {
  const dispatch = useAppDispatch();
  const { user } = useAuth();
  const { logout: logoutAuth0 } = useAuth0();
  const [isModal, setIsModal] = useState(false);
  const [isForm, setIsForm] = useState(false);

  const switchIsModal = () => {
    setIsModal(!isModal);
    setIsForm(false);
  };

  const handleUpdatePassword = () => {
    setIsForm(true);
  };

  const handleLogout = () => {
    dispatch(logout());
    logoutAuth0();
  };

  return (
    <>
      <ProfileBtn user={user} onClick={switchIsModal} />

      {isModal && (
        <Modal className={s.modal} setIsModal={switchIsModal}>
          {isForm && <PasswordForm setIsModal={switchIsModal} />}

          {!isForm && (
            <Button
              onClick={handleUpdatePassword}
              variant="smooth"
              size="l"
              label="Change Password"
            />
          )}

          {!isForm && (
            <Button
              onClick={handleLogout}
              variant="smooth"
              size="l"
              label="Log Out"
            />
          )}
        </Modal>
      )}
    </>
  );
};

export default LogoutBtn;
