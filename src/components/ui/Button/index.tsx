import { FC, MouseEvent, ReactElement } from 'react';
import classNames from 'classnames';

import s from './index.module.scss';

type TButtonProps = {
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  size?: 's' | 'm' | 'l';
  type?: 'button' | 'submit' | 'reset';
  variant?: 'default' | 'outlined' | 'transparent' | 'disabled';
  border?: 'orthogonal' | 'round';
  label?: string;
  children?: ReactElement;
};

const Button: FC<TButtonProps> = props => {
  const {
    onClick,
    className,
    size = 'm',
    type = 'button',
    variant = 'default',
    border = 'orthogonal',
    label,
    children,
  } = props;

  return (
    <button
      onClick={onClick}
      type={type}
      className={classNames(
        s.button,
        s[size],
        s[variant],
        s[border],
        className,
      )}
    >
      {label && label}
      {children}
    </button>
  );
};

export default Button;
