import { MouseEvent, useState } from 'react';
import Button from 'components/ui/Button';
import Modal from 'components/ui/Modal';
import SvgIcon from 'components/ui/SvgIcon';
import H6 from 'components/ui/Typography/H6';
import CompanyForm from 'layouts/Footer/CompanyForm';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppExtraDispatch } from 'store';
import { deleteCompanyThunk, editCompany } from 'store/company';
import { useCompany, useUser } from 'utils/hooks';

import s from './index.module.scss';

const CompanyEditBar = () => {
  const dispatch = useAppDispatch();
  const dispatchExtra = useAppExtraDispatch();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { company, edit } = useCompany();
  const { owner } = useUser();
  const [isModal, setIsModal] = useState(false);

  const isMyCompany = company?.company_owner?.user_id === owner?.user_id;
  const isEdit = pathname.includes('/company/');

  const switchIsModal = () => setIsModal(!isModal);

  const handleUpdateInfo = (e: MouseEvent<HTMLButtonElement>) => {
    if (!owner?.is_superuser) {
      if (!isMyCompany) {
        e.preventDefault();
        e.currentTarget.blur();
        toast.error("It's not your account");
        return;
      }
      !edit && dispatch(editCompany('data'));
      edit && dispatch(editCompany(false));
    }
  };

  const handleDelete = (e: MouseEvent<HTMLButtonElement>) => {
    if (!company) return;
    if (!owner?.is_superuser) {
      if (!isMyCompany) {
        e.preventDefault();
        e.currentTarget.blur();
        toast.error("It's not your account");
        return;
      }
      const { company_name, company_id } = company;
      e.preventDefault();
      e.currentTarget.blur();
      if (confirm(`Are you sure you want to delete company: ${company_name}`)) {
        if (!company_id) return;
        dispatchExtra(deleteCompanyThunk(company_id))
          .unwrap()
          .then(res => toast.success(res.detail))
          .finally(() => navigate('/company', { replace: true }));
      }
    }
  };

  return (
    <>
      <div className={s.editbar}>
        {isEdit && (
          <>
            <Button color="outlined" variant="round" onClick={handleUpdateInfo}>
              <SvgIcon svgId="ui-edit" />
            </Button>
            <Button color="outlined" variant="round" onClick={handleDelete}>
              <SvgIcon svgId="ui-cross" />
            </Button>
          </>
        )}
        <Button color="outlined" variant="round" onClick={switchIsModal}>
          <SvgIcon svgId="ui-plus" />
        </Button>

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
