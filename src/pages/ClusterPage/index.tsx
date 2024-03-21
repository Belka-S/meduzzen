import classNames from 'classnames';
import H1 from 'components/ui/Typography/H1';
import { useParams } from 'react-router-dom';

import s from './index.module.scss';

const ClusterPage = () => {
  const { id } = useParams();

  return (
    <H1 className={classNames('container', s.screen)}>
      {`User ${id ? id : ''} Page`}
    </H1>
  );
};

export default ClusterPage;
