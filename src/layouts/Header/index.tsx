import classNames from 'classnames';
import ProfileBtn from 'components/ProfileBtn';
import SvgIcon from 'components/ui/SvgIcon';
import { NavLink } from 'react-router-dom';
import { useAuth } from 'utils/hooks';

import { useAuth0 } from '@auth0/auth0-react';

import s from './index.module.scss';

const Header = () => {
  const { isAuth, user } = useAuth();
  const { isAuthenticated } = useAuth0();
  const isLoggedin = isAuth || isAuthenticated;

  return (
    <header className={s.header}>
      <div className={classNames('container', s.header__wrap)}>
        <NavLink to={'/'}>
          <SvgIcon svgId="menu-home" size={32} />
        </NavLink>
        <NavLink to={'/about'}>About</NavLink>

        {isLoggedin && <NavLink to={'/cluster'}>Cluster</NavLink>}
        {isLoggedin && <NavLink to={'/company'}>Company</NavLink>}

        <div className={s.login}>
          {!isLoggedin && <NavLink to={'/signup'} />}
          {!isLoggedin && <NavLink to={'/signin'}>Log in</NavLink>}
          {isLoggedin && <span>{user.user_email}</span>}
          {isLoggedin && <ProfileBtn />}
        </div>
      </div>
    </header>
  );
};

export default Header;
