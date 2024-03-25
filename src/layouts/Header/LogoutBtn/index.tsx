import { useState } from 'react';
import ProfileBtn from 'components/ProfileBtn';
import Button from 'components/ui/Button';
import Modal from 'components/ui/Modal';
import { useAppDispatch } from 'store';
import { logout } from 'store/auth';
import { useAuth } from 'utils/hooks';

import { useAuth0 } from '@auth0/auth0-react';

const LogoutBtn = () => {
  const dispatch = useAppDispatch();
  const { user } = useAuth();
  const { logout: logoutAuth0 } = useAuth0();
  const [isModal, setIsModal] = useState(false);

  const switchIsModal = () => setIsModal(!isModal);

  const handleLogout = () => {
    dispatch(logout());
    logoutAuth0();
  };

  return (
    <>
      <ProfileBtn user={user} onClick={switchIsModal} />

      {isModal && (
        <Modal setIsModal={switchIsModal}>
          <Button
            onClick={handleLogout}
            variant="smooth"
            size="l"
            label="Log Out"
          />
        </Modal>
      )}
    </>
  );
};

export default LogoutBtn;

// ---------------- ?????? --------------- //

// userAuth0

// const { user: userAuth0 } = useAuth0();

// useEffect(() => {
//   userAuth0 &&
//     dispatch(
//       login({
//         result: {
//           user_email: userAuth0?.email ?? userAuth0?.email,
//           user_firstname: userAuth0?.given_name ?? userAuth0?.given_name,
//           user_lastname: userAuth0?.family_name ?? userAuth0?.family_name,
//           user_avatar: userAuth0?.picture ?? userAuth0?.picture,
//         },
//       }),
//     );
// }, [dispatch, userAuth0]);
