import classNames from 'classnames';
import Button from 'components/ui/Button';
import Section from 'components/ui/Section';
import H1 from 'components/ui/Typography/H1';
import P from 'components/ui/Typography/P';
import { useTAppDispatch } from 'store';
import { checkStatusThunk } from 'store/common';
import { useCommon } from 'utils/hooks';

import s from './index.module.scss';

const HomePage = () => {
  const dispatch = useTAppDispatch();
  const { server } = useCommon();

  return (
    <Section className={classNames('container', s.screen)}>
      <H1>Home Page</H1>
      <P>{server.status}</P>
      <Button
        variant="outlined"
        label="Check Server Status"
        onClick={() => dispatch(checkStatusThunk())}
      />
    </Section>
  );
};

export default HomePage;
