import SvgIcon from 'components/ui/SvgIcon';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth, useCompany, useUser } from 'utils/hooks';

import s from './index.module.scss';

const SiteNav = () => {
  const { pathname } = useLocation();
  const { isAuth } = useAuth();
  const { owner, user, isLoading: userLoading } = useUser();
  const { company, isLoading: companyLoading } = useCompany();

  const isHome = pathname === '/';
  const isAbout = pathname === '/about';
  const isUser = pathname === '/cluster';
  const isCompany = pathname === '/company';
  const isUserPage = pathname.includes('/cluster/') && !userLoading;
  const isCompanyPage = pathname.includes('/company/') && !companyLoading;

  return (
    <>
      <NavLink to={'/'} className={isHome ? s.active : ''}>
        <SvgIcon svgId="menu-home" size={32} />
      </NavLink>
      <NavLink to={'/about'} className={isAbout ? s.active : ''}>
        About
      </NavLink>

      {isAuth && owner && (
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
        <span className={s.active}>{`Profile of ${user?.user_firstname}`}</span>
      )}

      {isCompanyPage && (
        <span
          className={s.active}
        >{`Profile of ${company?.company_name}`}</span>
      )}
    </>
  );
};

export default SiteNav;
