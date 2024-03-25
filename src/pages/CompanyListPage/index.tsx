import classNames from 'classnames';
import Section from 'components/ui/Section';
import H1 from 'components/ui/Typography/H1';

import s from './index.module.scss';

const CompanyListPage = () => {
  return (
    <Section className={classNames('container', s.screen)}>
      <H1>List of Companies Page</H1>
    </Section>
  );
};

export default CompanyListPage;
