import { FC } from 'react';
import classNames from 'classnames';

import { TButtonProps } from './types';

import s from './index.module.scss';

const Button: FC<TButtonProps> = props => {
  const {
    className,
    size = 'm',
    color = 'default',
    variant = 'orthogonal',
    type = 'button',
    label,
    ref,
    id,

    onClick,
    onMouseOver,
    children,
  } = props;

  return (
    <button
      className={classNames(className, s.button, s[size], s[color], s[variant])}
      type={type}
      onClick={onClick}
      onMouseOver={onMouseOver}
      ref={ref}
      id={id}
    >
      {label && label}
      {children}
    </button>
  );
};

export default Button;
