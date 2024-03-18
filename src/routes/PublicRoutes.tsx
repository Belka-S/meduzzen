import { Suspense } from 'react';
import OvalLoader from 'components/ui/Loader';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

// import { useAuth } from 'utils/hooks/useAuth';

const PublicRoutes = () => {
  const { state } = useLocation();
  // const { isLoggedIn, isRefreshing } = useAuth();
  // const shouldRedirect = !isLoggedIn && !isRefreshing;
  const shouldRedirect = true;

  return shouldRedirect ? (
    <Suspense fallback={<OvalLoader />}>
      <Outlet />
    </Suspense>
  ) : (
    <Navigate to={state ? state : '/profile'} />
  );
};

export default PublicRoutes;
