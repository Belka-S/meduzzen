import { MouseEvent } from 'react';
import classNames from 'classnames';
import Button from 'components/ui/Button';
import Section from 'components/ui/Section';
import H1 from 'components/ui/Typography/H1';
import H4 from 'components/ui/Typography/H4';
import { useAppExtraDispatch } from 'store';
import { checkStatusThunk } from 'store/server';
import { useServer } from 'utils/hooks';

import s from './index.module.scss';

const AboutPage = () => {
  const dispatch = useAppExtraDispatch();
  const { server } = useServer();
  const { status } = server;

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    dispatch(checkStatusThunk());
    e.currentTarget.blur();
  };

  return (
    <Section className={classNames('container', s.screen)}>
      <H1>About Page</H1>
      <H4 className={s.info}>{`Status: ${status ? status : '?'}`}</H4>
      <Button
        variant="smooth"
        color="outlined"
        label="Check Server Status"
        onClick={handleClick}
      />
    </Section>
  );
};

export default AboutPage;
