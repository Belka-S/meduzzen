import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { useAuth } from 'utils/hooks';

import LogoutBtn from './LogoutBtn';
import SiteNav from './SiteNav';

import s from './index.module.scss';

const Header = () => {
  const { isAuth, user } = useAuth();

  return (
    <header className={s.header}>
      <div className={classNames('container', s.header__wrap)}>
        <SiteNav />

        <div className={s.login}>
          {!isAuth && <NavLink to={'/signup'} />}
          {!isAuth && <NavLink to={'/signin'}>Log in</NavLink>}
          {isAuth && <span>{user.user_email}</span>}
          {isAuth && <LogoutBtn />}
        </div>
      </div>
    </header>
  );
};

export default Header;
