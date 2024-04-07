import { MouseEvent, useState } from 'react';
import EditBarBtn from 'components/EditBarBtn';
import Modal from 'components/ui/Modal';
import H6 from 'components/ui/Typography/H6';
import CompanyForm from 'layouts/Footer/CompanyForm';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppExtraDispatch } from 'store';
import {
  acceptActionRequestThunk,
  createActionFromUserThunk,
  declineActionThunk,
} from 'store/action';
import { createActionFromCompanyThunk, leaveCompanyThunk } from 'store/action';
import { deleteCompanyThunk, editCompany } from 'store/company';
import { setCompanyAppendix, uncheckAllCompanies } from 'store/company';
import {
  getCompanyRequestsListThunk,
  getInvitesListThunk,
} from 'store/companyData';
import { getMembersListThunk } from 'store/companyData';
import { setUserAppendix, uncheckAllUsers } from 'store/user';
import {
  getCompaniesListThunk,
  getUserRequestsListThunk,
} from 'store/userData';
import { useAction, useCompany, useUser } from 'utils/hooks';

import s from './index.module.scss';

const CompanyEditBar = () => {
  const dispatch = useAppDispatch();
  const dispatchExtra = useAppExtraDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = useLocation();
  const { company, checkedCompanies, edit } = useCompany();
  const { appendix: appendixCompany, select } = useCompany();
  const { owner, checkedUsers, appendix } = useUser();
  const { companyData } = useAction();
  const [isModal, setIsModal] = useState(false);

  const isMyCompany = company?.company_owner?.user_id === owner?.user_id;
  const isCompanyProfile = pathname.includes('/company/');

  const checkedInvites = checkedUsers.map(el => {
    const user = companyData.invites.find(item => item.user_id === el.user_id);
    return user?.action_id;
  });

  const checkedRequests = checkedUsers.map(el => {
    const user = companyData.requests.find(item => item.user_id === el.user_id);
    return user?.action_id;
  });

  const uncheckAll = () => {
    dispatch(setUserAppendix(null));
    dispatch(uncheckAllCompanies());
  };

  const navigateToCompany = () => {
    dispatch(setUserAppendix('checked'));
    navigate(`/cluster/${owner?.user_id}`, { replace: true });
  };

  const getIvitesList = async (e: MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.blur();
    const company_id = company?.company_id;
    company_id && (await dispatchExtra(getInvitesListThunk({ company_id })));
    dispatch(setCompanyAppendix('invites'));
  };

  const getRequestsList = async (e: MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.blur();
    const company_id = company?.company_id;
    company_id &&
      (await dispatchExtra(getCompanyRequestsListThunk({ company_id })));
    dispatch(setCompanyAppendix('requests'));
  };

  const getMembersList = async (e: MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.blur();
    const company_id = company?.company_id;
    company_id && (await dispatchExtra(getMembersListThunk({ company_id })));
    dispatch(setCompanyAppendix('members'));
  };

  const declineAction = () => {
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
          await dispatchExtra(getCompanyRequestsListThunk({ company_id }));
          dispatch(uncheckAllUsers());
        }
      });
    }
  };

  const acceptRequest = () => {
    checkedRequests.forEach(async (action_id, i) => {
      action_id &&
        (await dispatchExtra(acceptActionRequestThunk({ action_id })));
      if (i + 1 === checkedRequests.length && company?.company_id) {
        const { company_id } = company;
        await dispatchExtra(getCompanyRequestsListThunk({ company_id }));
        dispatch(uncheckAllUsers());
      }
    });
  };

  const requestJoinCompany = () => {
    checkedCompanies.map(async ({ company_id }, i) => {
      const params = { company_id };
      await dispatchExtra(createActionFromUserThunk(params));
      if (i + 1 === checkedCompanies.length && owner?.user_id) {
        const { user_id } = owner;
        dispatch(uncheckAllCompanies());
        dispatch(setUserAppendix('requests'));
        await dispatchExtra(getUserRequestsListThunk({ user_id }));
        navigate(`/cluster/${user_id}`, { replace: true });
      }
    });
  };

  const leaveCompany = () => {
    if (checkedCompanies[0]) {
      checkedCompanies.forEach(async ({ action_id }, i) => {
        action_id && (await dispatchExtra(leaveCompanyThunk({ action_id })));
        if (i + 1 === checkedCompanies.length && owner?.user_id) {
          const { user_id } = owner;
          await dispatchExtra(getCompaniesListThunk({ user_id }));
          dispatch(uncheckAllCompanies());
        }
      });
    }
    if (checkedUsers[0]) {
      checkedUsers.forEach(async ({ action_id }, i) => {
        action_id && (await dispatchExtra(leaveCompanyThunk({ action_id })));
        console.log('action_id: ', action_id);
        if (i + 1 === checkedUsers.length && company?.company_id) {
          navigate('/company', { replace: true });
          dispatch(uncheckAllUsers());
        }
      });
    }
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
    const { company_id, company_name } = company;
    if (!confirm(`Are you sure you want to delete: ${company_name}`)) return;
    if (!owner?.is_superuser) {
      if (!isMyCompany) {
        toast.error("It's not your account");
        return;
      }
      e.preventDefault();
      e.currentTarget.blur();
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
      if (!checkedUsers[0]) {
        return navigate('/cluster', {
          replace: true,
          state: { from: location },
        });
      }
      if (appendixCompany === 'members') {
        return dispatch(setCompanyAppendix('checked'));
      }
      checkedUsers.map(async ({ user_id }, i) => {
        const { company_id } = company;
        const params = { company_id, user_id };
        await dispatchExtra(createActionFromCompanyThunk(params));
        if (i + 1 === checkedUsers.length && company?.company_id) {
          const { company_id } = company;
          await dispatchExtra(getInvitesListThunk({ company_id }));
          dispatch(uncheckAllUsers());
        }
      });
    }
  };

  return (
    <div className={s.editbar}>
      <EditBarBtn
        onClick={getIvitesList}
        svgId="ui-invite"
        shownIf={isMyCompany && isCompanyProfile && !checkedUsers[0]}
      />

      <EditBarBtn
        onClick={getRequestsList}
        svgId="ui-request"
        shownIf={isMyCompany && isCompanyProfile && !checkedUsers[0]}
        size={24}
      />

      <EditBarBtn
        onClick={inviteUsersToCompany}
        svgId="ui-add_user"
        shownIf={
          isMyCompany &&
          !checkedInvites[0] &&
          !checkedRequests[0] &&
          appendix !== 'checked'
        }
        size={24}
      />

      <EditBarBtn
        svgId="ui-add_company"
        shownIf={
          !!checkedCompanies[0] &&
          !checkedInvites[0] &&
          !checkedRequests[0] &&
          appendix !== 'checked'
        }
        size={24}
        onClick={requestJoinCompany}
      />

      <EditBarBtn
        onClick={acceptRequest}
        svgId="ui-accept"
        shownIf={
          (!!checkedInvites[0] || !!checkedRequests[0]) &&
          appendixCompany === 'requests'
        }
        size={24}
      />

      <EditBarBtn
        onClick={declineAction}
        svgId="ui-decline"
        shownIf={!!checkedInvites[0] || !!checkedRequests[0]}
        size={24}
      />

      <EditBarBtn
        onClick={navigateToCompany}
        svgId="ui-add_company"
        shownIf={
          pathname === '/company' &&
          !!checkedCompanies[0] &&
          appendixCompany === 'checked'
        }
        size={24}
      />

      <EditBarBtn
        onClick={leaveCompany}
        svgId="ui-member_block"
        shownIf={
          (pathname.includes('/company/') &&
            !!checkedUsers[0] &&
            appendixCompany === 'members') ||
          (!!checkedCompanies[0] && select === 'member')
        }
        size={24}
      />

      <EditBarBtn
        onClick={getMembersList}
        svgId="ui-members"
        shownIf={isCompanyProfile && select !== 'all'}
      />

      <EditBarBtn
        svgId="ui-edit"
        onClick={handleUpdateInfo}
        shownIf={isCompanyProfile}
      />

      <EditBarBtn
        onClick={handleDelete}
        svgId="menu-cross"
        shownIf={isCompanyProfile}
      />

      <EditBarBtn
        onClick={uncheckAll}
        svgId="ui-uncheck"
        shownIf={pathname === '/company' && !!checkedCompanies[0]}
      />

      <EditBarBtn
        onClick={() => setIsModal(!isModal)}
        svgId="menu-plus"
        shownIf={!isCompanyProfile}
      />

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
