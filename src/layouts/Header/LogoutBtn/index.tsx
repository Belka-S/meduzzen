import { useState } from 'react';
import ProfileBtn from 'components/ProfileBtn';
import Button from 'components/ui/Button';
import Modal from 'components/ui/Modal';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'store';
import { logout } from 'store/auth';
import { cleanOwner } from 'store/user';
import { useUser } from 'utils/hooks';

import { useAuth0 } from '@auth0/auth0-react';

import PasswordForm from '../PasswordForm';

import s from './index.module.scss';

const LogoutBtn = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { logout: logoutAuth0 } = useAuth0();
  const [isModal, setIsModal] = useState(false);
  const [isForm, setIsForm] = useState(false);
  const { owner } = useUser();

  if (!owner) return;
  const { user_id, user_avatar, user_firstname, user_lastname } = owner;
  const ava = {
    id: user_id,
    url: user_avatar,
    name: `${user_firstname} ${user_lastname}`,
  };

  const handleProfile = () => {
    navigate(`/cluster/${user_id}`, { replace: true });
    setIsModal(!isModal);
  };

  const switchIsModal = () => {
    setIsModal(!isModal);
    setIsForm(false);
  };

  const handleLogout = () => {
    dispatch(cleanOwner());
    dispatch(logout());
    logoutAuth0();
  };

  return (
    <>
      <ProfileBtn ava={ava} onClick={switchIsModal} />

      {isModal && (
        <Modal className={s.modal} setIsModal={switchIsModal}>
          {isForm && <PasswordForm setIsModal={switchIsModal} />}

          {!isForm && (
            <>
              <Button
                variant="smooth"
                size="l"
                label="Profile"
                onClick={handleProfile}
              />
              <Button
                variant="smooth"
                size="l"
                label="Change Password"
                onClick={() => setIsForm(true)}
              />
              <Button
                variant="smooth"
                size="l"
                label="Log Out"
                onClick={handleLogout}
              />
            </>
          )}
        </Modal>
      )}
    </>
  );
};

export default LogoutBtn;
