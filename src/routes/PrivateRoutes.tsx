import { Suspense } from 'react';
import OvalLoader from 'components/ui/Loader';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useUser } from 'utils/hooks';

const PrivateRoutes = () => {
  const location = useLocation();
  const { owner } = useUser();
  const isPrivate = owner;

  return isPrivate ? (
    <Suspense fallback={<OvalLoader />}>
      <Outlet />
    </Suspense>
  ) : (
    <Navigate to="/" state={location} />
  );
};

export default PrivateRoutes;
