import classNames from 'classnames';
import { useLocation } from 'react-router-dom';

import CompanyEditBar from './CompanyEditBar';
import UserEditBar from './UserEditBar';

import s from './index.module.scss';

const Footer = () => {
  const { pathname } = useLocation();

  const isCompanyEditBar = pathname.includes('/company');
  const isUserEditBar = pathname.includes('/cluster');

  return (
    <footer className={s.footer}>
      <div className={classNames('container', s.footer__wrap)}>
        <a className={s.bs} href="https://cv-it.vercel.app" target="blank">
          built by <span>BS</span>
        </a>

        {isCompanyEditBar && <CompanyEditBar />}
        {isUserEditBar && <UserEditBar />}
      </div>
    </footer>
  );
};

export default Footer;
