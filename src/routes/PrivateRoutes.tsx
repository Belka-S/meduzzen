import { Suspense } from 'react';
import OvalLoader from 'components/ui/Loader';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth, useUser } from 'utils/hooks';

const PrivateRoutes = () => {
  const location = useLocation();
  const { isAuth } = useAuth();
  const { owner } = useUser();
  const isPrivate = isAuth && owner;

  return isPrivate ? (
    <Suspense fallback={<OvalLoader />}>
      <Outlet />
    </Suspense>
  ) : (
    <Navigate to="/" state={location} />
  );
};

export default PrivateRoutes;
