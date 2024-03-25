import { FC } from 'react';
import classNames from 'classnames';
import ProfileBtn from 'components/ProfileBtn';
import Button from 'components/ui/Button';
import SvgIcon from 'components/ui/SvgIcon';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppExtraDispatch } from 'store';
import { logout } from 'store/auth';
import { deleteUserThunk, editActiveUser, TUser } from 'store/user';
import { trimName } from 'utils/helpers';
import { useAuth, useUser } from 'utils/hooks';

import s from './index.module.scss';

type TUserProps = {
  user: TUser;
};

const UserItem: FC<TUserProps> = ({ user }) => {
  const { user_id, user_email, user_firstname, user_lastname } = user;
  const dispatch = useAppDispatch();
  const dispatchExtra = useAppExtraDispatch();
  const { activeUser } = useUser();
  const { user: owner } = useAuth();

  const handleDeleteUser = () => {
    if (confirm(`Are you sure you want to delete user: ${user_email}`)) {
      dispatchExtra(deleteUserThunk(user_id));
      if (owner.user_id === user_id) {
        dispatch(logout());
      }
    }
  };

  const handleeditActiveUserAvatar = () => {
    if (owner.is_superuser || owner.user_id === user_id) {
      dispatch(editActiveUser({ edit: 'avatar' }));
    } else {
      toast.error("It's not your account");
    }
  };

  const handleUpdateUserInfo = () => {
    if (owner.is_superuser || owner.user_id === user_id) {
      dispatch(editActiveUser({ edit: 'data' }));
    } else {
      toast.error("It's not your account");
    }
  };

  const isActive = user_id === activeUser.user_id;
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
        user={user}
        onClick={handleeditActiveUserAvatar}
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
