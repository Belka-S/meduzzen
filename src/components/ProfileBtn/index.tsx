import { FC, useEffect } from 'react';
import classNames from 'classnames';
import { TUser } from 'store/user';
import { getAbbreviation, getRandomColor } from 'utils/helpers';

import s from './index.module.scss';

type TUserProps = {
  user: Partial<TUser>;
  size?: 's' | 'm' | 'l' | 'xl';
  onClick?: () => void;
  className?: string;
};

const ProfileBtn: FC<TUserProps> = ({
  user,
  size = 'm',
  onClick,
  className,
}) => {
  const { user_id, user_firstname, user_lastname, user_avatar } = user;

  // profile button styles
  const btnId = `profile-${user_id}`;
  const color = getRandomColor(60);

  useEffect(() => {
    if (user_avatar) {
      document.styleSheets[0].insertRule(
        `#${btnId} {background-image: url(${user_avatar})}`,
        0,
      );
    } else if (user_firstname || user_lastname) {
      const abbr = getAbbreviation(`${user_firstname} ${user_lastname}`);
      // document.styleSheets[0].deleteRule(0);
      document.styleSheets[0].insertRule(
        `#${btnId}::after { background-color: ${color}; color: #ffffff; content: '${abbr}'}`,
      );
    }
  }, [btnId, color, user_avatar, user_firstname, user_lastname]);

  return (
    <>
      <div
        className={classNames(s['profile-btn'], s[size], className)}
        id={`${btnId}`}
        onClick={onClick}
      />
    </>
  );
};

export default ProfileBtn;
