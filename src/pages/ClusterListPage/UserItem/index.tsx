import { FC, MouseEvent } from 'react';
import classNames from 'classnames';
import ProfileBtn from 'components/ProfileBtn';
import Button from 'components/ui/Button';
import SvgIcon from 'components/ui/SvgIcon';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppExtraDispatch } from 'store';
import { logout } from 'store/auth';
import { cleanOwner, deleteUserThunk, editUser, TUser } from 'store/user';
import { trimName } from 'utils/helpers';
import { useUser } from 'utils/hooks';

import s from './index.module.scss';

type TUserProps = {
  props: TUser;
};

const UserItem: FC<TUserProps> = ({ props }) => {
  const { user_id, user_email, user_avatar } = props;
  const { user_firstname, user_lastname } = props;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const dispatchExtra = useAppExtraDispatch();
  const { user, owner } = useUser();

  if (!user_id) return;

  const isMyAccount = owner?.user_id === user_id;
  const isActive = user_id === user?.user_id;
  const isOwner = user_id === owner?.user_id;
  const isLastName = user_firstname !== user_lastname;
  const name = `${user_firstname} ${user_lastname}`;
  const ava = { id: user_id, url: user_avatar, name };

  const handleDelete = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.currentTarget.blur();
    if (!owner?.is_superuser) {
      if (!isMyAccount) {
        toast.error("It's not your account");
        return;
      }
    }
    if (confirm(`Are you sure you want to delete user: ${user_email}`)) {
      if (isMyAccount) {
        dispatch(cleanOwner());
        dispatch(logout());
      }
      navigate('/cluster', { replace: true });
      dispatchExtra(deleteUserThunk(user_id));
    }
  };

  const handleUpdateAvatar = (e: MouseEvent<HTMLDivElement>) => {
    if (!owner?.is_superuser) {
      if (!isMyAccount) {
        e.preventDefault();
        e.currentTarget.blur();
        toast.error("It's not your account");
        return;
      }
    }
    return dispatch(editUser('avatar'));
  };

  const handleUpdateInfo = (e: MouseEvent<HTMLButtonElement>) => {
    if (!owner?.is_superuser) {
      if (!isMyAccount) {
        e.preventDefault();
        e.currentTarget.blur();
        toast.error("It's not your account");
        return;
      }
    }
    dispatch(editUser('data'));
  };

  return (
    <NavLink
      to={`/cluster/${user_id}`}
      id={isActive ? 'active-user' : ''}
      className={classNames(
        s.item,
        s.hover,
        isActive && s.active,
        isOwner && s.owner,
      )}
    >
      <ProfileBtn className={s.avatar} ava={ava} onClick={handleUpdateAvatar} />

      <span>{user_email}</span>
      <span>{trimName(user_firstname ?? '')}</span>
      <span>{isLastName && trimName(user_lastname ?? '')}</span>

      <Button
        className={s.button}
        variant="round"
        color="transparent"
        onClick={handleUpdateInfo}
      >
        <SvgIcon className={s.trash} svgId="ui-edit" />
      </Button>
      <Button
        className={s.button}
        variant="round"
        color="transparent"
        onClick={handleDelete}
      >
        <SvgIcon className={s.trash} svgId="ui-trash" />
      </Button>

      <span>{user_id}</span>
    </NavLink>
  );
};

export default UserItem;
