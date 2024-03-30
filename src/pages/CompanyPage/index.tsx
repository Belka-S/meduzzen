import { MouseEvent, useEffect } from 'react';
import classNames from 'classnames';
import ProfileBtn from 'components/ProfileBtn';
import ProfileCard from 'components/ProfileCard';
import OvalLoader from 'components/ui/Loader';
import Section from 'components/ui/Section';
import H3 from 'components/ui/Typography/H3';
import AvatarForm from 'pages/CompanyPage/AvatarForm';
import ProfileForm from 'pages/CompanyPage/ProfileForm';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppExtraDispatch } from 'store';
import { getCompanyThunk } from 'store/company';
import { editCompany } from 'store/company';
import { useCompany, useUser } from 'utils/hooks';

import s from './index.module.scss';

const CompanyPage = () => {
  const dispatch = useAppDispatch();
  const dispatchExtra = useAppExtraDispatch();
  const { id } = useParams();
  const { owner } = useUser();
  const { company, profileInfo, edit, isLoading } = useCompany();

  useEffect(() => {
    dispatchExtra(getCompanyThunk(Number(id)));
  }, [dispatchExtra, id]);

  if (!company) return;

  const isMyCompany = company?.company_owner?.user_id === owner?.user_id;
  const isRedyToRender = !isLoading && id === company?.company_id?.toString();
  const isAvatarForm = edit === 'avatar' || isMyCompany;
  const isProfileForm = edit === 'data' && isMyCompany;

  const ava = {
    id: company?.company_id,
    url: company?.company_avatar,
    name: company?.company_name,
  };

  const info = profileInfo.filter(el => Object.values(el)[0] && el);
  const links = company.company_links ? company.company_links : [];

  const handleUpdateAvatar = (e: MouseEvent<HTMLDivElement>) => {
    if (!owner?.is_superuser) {
      if (!isMyCompany) {
        e.preventDefault();
        e.currentTarget.blur();
        toast.error("It's not your account");
        return;
      }
    }
    return dispatch(editCompany('avatar'));
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

          <H3 className={s.name}>{`${company?.company_name}`}</H3>
        </div>

        {isProfileForm && <ProfileForm />}
        {!isProfileForm && <ProfileCard info={info} links={links} />}
      </div>

      <div className={s.additional}></div>
    </Section>
  );
};

export default CompanyPage;

// ------------------------------ draft ------------------------------ //

// const fields = [
//   'company_title',
//   'company_city',
//   'company_phone',
//   'company_description',
// ];
// const arr = (Object.keys(company) as Array<keyof typeof company>)
//   .reduce((acc, key) => {
//     company[key] && acc.push({ [key]: company[key] });
//     return acc;
//   }, [] as (typeof company)[keyof typeof company][])
//   .filter(el => el && el);

// const info = arr.filter(el => el && fields.includes(Object.keys(el)[0]));

// ------------------------------ draft ------------------------------ //
