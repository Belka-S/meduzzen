import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { useUser } from 'utils/hooks';

import LogoutBtn from './LogoutBtn';
import SiteNav from './SiteNav';

import s from './index.module.scss';

const Header = () => {
  const { owner } = useUser();

  return (
    <header className={s.header}>
      <div className={classNames('container', s.header__wrap)}>
        <SiteNav />

        <div className={s.login}>
          {!owner && <NavLink to={'/signup'} />}
          {!owner && <NavLink to={'/signin'}>Log in</NavLink>}
          {owner && <span>{owner.user_email}</span>}
          {owner && <LogoutBtn />}
        </div>
      </div>
    </header>
  );
};

export default Header;
