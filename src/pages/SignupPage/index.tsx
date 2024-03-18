import { useState } from 'react';
import classNames from 'classnames';
import Modal from 'components/Modal';

// import { useAuth } from 'utils/hooks';
import SignupForm from './SignupForm';

import s from './index.module.scss';

const SignupPage = () => {
  // const { user } = useAuth();
  const [isModal, setIsModal] = useState<boolean>(false);

  // useEffect(() => {
  //   setIsModal(user.email && !user.verifiedEmail);
  // }, [user]);

  return (
    <div className={classNames('container', s.screen)}>
      <SignupForm />

      {isModal && <Modal setIsModal={setIsModal}>qwe</Modal>}
    </div>
  );
};

export default SignupPage;
