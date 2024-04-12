import { FC, MouseEvent } from 'react';
import sprite from 'assets/sprite.svg';
import classNames from 'classnames';

import s from './index.module.scss';

type TSvgIconProps = {
  svgId: string;
  size?: number;
  className?: string;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
};

const SvgIcon: FC<TSvgIconProps> = ({ svgId, size = 20, className = '' }) => {
  return (
    <svg
      className={classNames(s.svgIcon, className)}
      width={size}
      height={size}
    >
      {/* <use href={`./sprite.svg#${svgId}`} /> Next.js - /public/sprite.svg*/}
      <use href={`${sprite}#${svgId}`} />
    </svg>
  );
};

export default SvgIcon;
