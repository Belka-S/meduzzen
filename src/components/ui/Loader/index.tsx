import { Oval } from 'react-loader-spinner';

const styles = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
};

const OvalLoader = () => (
  <Oval
    height={40}
    width={40}
    color="var(--alert-color)"
    wrapperStyle={styles}
    wrapperClass=""
    visible={true}
    ariaLabel="oval-loading"
    secondaryColor="var(--alert-color)"
    strokeWidth={6}
    strokeWidthSecondary={6}
  />
);

export default OvalLoader;
