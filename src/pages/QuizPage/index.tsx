import classNames from 'classnames';
import Section from 'components/ui/Section';
import H1 from 'components/ui/Typography/H1';
import { useLocation } from 'react-router-dom';

import s from './index.module.scss';

const QuizPage = () => {
  const { state } = useLocation();

  // const handleTakeQuiz = async () => {
  // console.log('qwe');
  // };

  return (
    <Section className={classNames('container', s.screen)}>
      <H1>Quiz Page</H1>
      <span>{state.from}</span>
    </Section>
  );
};

export default QuizPage;
