import { FC } from 'react';

import s from './index.module.scss';

type TProfileCardProps = {
  info: string[][];
  links?: string[];
};

const ProfileCard: FC<TProfileCardProps> = ({ info, links }) => {
  return (
    <>
      {info.map(el => (
        <div key={el[0]} className={s.main__info}>
          <span>{el[0]}:</span>
          <span>{el[1]}</span>
        </div>
      ))}
      {links?.map((el, i) => (
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
