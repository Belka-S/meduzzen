import { Suspense } from 'react';
import OvalLoader from 'components/Loader';
import Footer from 'layouts/Footer';
import Header from 'layouts/Header';
import { Outlet } from 'react-router-dom';

const SharedLayout = () => {
  return (
    <>
      <Header />

      <Suspense fallback={<OvalLoader />}>
        <Outlet />
      </Suspense>

      <Footer />
    </>
  );
};

export default SharedLayout;
