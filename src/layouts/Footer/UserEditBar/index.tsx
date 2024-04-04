import { MouseEvent } from 'react';
import Button from 'components/ui/Button';
import SvgIcon from 'components/ui/SvgIcon';
import H6 from 'components/ui/Typography/H6';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppExtraDispatch } from 'store';
import { createActionFromUserThunk } from 'store/action';
import { logout } from 'store/auth';
import { setCompanyAppendix, uncheckAllCompanies } from 'store/company';
import { cleanOwner, deleteUserThunk, editUser } from 'store/user';
import { setUserAppendix, uncheckAllUsers } from 'store/user';
import { getIvitesListThunk, getRequestsListThunk } from 'store/userData';
import { useCompany, useUser } from 'utils/hooks';

import s from './index.module.scss';

const UserEditBar = () => {
  const dispatch = useAppDispatch();
  const dispatchExtra = useAppExtraDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { checkedCompanies, appendix } = useCompany();
  const { owner, user, checkedUsers, edit } = useUser();

  const isMyAccount = owner?.user_id === user?.user_id;
  const isUserProfile = pathname.includes('/cluster/');
  const isUserList = pathname === '/cluster';
  const isUsersCheck = checkedUsers.length > 0;
  const isCompaniesCheck = checkedCompanies.length > 0;

  const getIvitesList = async (e: MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.blur();
    const user_id = owner?.user_id;
    user_id && (await dispatchExtra(getIvitesListThunk({ user_id })));
    dispatch(setUserAppendix('invites'));
  };

  const getRequestsList = async (e: MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.blur();
    const user_id = owner?.user_id;
    user_id && (await dispatchExtra(getRequestsListThunk({ user_id })));
    dispatch(setUserAppendix('requests'));
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
      if (confirm(`Are you sure you want to delete user: ${user_email}`)) {
        dispatch(cleanOwner());
        dispatch(logout());
        const { payload } = await dispatchExtra(deleteUserThunk({ user_id }));
        toast.success(payload.detail);
        navigate('/cluster', { replace: true });
      }
    }
  };

  const requestToJoinCompany = () => {
    checkedCompanies.map(async ({ company_id }) => {
      const params = { company_id };
      console.log('company_id: ', company_id);
      await dispatchExtra(createActionFromUserThunk(params));
    });
    dispatch(uncheckAllCompanies());
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

      {isMyAccount && isCompaniesCheck && appendix !== 'checked' && (
        <Button color="outlined" variant="round" onClick={requestToJoinCompany}>
          <SvgIcon svgId="ui-add_company" size={24} />
        </Button>
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
