import { FC } from 'react';
import { trimName } from 'utils/helpers';

import s from './index.module.scss';

type TProfileCardProps = {
  info: Array<{ [key: string]: string }>;
  links: string[];
};

const ProfileCard: FC<TProfileCardProps> = ({ info, links }) => {
  return (
    <>
      {info.map(el => (
        <div key={Object.keys(el)[0]} className={s.main__info}>
          <span>{trimName(Object.keys(el)[0])}:</span>
          <span>{Object.values(el)[0]}</span>
        </div>
      ))}
      {links.map((el, i) => (
        <div key={el + i} className={s.main__info}>
          <span>Link:</span>
          <a href={el} target="blank">
            {el}
          </a>
        </div>
      ))}
    </>
  );
};

export default ProfileCard;
