import { FC } from 'react';
import classNames from 'classnames';
import ProfileBtn from 'components/ProfileBtn';
import Button from 'components/ui/Button';
import SvgIcon from 'components/ui/SvgIcon';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppExtraDispatch } from 'store';
import { logout } from 'store/auth';
import { deleteUserThunk, editUser, TUser } from 'store/user';
import { trimName } from 'utils/helpers';
import { useUser } from 'utils/hooks';

import s from './index.module.scss';

type TUserProps = {
  user: TUser;
};

const UserItem: FC<TUserProps> = ({ user: userProps }) => {
  const { user_id, user_email, user_firstname, user_lastname } = userProps;
  const dispatch = useAppDispatch();
  const dispatchExtra = useAppExtraDispatch();
  const { user, owner } = useUser();

  const handleDeleteUser = () => {
    if (confirm(`Are you sure you want to delete user: ${user_email}`)) {
      dispatchExtra(deleteUserThunk(user_id));
      if (owner.user_id === user_id) {
        dispatch(logout());
      }
    }
  };

  const handleUpdateUserAvatar = () => {
    if (owner.is_superuser || owner.user_id === user_id) {
      dispatch(editUser('avatar'));
    } else {
      toast.error("It's not your account");
    }
  };

  const handleUpdateUserInfo = () => {
    if (owner.is_superuser || owner.user_id === user_id) {
      dispatch(editUser('data'));
    } else {
      toast.error("It's not your account");
    }
  };

  const isActive = user_id === user?.user_id;
  const isOwner = user_id === owner.user_id;
  const isLastName = user_firstname !== user_lastname;

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
      <ProfileBtn
        className={s.avatar}
        user={userProps}
        onClick={handleUpdateUserAvatar}
      />

      <span>{user_email}</span>
      <span>{trimName(user_firstname)}</span>
      <span>{isLastName && trimName(user_lastname)}</span>

      <Button
        className={s.button}
        variant="round"
        color="transparent"
        onClick={handleUpdateUserInfo}
      >
        <SvgIcon className={s.trash} svgId="ui-edit" />
      </Button>
      <Button
        className={s.button}
        variant="round"
        color="transparent"
        onClick={handleDeleteUser}
      >
        <SvgIcon className={s.trash} svgId="ui-trash" />
      </Button>

      <span>{user_id}</span>
    </NavLink>
  );
};

export default UserItem;
