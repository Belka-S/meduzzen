import { MouseEvent, useState } from 'react';
import Button from 'components/ui/Button';
import Modal from 'components/ui/Modal';
import SvgIcon from 'components/ui/SvgIcon';
import H6 from 'components/ui/Typography/H6';
import CompanyForm from 'layouts/Footer/CompanyForm';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppExtraDispatch } from 'store';
import { acceptActionRequestThunk, declineActionThunk } from 'store/action';
import { createActionFromCompanyThunk } from 'store/action';
import { deleteCompanyThunk, editCompany } from 'store/company';
import { setCompanyAppendix, uncheckAllCompanies } from 'store/company';
import { getInvitesListThunk, getRequestsListThunk } from 'store/companyData';
import { getMembersListThunk } from 'store/companyData';
import { setUserAppendix, uncheckAllUsers } from 'store/user';
import { useAction, useCompany, useUser } from 'utils/hooks';

import s from './index.module.scss';

const CompanyEditBar = () => {
  const dispatch = useAppDispatch();
  const dispatchExtra = useAppExtraDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { company, checkedCompanies, edit, select } = useCompany();
  const { appendix: appendixCompany } = useCompany();
  const { owner, checkedUsers, appendix } = useUser();
  const { companyData } = useAction();
  const [isModal, setIsModal] = useState(false);

  const isMyCompany = company?.company_owner?.user_id === owner?.user_id;
  const isCompanyProfile = pathname.includes('/company/');
  const isCompanyList = pathname === '/company';
  const isUsersCheck = checkedUsers.length > 0;
  const isCompaniesCheck = checkedCompanies.length > 0;

  const checkedInvites = checkedUsers.map(el => {
    const user = companyData.invites.find(item => item.user_id === el.user_id);
    return user?.action_id;
  });

  const checkedRequests = checkedUsers.map(el => {
    const user = companyData.requests.find(item => item.user_id === el.user_id);
    return user?.action_id;
  });

  const getIvitesList = async (e: MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.blur();
    const company_id = company?.company_id;
    company_id && (await dispatchExtra(getInvitesListThunk({ company_id })));
    dispatch(setCompanyAppendix('invites'));
  };

  const getRequestsList = async (e: MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.blur();
    const company_id = company?.company_id;
    company_id && (await dispatchExtra(getRequestsListThunk({ company_id })));
    dispatch(setCompanyAppendix('requests'));
  };

  const getMembersList = async (e: MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.blur();
    const company_id = company?.company_id;
    console.log('company_id: ', company_id);
    company_id && (await dispatchExtra(getMembersListThunk({ company_id })));
    dispatch(setCompanyAppendix('members'));
  };

  const declineAction = () => {
    if (!confirm(`Are you sure you want to decline?`)) return;
    if (checkedInvites[0]) {
      checkedInvites.forEach(async (action_id, i) => {
        action_id && (await dispatchExtra(declineActionThunk({ action_id })));
        if (i + 1 === checkedInvites.length && company?.company_id) {
          const { company_id } = company;
          await dispatchExtra(getInvitesListThunk({ company_id }));
          dispatch(uncheckAllUsers());
        }
      });
    }
    if (checkedRequests[0]) {
      checkedRequests.forEach(async (action_id, i) => {
        action_id && (await dispatchExtra(declineActionThunk({ action_id })));
        if (i + 1 === checkedRequests.length && company?.company_id) {
          const { company_id } = company;
          await dispatchExtra(getRequestsListThunk({ company_id }));
          dispatch(uncheckAllUsers());
        }
      });
    }
  };

  const acceptRequest = () => {
    if (!confirm(`Are you sure you want to accept?`)) return;
    checkedRequests.forEach(async (action_id, i) => {
      action_id &&
        (await dispatchExtra(acceptActionRequestThunk({ action_id })));
      if (i + 1 === checkedRequests.length && company?.company_id) {
        const { company_id } = company;
        await dispatchExtra(getRequestsListThunk({ company_id }));
        dispatch(uncheckAllUsers());
      }
    });
  };

  const handleUpdateInfo = (e: MouseEvent<HTMLButtonElement>) => {
    if (!owner?.is_superuser) {
      if (!isMyCompany) {
        toast.error("It's not your account");
        return;
      }
      e.currentTarget.blur();
      !edit && dispatch(editCompany('data'));
      edit && dispatch(editCompany(false));
    }
  };

  const handleDelete = async (e: MouseEvent<HTMLButtonElement>) => {
    if (!company) return;
    if (!owner?.is_superuser) {
      if (!isMyCompany) {
        toast.error("It's not your account");
        return;
      }
      const { company_name, company_id } = company;
      e.preventDefault();
      e.currentTarget.blur();
      if (!confirm(`Are you sure you want to delete: ${company_name}?`)) return;
      if (!company_id) return;
      const { payload } = await dispatchExtra(
        deleteCompanyThunk({ company_id }),
      );
      toast.success(payload.detail);
      navigate('/company', { replace: true });
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
      checkedUsers.map(async ({ user_id }, i) => {
        const { company_id } = company;
        const params = { company_id, user_id };
        await dispatchExtra(createActionFromCompanyThunk(params));
        if (i + 1 === checkedUsers.length && company?.company_id) {
          const { company_id } = company;
          await dispatchExtra(getInvitesListThunk({ company_id }));
          dispatch(uncheckAllUsers());
          dispatch(setCompanyAppendix('invites'));
        }
      });
    }
  };

  return (
    <div className={s.editbar}>
      {isMyCompany && isCompanyProfile && !isUsersCheck && (
        <>
          <Button color="outlined" variant="round" onClick={getIvitesList}>
            <SvgIcon svgId="ui-invite" />
          </Button>
          <Button color="outlined" variant="round" onClick={getRequestsList}>
            <SvgIcon svgId="ui-request" size={24} />
          </Button>
        </>
      )}

      {isMyCompany &&
      isUsersCheck &&
      appendix !== 'checked' &&
      !checkedInvites[0] &&
      !checkedRequests[0] ? (
        <Button color="outlined" variant="round" onClick={inviteUsersToCompany}>
          <SvgIcon svgId="ui-add_user" size={24} />
        </Button>
      ) : (
        (checkedInvites[0] || checkedRequests[0]) && (
          <>
            <Button
              className={appendixCompany === 'requests' ? '' : 'hidden'}
              color="outlined"
              variant="round"
              onClick={acceptRequest}
            >
              <SvgIcon svgId="ui-accept" size={24} />
            </Button>
            <Button color="outlined" variant="round" onClick={declineAction}>
              <SvgIcon svgId="ui-decline" size={24} />
            </Button>
          </>
        )
      )}

      {isCompanyList && isCompaniesCheck && (
        <>
          <Button
            color="outlined"
            variant="round"
            onClick={() => {
              dispatch(setUserAppendix(null));
              dispatch(uncheckAllCompanies());
            }}
          >
            <SvgIcon svgId="ui-circle_uncheck" />
          </Button>

          {select === 'all' && (
            <Button
              color="outlined"
              variant="round"
              onClick={() => {
                dispatch(setUserAppendix('checked'));
                navigate(`/cluster/${owner?.user_id}`, { replace: true });
              }}
            >
              <SvgIcon svgId="ui-add_company" size={24} />
            </Button>
          )}
        </>
      )}

      {isCompanyProfile && (
        <>
          <Button color="outlined" variant="round" onClick={getMembersList}>
            <SvgIcon svgId="ui-members" />
          </Button>
          <Button color="outlined" variant="round" onClick={handleUpdateInfo}>
            <SvgIcon svgId="ui-edit" />
          </Button>
          <Button color="outlined" variant="round" onClick={handleDelete}>
            <SvgIcon svgId="ui-cross" />
          </Button>
        </>
      )}

      {!isCompanyProfile && (
        <Button
          color="outlined"
          variant="round"
          onClick={() => setIsModal(!isModal)}
        >
          <SvgIcon svgId="ui-plus" />
        </Button>
      )}

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
