import { Suspense } from 'react';
import OvalLoader from 'components/ui/Loader';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
// import { useAuth } from 'utils/hooks/useAuth';

const PrivateRoutes = () => {
  const location = useLocation();
  // const { isLoggedIn } = useAuth();
  const isLoggedIn = true;

  return isLoggedIn ? (
    <Suspense fallback={<OvalLoader />}>
      <Outlet />
    </Suspense>
  ) : (
    <Navigate to="/" state={location} />
  );
};

export default PrivateRoutes;
