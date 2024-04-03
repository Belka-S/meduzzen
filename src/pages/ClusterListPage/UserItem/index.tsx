import { FC, MouseEvent } from 'react';
import classNames from 'classnames';
import ProfileBtn from 'components/ProfileBtn';
import Button from 'components/ui/Button';
import SvgIcon from 'components/ui/SvgIcon';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { TUserFromList, useAppDispatch, useAppExtraDispatch } from 'store';
import { logout } from 'store/auth';
import { checkUser, cleanOwner, deleteUserThunk } from 'store/user';
import { editUser, uncheckUser } from 'store/user';
import { trimName } from 'utils/helpers';
import { useUser } from 'utils/hooks';

import s from './index.module.scss';

type TUserProps = {
  props: TUserFromList;
};

const UserItem: FC<TUserProps> = ({ props }) => {
  const { user_id, user_email, user_avatar } = props;
  const { user_firstname, user_lastname } = props;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const dispatchExtra = useAppExtraDispatch();
  const { user, owner, checkedUsers } = useUser();

  if (!user_id) return;
  const isChecked = checkedUsers.some(el => el.user_id === user_id);
  const isMyAccount = owner?.user_id === user_id;
  const isActive = user_id === user?.user_id;
  const isOwner = user_id === owner?.user_id;
  const isLastName = user_firstname !== user_lastname;
  const name = `${user_firstname} ${user_lastname}`;
  const ava = { id: user_id, url: user_avatar, name };

  const handleDelete = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.currentTarget.blur();
    if (!owner?.is_superuser) {
      if (!isMyAccount) {
        toast.error("It's not your account");
        return;
      }
    }
    if (confirm(`Are you sure you want to delete user: ${user_email}`)) {
      dispatch(cleanOwner());
      dispatch(logout());
      if (user_id) {
        const { payload } = await dispatchExtra(deleteUserThunk(user_id));
        toast.success(payload.detail);
        navigate('/cluster', { replace: true });
      }
    }
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

  const handleCheck = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(checkUser({ user_id }));
  };

  const handleUncheck = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(uncheckUser({ user_id }));
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
      <ProfileBtn className={s.avatar} ava={ava} />

      <span>{user_email}</span>
      <span>{trimName(user_firstname ?? '')}</span>
      <span>{isLastName && trimName(user_lastname ?? '')}</span>

      <Button
        className={s.button}
        variant="round"
        color="transparent"
        onClick={handleUpdateInfo}
      >
        <SvgIcon className={s.icon_svg} svgId="ui-edit" />
      </Button>
      <Button
        className={s.button}
        variant="round"
        color="transparent"
        onClick={handleDelete}
      >
        <SvgIcon className={s.icon_svg} svgId="ui-trash" />
      </Button>

      {!isChecked && (
        <Button
          className={s.button}
          variant="round"
          color="transparent"
          onClick={handleCheck}
        >
          <SvgIcon className={s.icon_svg} svgId="ui-circle_uncheck" />
        </Button>
      )}

      {isChecked && (
        <Button
          className={s.button}
          variant="round"
          color="transparent"
          onClick={handleUncheck}
        >
          <SvgIcon className={s.icon_svg__shown} svgId="ui-circle_check" />
        </Button>
      )}

      <span>{user_id}</span>
    </NavLink>
  );
};

export default UserItem;
