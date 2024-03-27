import { lazy, useEffect } from 'react';
import OvalLoader from 'components/ui/Loader';
import Toast from 'components/ui/Toast';
import SharedLayout from 'layouts/SharedLayout';
import { Navigate, Route, Routes } from 'react-router-dom';
import PrivateRoutes from 'routes/PrivateRoutes';
import PublicRoutes from 'routes/PublicRoutes';
import { useAppDispatch, useAppExtraDispatch } from 'store';
import { login } from 'store/auth';
import { loginThunk } from 'store/auth';
import { loadWebFonts } from 'styles/loadWebFonts';
import { useAuth } from 'utils/hooks';

import { useAuth0 } from '@auth0/auth0-react';

const HomePage = lazy(() => import('pages/HomePage'));
const AboutPage = lazy(() => import('pages/AboutPage'));
const SignupPage = lazy(() => import('pages/SignupPage'));
const SigninPage = lazy(() => import('pages/SigninPage'));
const ClusterListPage = lazy(() => import('pages/ClusterListPage'));
const ClusterPage = lazy(() => import('pages/ClusterPage'));
const CompanyListPage = lazy(() => import('pages/CompanyListPage'));
const CompanyPage = lazy(() => import('pages/CompanyPage'));

const App = () => {
  const dispatch = useAppDispatch();
  const dispatchExtra = useAppExtraDispatch();
  const { isLoading, isAuth } = useAuth();
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  useEffect(() => {
    loadWebFonts();
  }, []);

  useEffect(() => {
    isAuthenticated &&
      getAccessTokenSilently()
        .then(access_token => dispatch(login({ result: { access_token } })))
        .then(() => dispatchExtra(loginThunk()));
  }, [dispatch, dispatchExtra, getAccessTokenSilently, isAuthenticated]);

  return (
    <>
      {(!isLoading || isAuth) && (
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route element={<PublicRoutes />}>
              <Route path="signup" element={<SignupPage />} />
              <Route path="signin" element={<SigninPage />} />
            </Route>
            <Route element={<PrivateRoutes />}>
              <Route path="cluster" element={<ClusterListPage />} />
              <Route path="cluster/:id" element={<ClusterPage />} />
              <Route path="company" element={<CompanyListPage />} />
              <Route path="company/:id" element={<CompanyPage />} />
            </Route>
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      )}

      {isLoading && <OvalLoader />}

      <Toast />
    </>
  );
};

export default App;
