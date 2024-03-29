import { useState } from 'react';
import Button from 'components/ui/Button';
import Modal from 'components/ui/Modal';
import SvgIcon from 'components/ui/SvgIcon';
import H6 from 'components/ui/Typography/H6';
import CompanyForm from 'layouts/Footer/CompanyForm';

import s from './index.module.scss';

const CompanyEditBar = () => {
  const [isModal, setIsModal] = useState(false);

  const switchIsModal = () => setIsModal(!isModal);

  return (
    <>
      <div className={s.editbar}>
        <Button color="outlined" variant="round" onClick={switchIsModal}>
          <SvgIcon svgId="ui-plus" />
        </Button>
        {/* <Button color="outlined" variant="round">
          <SvgIcon svgId="menu-burger" size={30} />
        </Button> */}
        <H6>COMPANY</H6>
      </div>

      {isModal && (
        <Modal className={s.modal} setIsModal={switchIsModal}>
          <CompanyForm setIsModal={switchIsModal} />
        </Modal>
      )}
    </>
  );
};

export default CompanyEditBar;
