import { MouseEvent, useEffect } from 'react';
import classNames from 'classnames';
import Button from 'components/ui/Button';
import Section from 'components/ui/Section';
import { useAppDispatch, useAppExtraDispatch } from 'store';
import { editCompany, getAllCompaniesThunk } from 'store/company';
import { getCompaniesListThunk } from 'store/userData';
import { useCompany, useUser } from 'utils/hooks';
import { useAction } from 'utils/hooks';

import TableHead from './CompanyItem/head';
import CompanyItem from './CompanyItem';

import s from './index.module.scss';

const CompanyListPage = () => {
  const dispatch = useAppDispatch();
  const dispatchExtra = useAppExtraDispatch();
  const { owner } = useUser();
  const { companyList, pagination, select } = useCompany();
  const { myCompanies } = useAction();

  const { current_page: page, total_page } = pagination;
  const page_size = 30;
  const isAll = select === 'all';
  const isMy = select === 'own';
  const companies = isAll ? companyList : myCompanies;

  useEffect(() => {
    const activeFileEl = document.getElementById('active-company');
    const scrollOnActive = () => {
      activeFileEl?.scrollIntoView({ block: 'center', behavior: 'smooth' });
    };
    scrollOnActive();
  }, []);

  useEffect(() => {
    dispatch(editCompany(false));
  }, [dispatch]);

  useEffect(() => {
    if (owner?.user_id && isMy) {
      dispatchExtra(getCompaniesListThunk({ user_id: owner?.user_id }));
    }
    if (companyList.length === 0 && isAll) {
      dispatchExtra(getAllCompaniesThunk({ page: page + 1, page_size }));
    }
  }, [dispatchExtra, page, companyList.length, owner?.user_id, isMy, isAll]);

  const handleLoadMore = (e: MouseEvent<HTMLButtonElement>) => {
    dispatchExtra(getAllCompaniesThunk({ page: page + 1, page_size }));
    e.currentTarget.blur();
  };

  const isLoadMore = total_page !== 0 && page < total_page;

  return (
    <Section className={classNames('container', s.screen)}>
      <TableHead />
      {companies.map(el => (
        <CompanyItem key={el.company_id} props={el} />
      ))}

      {isLoadMore && (
        <Button
          className={s.button}
          onClick={handleLoadMore}
          variant="smooth"
          color="outlined"
          label="Load more"
        />
      )}
    </Section>
  );
};

export default CompanyListPage;
