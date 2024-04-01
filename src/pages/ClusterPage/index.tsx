import { MouseEvent, useEffect } from 'react';
import classNames from 'classnames';
import ProfileBtn from 'components/ProfileBtn';
import ProfileCard from 'components/ProfileCard';
import OvalLoader from 'components/ui/Loader';
import Section from 'components/ui/Section';
import H2 from 'components/ui/Typography/H2';
import AvatarForm from 'pages/ClusterPage/AvatarForm';
import ProfileForm from 'pages/ClusterPage/ProfileForm';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppExtraDispatch } from 'store';
import { getUserThunk } from 'store/user';
import { editUser } from 'store/user';
import { trimName } from 'utils/helpers';
import { useUser } from 'utils/hooks';

import s from './index.module.scss';
import { getArrFromObj } from 'utils/helpers/getArrFromObj';

const ClusterPage = () => {
  const dispatch = useAppDispatch();
  const dispatchExtra = useAppExtraDispatch();
  const { id } = useParams();
  const { user, profileInfo, edit, owner, loading } = useUser();

  useEffect(() => {
    dispatchExtra(getUserThunk(Number(id)));
  }, [dispatchExtra, id]);

  if (!user) return;

  const isMyAccount = owner?.user_id === id;
  const isRedyToRender = !loading && id === user?.user_id?.toString();
  const isAvatarForm = edit === 'avatar' || id === owner?.user_id?.toString();
  const isProfileForm = edit === 'data';

  const ava = {
    id: user?.user_id,
    url: user?.user_avatar,
    name: `${user?.user_firstname} ${user?.user_lastname}`,
  };

  const info = getArrFromObj(profileInfo) as Array<{ [key: string]: string }>;
  const links = user.user_links ? user.user_links : [];

  const getUserName = () => {
    const isLastName = user?.user_firstname !== user?.user_lastname;
    const firstname = trimName(user?.user_firstname ?? '');
    const lastname = trimName(user?.user_lastname ?? '');

    return isLastName ? `${firstname} ${lastname}` : firstname;
  };

  const handleUpdateAvatar = (e: MouseEvent<HTMLDivElement>) => {
    if (!owner?.is_superuser) {
      if (!isMyAccount) {
        e.preventDefault();
        e.currentTarget.blur();
        toast.error("It's not your account");
        return;
      }
    }
    return dispatch(editUser('avatar'));
  };

  if (!isRedyToRender) return <OvalLoader />;
  return (
    <Section className={classNames('container', s.screen)}>
      <div>
        <div className={s.main}>
          {isAvatarForm && <AvatarForm />}

          {!isAvatarForm && (
            <ProfileBtn
              className={s.avatar}
              ava={ava}
              size="xl"
              onClick={handleUpdateAvatar}
            />
          )}

          <H2 className={s.name}>{getUserName()}</H2>
        </div>

        {isProfileForm && <ProfileForm />}
        {!isProfileForm && <ProfileCard info={info} links={links} />}
      </div>

      <div className={s.additional}></div>
    </Section>
  );
};

export default ClusterPage;
