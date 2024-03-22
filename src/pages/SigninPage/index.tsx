import classNames from 'classnames';
import Section from 'components/ui/Section';

import SigninForm from './SigninForm';

import s from './index.module.scss';

const SigninPage = () => {
  return (
    <Section className={classNames('container', s.screen)}>
      <SigninForm />
    </Section>
  );
};

export default SigninPage;
