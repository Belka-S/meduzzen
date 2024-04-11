import classNames from 'classnames';
import H5 from 'components/ui/Typography/H5';

import s from './index.module.scss';

const TableHead = () => {
  return (
    <div className={classNames(s.head)}>
      <div className={classNames('container', s.head__wrap, s.item)}>
        <span />
        <H5>Name</H5>
        <H5>Title</H5>
        <H5>Description</H5>
        <H5>Frequency</H5>
        <span />
        <span />
        <H5>ID</H5>
      </div>
    </div>
  );
};

export default TableHead;
