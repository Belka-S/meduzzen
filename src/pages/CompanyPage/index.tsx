import { MouseEvent, useEffect, useMemo } from 'react';
import classNames from 'classnames';
import ProfileBtn from 'components/ProfileBtn';
import ProfileCard from 'components/ProfileCard';
import OvalLoader from 'components/ui/Loader';
import Section from 'components/ui/Section';
import H3 from 'components/ui/Typography/H3';
import UserItem from 'pages/ClusterListPage/UserItem';
import AvatarForm from 'pages/CompanyPage/AvatarForm';
import ProfileForm from 'pages/CompanyPage/ProfileForm';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppExtraDispatch } from 'store';
import { getCompanyThunk } from 'store/company';
import { editCompany } from 'store/company';
import { getArrFromObj } from 'utils/helpers/getArrFromObj';
import { useCompany, useUser } from 'utils/hooks';
import { useAction } from 'utils/hooks';

import s from './index.module.scss';

const CompanyPage = () => {
  const dispatch = useAppDispatch();
  const dispatchExtra = useAppExtraDispatch();
  const { id } = useParams();
  const { owner, userList, checkedUsers } = useUser();
  const { company, profileInfo, appendix, edit, loading } = useCompany();
  const { companyData } = useAction();

  useEffect(() => {
    dispatchExtra(getCompanyThunk({ company_id: Number(id) }));
  }, [dispatchExtra, id]);

  const companies = useMemo(
    () =>
      [appendix].flatMap(el => {
        if (el === 'checked') {
          console.log('userList: ', userList);
          console.log('checkedUsers: ', checkedUsers);
          return [...checkedUsers]
            .sort((a, b) => a.user_id - b.user_id)
            .map(el => userList.find(item => item.user_id === el.user_id));
        } else if (el) {
          console.log('companyData: ', companyData);
          return [...companyData[el]].sort((a, b) => a.user_id - b.user_id);
        }
      }),
    [appendix, checkedUsers, companyData, userList],
  );

  if (!company) return;
  const isMyCompany = company?.company_owner?.user_id === owner?.user_id;
  const isRedyToRender = !loading && id === company?.company_id?.toString();
  const isAvatarForm = edit === 'avatar' || isMyCompany;
  const isProfileForm = edit === 'data' && isMyCompany;

  const ava = {
    id: company?.company_id,
    url: company?.company_avatar,
    name: company?.company_name,
  };

  const info = getArrFromObj(profileInfo) as Array<{ [key: string]: string }>;
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

      <div className={s.appendix}>
        {appendix ? <H3 className={s.title}>{`My ${appendix}:`}</H3> : <span />}
        {companies?.map(el => el && <UserItem key={el?.user_id} props={el} />)}
      </div>
    </Section>
  );
};

export default CompanyPage;
