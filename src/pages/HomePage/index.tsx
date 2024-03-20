import classNames from 'classnames';
import Button from 'components/ui/Button';
import Section from 'components/ui/Section';
import H1 from 'components/ui/Typography/H1';
import H2 from 'components/ui/Typography/H2';
import { useTAppDispatch } from 'store';
import { checkStatusThunk } from 'store/server';
import { useServer } from 'utils/hooks';

import s from './index.module.scss';

const HomePage = () => {
  const dispatch = useTAppDispatch();
  const { server } = useServer();

  return (
    <Section className={classNames('container', s.screen)}>
      <H1>Home Page</H1>
      <H2>{`Status ${server.status}`}</H2>
      <Button
        variant="outlined"
        label="Check Server Status"
        onClick={() => dispatch(checkStatusThunk())}
      />
    </Section>
  );
};

export default HomePage;
