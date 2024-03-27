import { Suspense } from 'react';
import OvalLoader from 'components/ui/Loader';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth, useUser } from 'utils/hooks';

const PublicRoutes = () => {
  const { state } = useLocation();
  const { isAuth } = useAuth();
  const { isLoading } = useUser();
  const isPublic = !isAuth && !isLoading;

  return isPublic ? (
    <Suspense fallback={<OvalLoader />}>
      <Outlet />
    </Suspense>
  ) : (
    <Navigate to={state ? state : '/cluster'} />
  );
};

export default PublicRoutes;
