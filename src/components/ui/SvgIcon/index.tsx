import sprite from 'assets/sprite.svg';
import classNames from 'classnames';

import s from './index.module.scss';

type TSvgIconProps = {
  svgId: string;
  size?: number;
  className?: string;
};

const SvgIcon = ({ svgId, size = 20, className = '' }: TSvgIconProps) => {
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
