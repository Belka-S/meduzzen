import { MouseEvent, useState } from 'react';
import Button from 'components/ui/Button';
import Modal from 'components/ui/Modal';
import SvgIcon from 'components/ui/SvgIcon';
import H6 from 'components/ui/Typography/H6';
import CompanyForm from 'layouts/Footer/CompanyForm';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppExtraDispatch } from 'store';
import { createActionFromCompanyThunk } from 'store/action';
import { deleteCompanyThunk, editCompany } from 'store/company';
import { setProfileAppendix, uncheckAllCompanies } from 'store/company';
import { getInvitesListThunk, getRequestsListThunk } from 'store/companyData';
import { uncheckAllUsers } from 'store/user';
import { useCompany, useUser } from 'utils/hooks';

import s from './index.module.scss';

const CompanyEditBar = () => {
  const dispatch = useAppDispatch();
  const dispatchExtra = useAppExtraDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { company, checkedCompanies, profileAppendix, edit } = useCompany();
  const { owner, checkedUsers } = useUser();
  const [isModal, setIsModal] = useState(false);

  const isMyCompany = company?.company_owner?.user_id === owner?.user_id;
  const isUncheck = checkedCompanies.length > 0 && pathname === '/company';
  const isCheck = checkedUsers.length > 0 && pathname.includes('/company/');

  const getIvitesListList = async (e: MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.blur();
    const company_id = company?.company_id;
    company_id && (await dispatchExtra(getInvitesListThunk({ company_id })));
    dispatch(setProfileAppendix('invites'));
  };

  const getRequestsList = async (e: MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.blur();
    const company_id = company?.company_id;
    company_id && (await dispatchExtra(getRequestsListThunk({ company_id })));
    dispatch(setProfileAppendix('requests'));
  };

  const handleUpdateInfo = (e: MouseEvent<HTMLButtonElement>) => {
    if (!owner?.is_superuser) {
      if (!isMyCompany) {
        e.currentTarget.blur();
        toast.error("It's not your account");
        return;
      }
      !edit && dispatch(editCompany('data'));
      edit && dispatch(editCompany(false));
    }
  };

  const handleDelete = async (e: MouseEvent<HTMLButtonElement>) => {
    if (!company) return;
    if (!owner?.is_superuser) {
      if (!isMyCompany) {
        e.currentTarget.blur();
        toast.error("It's not your account");
        return;
      }
      const { company_name, company_id } = company;
      e.preventDefault();
      e.currentTarget.blur();
      if (confirm(`Are you sure you want to delete company: ${company_name}`)) {
        if (!company_id) return;
        const { payload } = await dispatchExtra(deleteCompanyThunk(company_id));
        toast.success(payload.detail);
        navigate('/company', { replace: true });
      }
    }
  };

  const inviteUsersToCompany = (e: MouseEvent<HTMLButtonElement>) => {
    if (!company) return;
    if (!owner?.is_superuser) {
      if (!isMyCompany) {
        e.currentTarget.blur();
        toast.error("It's not your account");
        return;
      }
      checkedUsers.map(async ({ user_id }) => {
        const { company_id } = company;
        const params = { company_id, user_id };
        await dispatchExtra(createActionFromCompanyThunk(params));
      });
      dispatch(uncheckAllUsers());
    }
  };

  return (
    <div className={s.editbar}>
      {isMyCompany && pathname.includes('/company/') && (
        <>
          <Button color="outlined" variant="round" onClick={getIvitesListList}>
            <SvgIcon svgId="ui-invite" />
          </Button>
          <Button color="outlined" variant="round" onClick={getRequestsList}>
            <SvgIcon svgId="ui-request" size={24} />
          </Button>
        </>
      )}

      {isMyCompany &&
        isCheck &&
        (profileAppendix !== 'checked' ? (
          <Button
            color="outlined"
            variant="round"
            onClick={e => {
              dispatch(setProfileAppendix('checked'));
              e.currentTarget.blur();
            }}
          >
            <SvgIcon svgId="ui-circle_check" />
          </Button>
        ) : (
          <Button
            color="outlined"
            variant="round"
            onClick={inviteUsersToCompany}
          >
            <SvgIcon svgId="ui-add_user" size={24} />
          </Button>
        ))}

      {isUncheck && (
        <>
          <Button
            color="outlined"
            variant="round"
            onClick={() => dispatch(uncheckAllCompanies())}
          >
            <SvgIcon svgId="ui-circle_uncheck" />
          </Button>

          <Button
            color="outlined"
            variant="round"
            onClick={() =>
              navigate(`/cluster/${owner?.user_id}`, { replace: true })
            }
          >
            <SvgIcon svgId="ui-add_company" size={24} />
          </Button>
        </>
      )}

      {pathname.includes('/company/') && (
        <>
          <Button color="outlined" variant="round" onClick={handleUpdateInfo}>
            <SvgIcon svgId="ui-edit" />
          </Button>
          <Button color="outlined" variant="round" onClick={handleDelete}>
            <SvgIcon svgId="ui-cross" />
          </Button>
        </>
      )}

      <Button
        color="outlined"
        variant="round"
        onClick={() => setIsModal(!isModal)}
      >
        <SvgIcon svgId="ui-plus" />
      </Button>

      <H6>COMPANY</H6>

      {isModal && (
        <Modal className={s.modal} setIsModal={() => setIsModal(!isModal)}>
          <CompanyForm setIsModal={() => setIsModal(!isModal)} />
        </Modal>
      )}
    </div>
  );
};

export default CompanyEditBar;
