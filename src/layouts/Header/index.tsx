import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { useAuth, useUser } from 'utils/hooks';

import LogoutBtn from './LogoutBtn';
import SiteNav from './SiteNav';

import s from './index.module.scss';

const Header = () => {
  const { isAuth } = useAuth();
  const { owner } = useUser();

  return (
    <header className={s.header}>
      <div className={classNames('container', s.header__wrap)}>
        <SiteNav />

        <div className={s.login}>
          {(!isAuth || !owner) && <NavLink to={'/signup'} />}
          {(!isAuth || !owner) && <NavLink to={'/signin'}>Log in</NavLink>}
          {isAuth && owner && <span>{owner.user_email}</span>}
          {isAuth && owner && <LogoutBtn />}
        </div>
      </div>
    </header>
  );
};

export default Header;
