import classNames from 'classnames';
import Section from 'components/ui/Section';

import SignupForm from './SignupForm';

import s from './index.module.scss';

const SignupPage = () => {
  return (
    <Section className={classNames('container', s.screen)}>
      <SignupForm />
    </Section>
  );
};

export default SignupPage;
