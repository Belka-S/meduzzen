import classNames from 'classnames';

import s from './index.module.scss';

const Footer = () => {
  return (
    <footer className={s.footer}>
      <div className={classNames('container', s.footer__wrap)}>
        <a href="https://cv-it.vercel.app" target="blank">
          built by <span>BS</span>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
