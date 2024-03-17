import { useState } from 'react';
import classNames from 'classnames';
import CodeForm from 'components/CodeForm';
import Modal from 'components/Modal';

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
    <div className={classNames('container', s.sign)}>
      <SigninForm />

      {isModal && (
        <Modal setIsModal={setIsModal}>
          <CodeForm />
        </Modal>
      )}
    </div>
  );
};

export default SigninPage;
