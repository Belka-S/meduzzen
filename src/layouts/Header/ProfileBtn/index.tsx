import { useEffect, useState } from 'react';
import Button from 'components/ui/Button';
import Modal from 'components/ui/Modal';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'store';
import { logout } from 'store/auth';
import { getAbbreviation } from 'utils/helpers';
import { useAuth } from 'utils/hooks';

import s from './index.module.scss';

const ProfileBtn = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isModal, setIsModal] = useState(false);

  const { user_firstname, user_lastname, user_avatar } = user;

  // profile button styles
  const btnId = 'profile-btn';
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
    navigate('/', { replace: true });
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
