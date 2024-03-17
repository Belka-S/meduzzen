import { FC, MouseEvent, ReactElement } from 'react';
import classNames from 'classnames';

import styles from './Button.module.scss';

interface IButtonProps {
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  size?: 's' | 'm' | 'l';
  type?: 'button' | 'submit' | 'reset';
  variant?: 'default' | 'outlined' | 'transparent' | 'disabled';
  border?: 'orthogonal' | 'round';
  label?: string;
  children?: ReactElement;
}

const Button: FC<IButtonProps> = props => {
  const {
    onClick,
    className,
    size = 's',
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
        styles.button,
        styles[size],
        styles[variant],
        styles[border],
        className,
      )}
    >
      {label && label}
      {children}
    </button>
  );
};

export default Button;
