import { Suspense, useEffect } from 'react';
import OvalLoader from 'components/ui/Loader';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from 'utils/hooks/useAuth';

import { useAuth0 } from '@auth0/auth0-react';

const PublicRoutes = () => {
  const { state } = useLocation();
  const { isAuth, isLoading } = useAuth();
  const { isAuthenticated } = useAuth0();
  const shouldRedirect = (!isAuth || !isAuthenticated) && !isLoading;

  return shouldRedirect ? (
    <Suspense fallback={<OvalLoader />}>
      <Outlet />
    </Suspense>
  ) : (
    <Navigate to={state ? state : '/cluster'} />
  );
};

export default PublicRoutes;
