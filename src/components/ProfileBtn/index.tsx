import { FC, useEffect } from 'react';
import classNames from 'classnames';
import { TUser } from 'store/user';
import { getAbbreviation, getRandomColor } from 'utils/helpers';

import s from './index.module.scss';

type TUserProps = {
  user: TUser | null;
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
  // profile button styles
  const btnId = `profile-${user?.user_id}`;
  const color = getRandomColor(60);

  useEffect(() => {
    if (user?.user_avatar) {
      document.styleSheets[0].insertRule(
        `#${btnId} {background-image: url(${user?.user_avatar})}`,
        0,
      );
    } else if (user?.user_firstname || user?.user_lastname) {
      const abbr = getAbbreviation(
        `${user?.user_firstname} ${user?.user_lastname}`,
      );
      // document.styleSheets[0].deleteRule(0);
      document.styleSheets[0].insertRule(
        `#${btnId}::after { background-color: ${color}; color: #ffffff; content: '${abbr}'}`,
      );
    }
  }, [btnId, color, user]);

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
