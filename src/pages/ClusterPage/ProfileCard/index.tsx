import { useUser } from 'utils/hooks';

import s from './index.module.scss';

const ProfileCard = () => {
  const { activeUser } = useUser();

  const { user_status, user_city, user_email, user_phone, user_links } =
    activeUser;

  const getUserInfo = () => {
    const data = [
      { email: user_email },
      { phone: user_phone },
      { city: user_city },
      { status: user_status },
    ].filter(el => Object.values(el)[0] && el);
    return data;
  };
  return (
    <>
      {getUserInfo().map(el => (
        <div key={Object.keys(el)[0]} className={s.main__info}>
          <span>{Object.keys(el)[0]}:</span>
          <span>{Object.values(el)[0]}</span>
        </div>
      ))}
      {user_links?.map(el => (
        <div key={el} className={s.main__info}>
          <span>Link:</span>
          <span>{el}</span>
        </div>
      ))}
    </>
  );
};

export default ProfileCard;
