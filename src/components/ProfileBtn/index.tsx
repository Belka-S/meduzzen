import { useEffect, useState } from 'react';
import Button from 'components/ui/Button';
import Modal from 'components/ui/Modal';
import { useAppDispatch } from 'store';
import { login, logout } from 'store/auth';
import { getAbbreviation } from 'utils/helpers';
import { useAuth } from 'utils/hooks';

import { useAuth0 } from '@auth0/auth0-react';

import s from './index.module.scss';

const ProfileBtn = () => {
  const dispatch = useAppDispatch();
  const { user } = useAuth();
  const { user: userAuth0 } = useAuth0();
  const [isModal, setIsModal] = useState(false);

  useEffect(() => {
    userAuth0 &&
      dispatch(
        login({
          result: {
            user_email: userAuth0?.email ?? userAuth0?.email,
            user_firstname: userAuth0?.given_name ?? userAuth0?.given_name,
            user_lastname: userAuth0?.family_name ?? userAuth0?.family_name,
            user_avatar: userAuth0?.picture ?? userAuth0?.picture,
          },
        }),
      );
  }, [dispatch, userAuth0]);

  const { user_firstname, user_lastname, user_avatar } = user;

  // profile button styles
  const btnId = 'profile-btn';
  const { logout: logoutAuth0 } = useAuth0();

  useEffect(() => {
    if (user_avatar) {
      document.styleSheets[0].insertRule(
        `#${btnId} {background-image: url(${user_avatar})}`,
        0,
      );
    } else if (user_firstname || user_lastname) {
      const abbr = getAbbreviation(`${user_firstname} ${user_lastname}`);

      document.styleSheets[0].deleteRule(0);
      document.styleSheets[0].insertRule(
        `#${btnId}::after { color: #ffffff; content: '${abbr}'}`,
      );
    }
  }, [user_avatar, user_firstname, user_lastname]);

  const switchIsModal = () => setIsModal(!isModal);
  const handleLogout = () => {
    dispatch(logout());
    logoutAuth0();
  };

  return (
    <>
      <div id={`${btnId}`} className={s[btnId]} onClick={switchIsModal} />

      {isModal && (
        <Modal setIsModal={switchIsModal}>
          <Button onClick={handleLogout} variant="smooth" label="Log Out" />
        </Modal>
      )}
    </>
  );
};

export default ProfileBtn;
