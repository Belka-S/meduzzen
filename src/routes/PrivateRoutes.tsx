import { Suspense } from 'react';
import OvalLoader from 'components/ui/Loader';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from 'utils/hooks/useAuth';

import { useAuth0 } from '@auth0/auth0-react';

const PrivateRoutes = () => {
  const location = useLocation();
  const { isAuth } = useAuth();
  const { isAuthenticated } = useAuth0();

  return isAuth || isAuthenticated ? (
    <Suspense fallback={<OvalLoader />}>
      <Outlet />
    </Suspense>
  ) : (
    <Navigate to="/" state={location} />
  );
};

export default PrivateRoutes;
