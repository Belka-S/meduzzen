import CompanySelector from 'layouts/Header/CompanySelector';
import SiteNavLink from 'layouts/Header/SiteNav/SiteNavLink';
import { useLocation } from 'react-router-dom';
import { useAuth, useCompany, useUser } from 'utils/hooks';

import s from './index.module.scss';

const SiteNav = () => {
  const { pathname } = useLocation();
  const { isAuth } = useAuth();
  const { owner, user, loading: userLoading } = useUser();
  const { company, loading: companyLoading } = useCompany();

  const isUserPage = pathname.includes('/cluster/') && !userLoading;
  const isCompanyPage = pathname.includes('/company/') && !companyLoading;
  const isCompany = pathname === '/company';

  return (
    <>
      <SiteNavLink
        to={'/'}
        activeIf={pathname === '/'}
        svgId="menu-home"
        size={32}
      />

      <SiteNavLink
        to={'/about'}
        activeIf={pathname === '/about'}
        label="About"
      />

      <SiteNavLink
        to={'/cluster'}
        shownIf={isAuth && !!owner}
        activeIf={pathname === '/cluster'}
        label="Users"
      />

      <SiteNavLink
        to={'/company'}
        shownIf={isAuth && !!owner}
        activeIf={isCompany}
        label={isCompany ? 'Companies:' : 'Companies'}
      />

      <SiteNavLink
        to={'/quiz'}
        shownIf={pathname.includes('/quiz')}
        activeIf={pathname.includes('/quiz')}
        label={'Quiz'}
      />

      {isCompany && <CompanySelector />}

      {(isUserPage || isCompanyPage) && (
        <span className={s.active}>{`Profile of ${
          isUserPage ? user?.user_firstname : company?.company_name
        }`}</span>
      )}
    </>
  );
};

export default SiteNav;
