import classNames from 'classnames';
import H1 from 'components/ui/Typography/H1';

import s from './index.module.scss';

const CompanyListPage = () => {
  return (
    <H1 className={classNames('container', s.screen)}>
      List of Companies Page
    </H1>
  );
};

export default CompanyListPage;