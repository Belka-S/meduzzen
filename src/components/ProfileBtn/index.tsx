import { FC, MouseEvent, useEffect } from 'react';
import classNames from 'classnames';
import { getAbbreviation, getRandomColor } from 'utils/helpers';

import s from './index.module.scss';

type TAvatar = { id?: number | string; name?: string; url?: string };

type TProfileBtnProps = {
  ava: TAvatar;
  size?: 's' | 'm' | 'l' | 'xl';
  onClick?: (e: MouseEvent<HTMLDivElement>) => void;
  className?: string;
};

const ProfileBtn: FC<TProfileBtnProps> = props => {
  const { ava, size = 'm', onClick, className } = props;

  // profile button styles
  const btnId = `profile-${ava.id}`;
  const color = getRandomColor(60);

  useEffect(() => {
    if (ava.url) {
      document.styleSheets[0].insertRule(
        `#${btnId} {background-image: url(${ava.url})}`,
        0,
      );
    } else if (ava.name) {
      const abbr = getAbbreviation(ava.name);
      // document.styleSheets[0].deleteRule(0);
      document.styleSheets[0].insertRule(
        `#${btnId}::after { background-color: ${color}; color: #ffffff; content: '${abbr}'}`,
      );
    }
  }, [btnId, color, ava]);

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
