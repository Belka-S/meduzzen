import { MouseEvent } from 'react';
import EditBarBtn from 'components/EditBarBtn';
import H6 from 'components/ui/Typography/H6';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppExtraDispatch } from 'store';
import { acceptActionInviteThunk, declineActionThunk } from 'store/action';
import { createActionFromUserThunk } from 'store/action';
import { logout } from 'store/auth';
import { selectCompanies, setCompanyAppendix } from 'store/company';
import { uncheckAllCompanies } from 'store/company';
import { cleanOwner, deleteUserThunk, editUser } from 'store/user';
import { setUserAppendix, uncheckAllUsers } from 'store/user';
import { getInvitesListThunk, getUserRequestsListThunk } from 'store/userData';
import { useAction, useCompany, useUser } from 'utils/hooks';

import s from './index.module.scss';

const UserEditBar = () => {
  const dispatch = useAppDispatch();
  const dispatchExtra = useAppExtraDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { pathname } = useLocation();
  const { checkedCompanies, appendix } = useCompany();
  const { owner, user, checkedUsers, edit, appendix: appendixUser } = useUser();
  const { userData } = useAction();

  const isMyAccount = owner?.user_id === user?.user_id;
  const isUserProfile = pathname.includes('/cluster/');

  const checkedInvites = checkedCompanies.map(el => {
    const company = userData.invites.find(
      item => item.company_id === el.company_id,
    );
    return company?.action_id;
  });
  const checkedRequests = checkedCompanies.map(el => {
    const company = userData.requests.find(
      item => item.company_id === el.company_id,
    );
    return company?.action_id;
  });

  // edit profile
  const handleUpdateInfo = (e: MouseEvent<HTMLButtonElement>) => {
    if (!owner?.is_superuser) {
      if (!isMyAccount) {
        toast.error("It's not your account");
        return;
      }
      e.currentTarget.blur();
      !edit && dispatch(editUser('data'));
      edit && dispatch(editUser(false));
    }
  };

  const handleDelete = async (e: MouseEvent<HTMLButtonElement>) => {
    if (!user) return;
    const { user_id } = user;
    if (!owner?.is_superuser) {
      if (!isMyAccount) {
        toast.error("It's not your account");
        return;
      }
      e.currentTarget.blur();
      dispatch(cleanOwner());
      dispatch(logout());
      const { payload } = await dispatchExtra(deleteUserThunk({ user_id }));
      toast.success(payload.detail);
      navigate('/cluster', { replace: true });
    }
  };

  // actions
  const handleUncheckAll = () => {
    dispatch(setCompanyAppendix(null));
    dispatch(uncheckAllUsers());
  };

  const handleNavigateToCompany = () => {
    dispatch(setCompanyAppendix('checked'));
    if (state?.from?.pathname) {
      navigate(state.from.pathname, { replace: true });
      return;
    }
    dispatch(selectCompanies('owner'));
    navigate('/company', { replace: true });
  };

  const handleGetIvitesList = async (e: MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.blur();
    const user_id = owner?.user_id;
    user_id && (await dispatchExtra(getInvitesListThunk({ user_id })));
    dispatch(setUserAppendix('invites'));
  };

  const handleGetRequestsList = async (e: MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.blur();
    const user_id = owner?.user_id;
    user_id && (await dispatchExtra(getUserRequestsListThunk({ user_id })));
    dispatch(setUserAppendix('requests'));
  };

  const handleDeclineAction = () => {
    if (checkedInvites[0]) {
      checkedInvites.forEach(async (action_id, i) => {
        if (!action_id) return;
        await dispatchExtra(declineActionThunk({ action_id }));
        if (i + 1 === checkedInvites.length && owner?.user_id) {
          const { user_id } = owner;
          await dispatchExtra(getInvitesListThunk({ user_id }));
          dispatch(uncheckAllCompanies());
        }
      });
    }
    if (checkedRequests[0]) {
      checkedRequests.forEach(async (action_id, i) => {
        if (!action_id) return;
        await dispatchExtra(declineActionThunk({ action_id }));
        if (i + 1 === checkedRequests.length && owner?.user_id) {
          const { user_id } = owner;
          await dispatchExtra(getUserRequestsListThunk({ user_id }));
          dispatch(uncheckAllCompanies());
        }
      });
    }
  };

  const handleAcceptInvite = () => {
    checkedInvites.forEach(async (action_id, i) => {
      if (!action_id) return;
      await dispatchExtra(acceptActionInviteThunk({ action_id }));
      if (i + 1 === checkedInvites.length && owner?.user_id) {
        const { user_id } = owner;
        await dispatchExtra(getInvitesListThunk({ user_id }));
        dispatch(uncheckAllCompanies());
      }
    });
  };

  const handleRequestJoinCompany = () => {
    checkedCompanies.map(async ({ company_id }, i) => {
      const params = { company_id };
      await dispatchExtra(createActionFromUserThunk(params));
      if (i + 1 === checkedCompanies.length && owner?.user_id) {
        const { user_id } = owner;
        await dispatchExtra(getUserRequestsListThunk({ user_id }));
        dispatch(uncheckAllCompanies());
        dispatch(setUserAppendix('requests'));
      }
    });
  };

  return (
    <div className={s.editbar}>
      <EditBarBtn
        onClick={handleGetIvitesList}
        svgId="ui-invite"
        shownIf={isMyAccount && isUserProfile && !checkedCompanies[0]}
      />

      <EditBarBtn
        onClick={handleGetRequestsList}
        svgId="ui-request"
        shownIf={isMyAccount && isUserProfile && !checkedCompanies[0]}
        size={24}
      />

      <EditBarBtn
        onClick={handleRequestJoinCompany}
        svgId="ui-add_company"
        shownIf={
          isMyAccount &&
          !!checkedCompanies[0] &&
          !checkedInvites[0] &&
          !checkedRequests[0] &&
          appendix !== 'checked'
        }
        size={24}
      />

      <EditBarBtn
        onClick={handleAcceptInvite}
        svgId="ui-accept"
        shownIf={
          (!!checkedInvites[0] || !!checkedRequests[0]) &&
          appendixUser === 'invites'
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
        onClick={handleUncheckAll}
        svgId="ui-uncheck"
        shownIf={pathname === '/cluster' && !!checkedUsers[0]}
      />

      <EditBarBtn
        onClick={handleNavigateToCompany}
        svgId="ui-add_user"
        shownIf={pathname === '/cluster' && !!checkedUsers[0]}
        size={24}
      />

      <EditBarBtn
        onClick={handleUpdateInfo}
        svgId="ui-edit"
        shownIf={isUserProfile}
      />

      <EditBarBtn
        onClick={handleDelete}
        svgId="menu-cross"
        shownIf={isUserProfile}
      />

      <H6>USER</H6>
    </div>
  );
};

export default UserEditBar;
