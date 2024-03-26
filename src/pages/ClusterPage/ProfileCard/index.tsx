import { normalizeText } from 'utils/helpers';
import { useUser } from 'utils/hooks';

import s from './index.module.scss';

const ProfileCard = () => {
  const { user } = useUser();
  const { user_status, user_city, user_email, user_phone } = user;

  const info = [{ user_email }, { user_phone }, { user_city }, { user_status }];
  const infoToRender = info.filter(el => Object.values(el)[0] && el);

  return (
    <>
      {infoToRender.map(el => (
        <div key={Object.keys(el)[0]} className={s.main__info}>
          <span>{normalizeText(Object.keys(el)[0])}:</span>
          <span>{Object.values(el)[0]}</span>
        </div>
      ))}
      {user.user_links?.map((el, i) => (
        <div key={el + i} className={s.main__info}>
          <span>Link:</span>
          <span>{el}</span>
        </div>
      ))}
    </>
  );
};

export default ProfileCard;
