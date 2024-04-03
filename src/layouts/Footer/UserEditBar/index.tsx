import { MouseEvent } from 'react';
import Button from 'components/ui/Button';
import SvgIcon from 'components/ui/SvgIcon';
import H6 from 'components/ui/Typography/H6';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppExtraDispatch } from 'store';
import { createActionFromUserThunk } from 'store/action';
import { logout } from 'store/auth';
import { uncheckAllCompanies } from 'store/company';
import { cleanOwner, deleteUserThunk, editUser } from 'store/user';
import { setProfileAppendix, uncheckAllUsers } from 'store/user';
import { getIvitesListThunk, getRequestsListThunk } from 'store/userData';
import { useCompany, useUser } from 'utils/hooks';

import s from './index.module.scss';

const UserEditBar = () => {
  const dispatch = useAppDispatch();
  const dispatchExtra = useAppExtraDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { checkedCompanies } = useCompany();
  const { owner, user, checkedUsers, profileAppendix, edit } = useUser();

  const isMyAccount = owner?.user_id === user?.user_id;
  const isUncheck = checkedUsers.length > 0 && pathname === '/cluster';
  const isCheck = checkedCompanies.length > 0 && pathname.includes('/cluster/');

  const getIvitesListList = async (e: MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.blur();
    const user_id = owner?.user_id;
    user_id && (await dispatchExtra(getIvitesListThunk({ user_id })));
    dispatch(setProfileAppendix('invites'));
  };

  const getRequestsList = async (e: MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.blur();
    const user_id = owner?.user_id;
    user_id && (await dispatchExtra(getRequestsListThunk({ user_id })));
    dispatch(setProfileAppendix('requests'));
  };

  const handleUpdateInfo = (e: MouseEvent<HTMLButtonElement>) => {
    if (!owner?.is_superuser) {
      if (!isMyAccount) {
        e.currentTarget.blur();
        toast.error("It's not your account");
        return;
      }
      !edit && dispatch(editUser('data'));
      edit && dispatch(editUser(false));
    }
  };

  const handleDelete = async (e: MouseEvent<HTMLButtonElement>) => {
    if (!user) return;
    const { user_email, user_id } = user;
    if (!owner?.is_superuser) {
      if (!isMyAccount) {
        e.currentTarget.blur();
        toast.error("It's not your account");
        return;
      }
      e.currentTarget.blur();
      if (confirm(`Are you sure you want to delete user: ${user_email}`)) {
        dispatch(cleanOwner());
        dispatch(logout());
        const { payload } = await dispatchExtra(deleteUserThunk(user_id));
        toast.success(payload.detail);
        navigate('/cluster', { replace: true });
      }
    }
  };

  const sendRequestToEnterCompany = () => {
    checkedCompanies.map(async ({ company_id }) => {
      const params = { company_id };
      console.log('company_id: ', company_id);
      await dispatchExtra(createActionFromUserThunk(params));
    });
    dispatch(uncheckAllCompanies());
  };

  return (
    <div className={s.editbar}>
      {isMyAccount && pathname.includes('/cluster/') && (
        <>
          <Button color="outlined" variant="round" onClick={getIvitesListList}>
            <SvgIcon svgId="ui-invite" />
          </Button>
          <Button color="outlined" variant="round" onClick={getRequestsList}>
            <SvgIcon svgId="ui-request" size={24} />
          </Button>
        </>
      )}

      {isMyAccount &&
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
            onClick={sendRequestToEnterCompany}
          >
            <SvgIcon svgId="ui-add_company" size={24} />
          </Button>
        ))}

      {isUncheck && (
        <>
          <Button
            color="outlined"
            variant="round"
            onClick={() => dispatch(uncheckAllUsers())}
          >
            <SvgIcon svgId="ui-circle_uncheck" />
          </Button>

          <Button
            color="outlined"
            variant="round"
            onClick={() => navigate('/company', { replace: true })}
          >
            <SvgIcon svgId="ui-add_user" size={24} />
          </Button>
        </>
      )}

      {pathname.includes('/cluster/') && (
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
