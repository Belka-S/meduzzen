import { Suspense } from 'react';
import OvalLoader from 'components/ui/Loader';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useUser } from 'utils/hooks';

const PublicRoutes = () => {
  const { state } = useLocation();
  const { owner, isLoading } = useUser();
  const isPublic = !owner && !isLoading;

  return isPublic ? (
    <Suspense fallback={<OvalLoader />}>
      <Outlet />
    </Suspense>
  ) : (
    <Navigate to={state ? state : '/cluster'} />
  );
};

export default PublicRoutes;
