import { MouseEvent } from 'react';
import Button from 'components/ui/Button';
import SvgIcon from 'components/ui/SvgIcon';
import H6 from 'components/ui/Typography/H6';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppExtraDispatch } from 'store';
import { logout } from 'store/auth';
import { cleanOwner, deleteUserThunk, editUser } from 'store/user';
import { useUser } from 'utils/hooks';

import s from './index.module.scss';

const UserEditBar = () => {
  const dispatch = useAppDispatch();
  const dispatchExtra = useAppExtraDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { owner, user, edit } = useUser();

  if (!user) return;
  const { user_email, user_id } = user;
  const isMyAccount = owner?.user_id === user?.user_id;
  const isEdit = pathname.includes('/cluster/');

  const handleUpdateInfo = (e: MouseEvent<HTMLButtonElement>) => {
    if (!owner?.is_superuser) {
      if (!isMyAccount) {
        e.preventDefault();
        e.currentTarget.blur();
        toast.error("It's not your account");
        return;
      }
      !edit && dispatch(editUser('data'));
      edit && dispatch(editUser(false));
    }
  };

  const handleDelete = (e: MouseEvent<HTMLButtonElement>) => {
    if (!owner?.is_superuser) {
      if (!isMyAccount) {
        e.preventDefault();
        e.currentTarget.blur();
        toast.error("It's not your account");
        return;
      }
      e.preventDefault();
      e.currentTarget.blur();
      if (confirm(`Are you sure you want to delete user: ${user_email}`)) {
        dispatch(cleanOwner());
        dispatch(logout());
        user_id &&
          dispatchExtra(deleteUserThunk(user_id))
            .unwrap()
            .then(res => toast.success(res?.detail));
        navigate('/cluster', { replace: true });
      }
    }
  };

  if (!isEdit) return;
  return (
    <div className={s.editbar}>
      <Button color="outlined" variant="round" onClick={handleUpdateInfo}>
        <SvgIcon svgId="ui-edit" />
      </Button>
      <Button color="outlined" variant="round" onClick={handleDelete}>
        <SvgIcon svgId="ui-cross" />
      </Button>

      <H6>USER</H6>
    </div>
  );
};

export default UserEditBar;
