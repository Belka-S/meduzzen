import { FC, ReactNode } from 'react';
import classNames from 'classnames';

import s from './Section.module.scss';

type TSectionProps = {
  className?: string;
  children: ReactNode;
};

const Section: FC<TSectionProps> = ({ className = '', children }) => {
  return (
    <section className={classNames(s.section, className)}>{children}</section>
  );
};

export default Section;
