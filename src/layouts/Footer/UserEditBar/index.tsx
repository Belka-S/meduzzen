import { MouseEvent } from 'react';
import Button from 'components/ui/Button';
import SvgIcon from 'components/ui/SvgIcon';
import H6 from 'components/ui/Typography/H6';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppExtraDispatch } from 'store';
import { acceptActionInviteThunk, declineActionThunk } from 'store/action';
import { createActionFromUserThunk } from 'store/action';
import { logout } from 'store/auth';
import { setCompanyAppendix, uncheckAllCompanies } from 'store/company';
import { cleanOwner, deleteUserThunk, editUser } from 'store/user';
import { setUserAppendix, uncheckAllUsers } from 'store/user';
import { getInvitesListThunk, getRequestsListThunk } from 'store/userData';
import { useAction, useCompany, useUser } from 'utils/hooks';

import s from './index.module.scss';

const UserEditBar = () => {
  const dispatch = useAppDispatch();
  const dispatchExtra = useAppExtraDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { checkedCompanies, appendix } = useCompany();
  const { owner, user, checkedUsers, edit, appendix: appendixUser } = useUser();
  const { userData } = useAction();

  const isMyAccount = owner?.user_id === user?.user_id;
  const isUserProfile = pathname.includes('/cluster/');
  const isUserList = pathname === '/cluster';
  const isUsersCheck = checkedUsers.length > 0;
  console.log('isUsersCheck: ', isUsersCheck);
  const isCompaniesCheck = checkedCompanies.length > 0;

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

  const getIvitesList = async (e: MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.blur();
    const user_id = owner?.user_id;
    user_id && (await dispatchExtra(getInvitesListThunk({ user_id })));
    dispatch(setUserAppendix('invites'));
  };

  const getRequestsList = async (e: MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.blur();
    const user_id = owner?.user_id;
    user_id && (await dispatchExtra(getRequestsListThunk({ user_id })));
    dispatch(setUserAppendix('requests'));
  };

  const declineAction = () => {
    if (!confirm(`Are you sure you want to decline?`)) return;
    if (checkedInvites[0]) {
      checkedInvites.forEach(async (action_id, i) => {
        action_id && (await dispatchExtra(declineActionThunk({ action_id })));
        if (i + 1 === checkedInvites.length && owner?.user_id) {
          const { user_id } = owner;
          await dispatchExtra(getInvitesListThunk({ user_id }));
          dispatch(uncheckAllCompanies());
        }
      });
    }
    if (checkedRequests[0]) {
      checkedRequests.forEach(async (action_id, i) => {
        action_id && (await dispatchExtra(declineActionThunk({ action_id })));
        if (i + 1 === checkedRequests.length && owner?.user_id) {
          const { user_id } = owner;
          await dispatchExtra(getRequestsListThunk({ user_id }));
          dispatch(uncheckAllCompanies());
        }
      });
    }
  };

  const acceptInvite = () => {
    if (!confirm(`Are you sure you want to accept?`)) return;
    checkedInvites.forEach(async (action_id, i) => {
      action_id &&
        (await dispatchExtra(acceptActionInviteThunk({ action_id })));
      if (i + 1 === checkedInvites.length && owner?.user_id) {
        const { user_id } = owner;
        await dispatchExtra(getInvitesListThunk({ user_id }));
        dispatch(uncheckAllCompanies());
      }
    });
  };

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
    const { user_email, user_id } = user;
    if (!owner?.is_superuser) {
      if (!isMyAccount) {
        toast.error("It's not your account");
        return;
      }
      e.currentTarget.blur();
      if (!confirm(`Are you sure you want to delete: ${user_email}`)) return;
      dispatch(cleanOwner());
      dispatch(logout());
      const { payload } = await dispatchExtra(deleteUserThunk({ user_id }));
      toast.success(payload.detail);
      navigate('/cluster', { replace: true });
    }
  };

  const requestJoinCompany = () => {
    checkedCompanies.map(async ({ company_id }, i) => {
      const params = { company_id };
      await dispatchExtra(createActionFromUserThunk(params));
      if (i + 1 === checkedCompanies.length && owner?.user_id) {
        const { user_id } = owner;
        await dispatchExtra(getRequestsListThunk({ user_id }));
        dispatch(uncheckAllCompanies());
        dispatch(setUserAppendix('requests'));
      }
    });
  };

  return (
    <div className={s.editbar}>
      {isMyAccount && isUserProfile && !isCompaniesCheck && (
        <>
          <Button color="outlined" variant="round" onClick={getIvitesList}>
            <SvgIcon svgId="ui-invite" />
          </Button>
          <Button color="outlined" variant="round" onClick={getRequestsList}>
            <SvgIcon svgId="ui-request" size={24} />
          </Button>
        </>
      )}

      {isMyAccount &&
      isCompaniesCheck &&
      appendix !== 'checked' &&
      !checkedInvites[0] &&
      !checkedRequests[0] ? (
        <Button color="outlined" variant="round" onClick={requestJoinCompany}>
          <SvgIcon svgId="ui-add_company" size={24} />
        </Button>
      ) : (
        (checkedInvites[0] || checkedRequests[0]) && (
          <>
            <Button
              className={appendixUser === 'invites' ? '' : 'hidden'}
              color="outlined"
              variant="round"
              onClick={acceptInvite}
            >
              <SvgIcon svgId="ui-accept" size={24} />
            </Button>

            <Button color="outlined" variant="round" onClick={declineAction}>
              <SvgIcon svgId="ui-decline" size={24} />
            </Button>
          </>
        )
      )}

      {isUserList && isUsersCheck && (
        <>
          <Button
            color="outlined"
            variant="round"
            onClick={() => {
              dispatch(setCompanyAppendix(null));
              dispatch(uncheckAllUsers());
            }}
          >
            <SvgIcon svgId="ui-circle_uncheck" />
          </Button>

          <Button
            color="outlined"
            variant="round"
            onClick={() => {
              dispatch(setCompanyAppendix('checked'));
              navigate('/company', { replace: true });
            }}
          >
            <SvgIcon svgId="ui-add_user" size={24} />
          </Button>
        </>
      )}

      {isUserProfile && (
        <>
          <Button color="outlined" variant="round" onClick={handleUpdateInfo}>
            <SvgIcon svgId="ui-edit" />
          </Button>
          <Button color="outlined" variant="round" onClick={handleDelete}>
            <SvgIcon svgId="ui-cross" />
          </Button>
        </>
      )}

      <H6>USER</H6>
    </div>
  );
};

export default UserEditBar;
