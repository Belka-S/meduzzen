import { FC, KeyboardEvent, MouseEvent, ReactNode, useEffect } from 'react';
import classNames from 'classnames';
import { createPortal } from 'react-dom';

import s from './index.module.scss';

declare global {
  interface WindowEventMap {
    keydown: KeyboardEvent<Document>;
  }
}

const modalRoot = document.querySelector('#modal');

type TModalProps = {
  className?: string;
  setIsModal: (isModal: boolean) => void;
  background?: 'default' | 'transparent';
  blur?: 'none';
  children: ReactNode;
};

const Modal: FC<TModalProps> = ({
  className,
  setIsModal,
  background = 'default',
  blur,
  children,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent<Document>) => {
      if ((e as KeyboardEvent<Document>).key === 'Escape') setIsModal(false);
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [setIsModal]);

  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    e.target === e.currentTarget && setIsModal(false);
    e.stopPropagation();
  };

  if (modalRoot)
    return createPortal(
      <div
        className={classNames(
          s.backdrop,
          background && s[background],
          blur && s[`blur__${blur}`],
        )}
        onClick={handleBackdropClick}
      >
        <div className={classNames(s.modal, className)}>{children}</div>
      </div>,
      modalRoot,
    );
};

export default Modal;
