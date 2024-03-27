import { useEffect } from 'react';
import classNames from 'classnames';
import ProfileBtn from 'components/ProfileBtn';
import OvalLoader from 'components/ui/Loader';
import Section from 'components/ui/Section';
import H1 from 'components/ui/Typography/H1';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppExtraDispatch } from 'store';
import { getUserThunk } from 'store/user';
import { editUser } from 'store/user';
import { trimName } from 'utils/helpers';
import { useUser } from 'utils/hooks';

import AvatarForm from './AvatarForm';
import ProfileCard from './ProfileCard';
import ProfileForm from './ProfileForm';

import s from './index.module.scss';

const ClusterPage = () => {
  const dispatch = useAppDispatch();
  const dispatchExtra = useAppExtraDispatch();
  const { id } = useParams();
  const { user, edit, owner, isLoading } = useUser();

  useEffect(() => {
    dispatchExtra(getUserThunk(Number(id)));
  }, [dispatchExtra, id]);

  const getUserName = () => {
    const isLastName = user?.user_firstname !== user?.user_lastname;
    const firstname = trimName(user?.user_firstname ?? '');
    const lastname = trimName(user?.user_lastname ?? '');

    return isLastName ? `${firstname} ${lastname}` : firstname;
  };

  const handleUpdateUserAvatar = () => {
    if (owner.is_superuser || owner.user_id === user?.user_id) {
      dispatch(editUser('avatar'));
    } else {
      toast.error("It's not your account");
    }
  };

  const isRedyToRender = !isLoading && id === user?.user_id.toString();
  const isAvatarForm = edit === 'avatar' || id === owner.user_id.toString();

  if (!isRedyToRender) return <OvalLoader />;
  return (
    <Section className={classNames('container', s.screen)}>
      <div>
        <div className={s.main}>
          {isAvatarForm ? (
            <AvatarForm />
          ) : (
            <ProfileBtn
              className={s.avatar}
              user={user}
              size="xl"
              onClick={handleUpdateUserAvatar}
            />
          )}
          <H1 className={s.name}>{getUserName()}</H1>
        </div>

        {edit === 'data' ? <ProfileForm /> : <ProfileCard />}
      </div>

      <div className={s.additional}></div>
    </Section>
  );
};

export default ClusterPage;
