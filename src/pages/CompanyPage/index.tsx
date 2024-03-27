import classNames from 'classnames';
import Section from 'components/ui/Section';
import H1 from 'components/ui/Typography/H1';
import { useParams } from 'react-router-dom';

import s from './index.module.scss';

const CompanyPage = () => {
  const { id } = useParams();

  return (
    <Section className={classNames('container', s.screen)}>
      <H1>{`Company ${id ? id : ''} Page`}</H1>
    </Section>
  );
};

export default CompanyPage;
