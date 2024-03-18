import classNames from 'classnames';
import H1 from 'components/ui/Typography/H1';

import s from './index.module.scss';

const HomePage = () => {
  return <H1 className={classNames('container', s.home)}>Home Page</H1>;
};

export default HomePage;
