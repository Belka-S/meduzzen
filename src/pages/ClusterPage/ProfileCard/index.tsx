import { useUser } from 'utils/hooks';

import s from './index.module.scss';

const ProfileCard = () => {
  const { user, profileInfo } = useUser();
  console.log('user: ', user);

  const notEmptyProfileInfo = profileInfo?.filter(el => el[1] && el);

  return (
    <>
      {user &&
        notEmptyProfileInfo.map(el => (
          <div key={el[0]} className={s.main__info}>
            <span>{el[0]}:</span>
            <span>{el[1]}</span>
          </div>
        ))}
      {user?.user_links?.map((el, i) => (
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
