import { useState } from 'react';
import classNames from 'classnames';
import CodeForm from 'components/CodeForm';
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
    <div className={classNames('container', s.sign)}>
      <SignupForm />

      {isModal && (
        <Modal setIsModal={setIsModal}>
          <CodeForm />
        </Modal>
      )}
    </div>
  );
};

export default SignupPage;
