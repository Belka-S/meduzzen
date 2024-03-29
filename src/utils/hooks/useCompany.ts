import { useAppSelector } from 'store';
import * as selectors from 'store/company/companySelectors';

export const useCompany = () => {
  const company = useAppSelector(selectors.selectCompany);
  const companyList = useAppSelector(selectors.selectCompanyList);
  const pagination = useAppSelector(selectors.selectPagination);
  const edit = useAppSelector(selectors.selectEdit);

  const profileInfo = [
    ['owner', company?.company_owner?.user_email ?? ''],
    ['title', company?.company_title ?? ''],
    ['city', company?.company_city ?? ''],
    ['phone', company?.company_phone ?? ''],
    ['description', company?.company_description ?? ''],
  ];

  const isLoading = useAppSelector(selectors.selectLoading);
  const error = useAppSelector(selectors.selectError);

  return {
    company,
    profileInfo,
    edit,
    companyList,
    pagination,
    isLoading,
    error,
  };
};
