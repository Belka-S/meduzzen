import { MouseEvent, useMemo, useState } from 'react';
import Analytics from 'components/Analytics';
import EditBarBtn from 'components/EditBarBtn';
import Modal from 'components/ui/Modal';
import H6 from 'components/ui/Typography/H6';
import CompanyForm from 'layouts/Footer/CompanyForm';
import QuizAddForm from 'pages/QuizPage/QuizForm/AddForm';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppExtraDispatch } from 'store';
import { acceptActionRequestThunk, addToAdminThunk } from 'store/action';
import { declineActionThunk, removeFromAdminThunk } from 'store/action';
import { createActionFromUserThunk } from 'store/action';
import { createActionFromCompanyThunk, leaveCompanyThunk } from 'store/action';
import { deleteCompanyThunk, editCompany } from 'store/company';
import { setCompanyAppendix, uncheckAllCompanies } from 'store/company';
import { getCompanyRequestsListThunk } from 'store/companyData';
import { getQuizzesListThunk } from 'store/companyData';
import { getInvitesListThunk } from 'store/companyData';
import { getMembersListThunk } from 'store/companyData';
import { setUserAppendix, uncheckAllUsers } from 'store/user';
import { getCompaniesListThunk } from 'store/userData';
import { getUserRequestsListThunk } from 'store/userData';
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
  const [isAddCompanyModal, setIsAddCompanyModal] = useState(false);
  const [isAddQuizModal, setIsAddQuizModal] = useState(false);
  const [isAnalyticsModal, setIsAnalyticsModal] = useState(false);

  const isMyCompany = company?.company_owner?.user_id === owner?.user_id;
  const isCompanyProfile = pathname.includes('/company/');
  const action = useMemo(
    () => companyData.members.find(el => el.user_id === owner?.user_id)?.action,
    [companyData.members, owner?.user_id],
  );

  const checkedInvites = useMemo(
    () =>
      checkedUsers.map(el => {
        const user = companyData.invites.find(
          item => item.user_id === el.user_id,
        );
        return user?.action_id;
      }),
    [checkedUsers, companyData.invites],
  );

  const checkedRequests = useMemo(
    () =>
      checkedUsers.map(el => {
        const user = companyData.requests.find(
          item => item.user_id === el.user_id,
        );
        return user?.action_id;
      }),
    [checkedUsers, companyData.requests],
  );

  // edit profile
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

  // actions
  const handleUncheckAll = () => {
    dispatch(setUserAppendix(null));
    dispatch(uncheckAllCompanies());
  };

  const handleNavigateToCompany = () => {
    dispatch(setUserAppendix('checked'));
    navigate(`/cluster/${owner?.user_id}`, { replace: true });
  };

  const handleGetIvitesList = async (e: MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.blur();
    const company_id = company?.company_id;
    company_id && (await dispatchExtra(getInvitesListThunk({ company_id })));
    dispatch(setCompanyAppendix('invites'));
  };

  const handleGetRequestsList = async (e: MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.blur();
    const company_id = company?.company_id;
    company_id &&
      (await dispatchExtra(getCompanyRequestsListThunk({ company_id })));
    dispatch(setCompanyAppendix('requests'));
  };

  const handleGetMembersList = async (e: MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.blur();
    const company_id = company?.company_id;
    company_id && (await dispatchExtra(getMembersListThunk({ company_id })));
    dispatch(setCompanyAppendix('members'));
  };

  const handleDeclineAction = () => {
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

  const handleAcceptRequest = () => {
    checkedRequests.forEach(async (action_id, i) => {
      if (!action_id) return;
      await dispatchExtra(acceptActionRequestThunk({ action_id }));
      if (i + 1 === checkedRequests.length && company?.company_id) {
        const { company_id } = company;
        await dispatchExtra(getCompanyRequestsListThunk({ company_id }));
        dispatch(uncheckAllUsers());
      }
    });
  };

  const handleRequestJoinCompany = () => {
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

  const handleLeaveCompany = () => {
    if (checkedCompanies[0]) {
      checkedCompanies.forEach(async ({ action_id }, i) => {
        if (!action_id) return;
        await dispatchExtra(leaveCompanyThunk({ action_id }));
        if (i + 1 === checkedCompanies.length && owner?.user_id) {
          const { user_id } = owner;
          await dispatchExtra(getCompaniesListThunk({ user_id }));
          dispatch(uncheckAllCompanies());
        }
      });
    }
    if (checkedUsers[0]) {
      checkedUsers.forEach(async ({ action_id }, i) => {
        if (!action_id) return;
        await dispatchExtra(leaveCompanyThunk({ action_id }));
        if (i + 1 === checkedUsers.length && company?.company_id) {
          navigate('/company', { replace: true });
          dispatch(uncheckAllUsers());
        }
      });
    }
  };

  const handleInviteUsersToCompany = (e: MouseEvent<HTMLButtonElement>) => {
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

  const handleAddToAdmin = () => {
    checkedUsers.forEach(async ({ action_id }, i) => {
      if (!action_id) return;
      await dispatchExtra(addToAdminThunk({ action_id }));
      if (i + 1 === checkedRequests.length && company?.company_id) {
        const { company_id } = company;
        await dispatchExtra(getMembersListThunk({ company_id }));
        dispatch(uncheckAllUsers());
      }
    });
  };

  const handleRemoveFromAdmin = () => {
    checkedUsers.forEach(async ({ action_id }, i) => {
      if (!action_id) return;
      await dispatchExtra(removeFromAdminThunk({ action_id }));
      if (i + 1 === checkedRequests.length && company?.company_id) {
        const { company_id } = company;
        await dispatchExtra(getMembersListThunk({ company_id }));
        dispatch(uncheckAllUsers());
      }
    });
  };

  const handleGetQuizzes = async (e: MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.blur();
    const company_id = company?.company_id;
    company_id && (await dispatchExtra(getQuizzesListThunk({ company_id })));
    dispatch(setCompanyAppendix('quizzes'));
  };

  return (
    <div className={s.editbar}>
      <EditBarBtn
        onClick={e => {
          e.preventDefault();
          setIsAnalyticsModal(!isAnalyticsModal);
        }}
        svgId="ui-chart"
        size={24}
        shownIf={action === 'owner' || action === 'admin'}
      />

      <EditBarBtn
        onClick={handleAddToAdmin}
        svgId="ui-admin_add"
        size={26}
        shownIf={
          select === 'owner' &&
          appendixCompany === 'members' &&
          !!companyData.members[1] &&
          !!checkedUsers[0]
        }
      />

      <EditBarBtn
        onClick={handleRemoveFromAdmin}
        svgId="ui-admin_block"
        size={26}
        shownIf={
          select === 'owner' &&
          appendixCompany === 'members' &&
          !!companyData.members[1] &&
          !!checkedUsers[0]
        }
      />

      <EditBarBtn
        onClick={handleGetIvitesList}
        svgId="ui-invite"
        shownIf={isMyCompany && isCompanyProfile && !checkedUsers[0]}
      />

      <EditBarBtn
        onClick={handleGetRequestsList}
        svgId="ui-request"
        shownIf={isMyCompany && isCompanyProfile && !checkedUsers[0]}
        size={24}
      />

      <EditBarBtn
        onClick={handleAcceptRequest}
        svgId="ui-accept"
        shownIf={
          (!!checkedInvites[0] || !!checkedRequests[0]) &&
          appendixCompany === 'requests'
        }
        size={24}
      />

      <EditBarBtn
        onClick={handleDeclineAction}
        svgId="ui-decline"
        shownIf={!!checkedInvites[0] || !!checkedRequests[0]}
        size={24}
      />

      <EditBarBtn
        onClick={handleLeaveCompany}
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
        onClick={handleGetMembersList}
        svgId="ui-members"
        shownIf={isCompanyProfile && select !== 'all'}
      />

      <EditBarBtn
        onClick={handleRequestJoinCompany}
        svgId="ui-add_company"
        shownIf={
          !!checkedCompanies[0] &&
          !checkedInvites[0] &&
          !checkedRequests[0] &&
          appendix !== 'checked'
        }
        size={24}
      />

      <EditBarBtn
        onClick={handleNavigateToCompany}
        svgId="ui-add_company"
        shownIf={
          pathname === '/company' &&
          !!checkedCompanies[0] &&
          appendixCompany === 'checked'
        }
        size={24}
      />

      <EditBarBtn
        onClick={handleInviteUsersToCompany}
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
        onClick={() => setIsAddQuizModal(!isAddQuizModal)}
        svgId="ui-quiz_add"
        size={26}
        shownIf={isCompanyProfile && select !== 'all'}
      />

      <EditBarBtn
        onClick={handleGetQuizzes}
        svgId="ui-quiz"
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
        onClick={handleUncheckAll}
        svgId="ui-uncheck"
        shownIf={pathname === '/company' && !!checkedCompanies[0]}
      />

      <EditBarBtn
        onClick={() => setIsAddCompanyModal(!isAddCompanyModal)}
        svgId="menu-plus"
        shownIf={!isCompanyProfile}
      />

      <H6>COMPANY</H6>

      {isAddCompanyModal && (
        <Modal
          className={s.modal}
          setIsModal={() => setIsAddCompanyModal(!isAddCompanyModal)}
        >
          <CompanyForm
            setIsModal={() => setIsAddCompanyModal(!isAddCompanyModal)}
          />
        </Modal>
      )}

      {isAddQuizModal && (
        <Modal
          className={s.modal}
          setIsModal={() => setIsAddQuizModal(!isAddQuizModal)}
        >
          <QuizAddForm setIsModal={() => setIsAddQuizModal(!isAddQuizModal)} />
        </Modal>
      )}

      {isAnalyticsModal && company && (
        <Modal setIsModal={() => setIsAnalyticsModal(!isAnalyticsModal)}>
          <Analytics company_id={company.company_id} />
        </Modal>
      )}
    </div>
  );
};

export default CompanyEditBar;
