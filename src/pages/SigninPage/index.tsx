import { useState } from 'react';
import classNames from 'classnames';
import Modal from 'components/ui/Modal';

// import { useAuth } from 'utils/hooks';
import SigninForm from './SigninForm';

import s from './index.module.scss';

const SigninPage = () => {
  // const { user } = useAuth();
  const [isModal, setIsModal] = useState<boolean>(false);

  // useEffect(() => {
  //   setIsModal(user.email && !user.verifiedEmail);
  // }, [user]);

  return (
    <div className={classNames('container', s.screen)}>
      <SigninForm />

      {isModal && <Modal setIsModal={setIsModal}>qwe</Modal>}
    </div>
  );
};

export default SigninPage;
