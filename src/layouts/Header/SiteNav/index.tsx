import SvgIcon from 'components/ui/SvgIcon';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth, useUser } from 'utils/hooks';

import s from './index.module.scss';

const SiteNav = () => {
  const { pathname } = useLocation();
  const { isAuth } = useAuth();
  const { activeUser, isLoading } = useUser();
  const { user_firstname } = activeUser;

  const isHome = pathname === '/';
  const isAbout = pathname === '/about';
  const isUser = pathname === '/cluster';
  const isCompany = pathname === 'company';
  const isUserPage = pathname.includes('/cluster/') && !isLoading;

  return (
    <>
      <NavLink to={'/'} className={isHome ? s.active : ''}>
        <SvgIcon svgId="menu-home" size={32} />
      </NavLink>
      <NavLink to={'/about'} className={isAbout ? s.active : ''}>
        About
      </NavLink>

      {isAuth && (
        <>
          <NavLink to={'/cluster'} className={isUser ? s.active : ''}>
            Users
          </NavLink>
          <NavLink to={'/company'} className={isCompany ? s.active : ''}>
            Companies
          </NavLink>
        </>
      )}

      {isUserPage && (
        <span className={s.active}>{`Profile of ${user_firstname}`}</span>
      )}
    </>
  );
};

export default SiteNav;