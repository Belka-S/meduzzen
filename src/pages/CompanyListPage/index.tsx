import { MouseEvent, useEffect, useMemo } from 'react';
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
  const { myCompanies } = useAction();
  const { companyList, pagination, select } = useCompany();
  const { current_page: page, total_page } = pagination;
  const page_size = 30;

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
    !companyList[0] &&
      dispatchExtra(getAllCompaniesThunk({ page: 1, page_size }));
  }, [companyList, dispatchExtra]);

  useEffect(() => {
    if (!owner) return;
    const { user_id } = owner;
    dispatchExtra(getCompaniesListThunk({ user_id }));
  }, [dispatchExtra, owner]);

  const handleLoadMore = (e: MouseEvent<HTMLButtonElement>) => {
    dispatchExtra(getAllCompaniesThunk({ page: page + 1, page_size }));
    e.currentTarget.blur();
  };

  const companies = useMemo(() => {
    const myIds = myCompanies.map(el => el.company_id);

    return select === 'all'
      ? companyList.filter(el => !myIds.includes(el.company_id))
      : myCompanies
          .filter(el => {
            if (select === 'member') {
              return el.action === select || el.action === 'admin';
            }
            return el.action === select;
          })
          .sort((a, b) => a.company_id - b.company_id);
  }, [companyList, myCompanies, select]);

  const isLoadMore = total_page !== 0 && page < total_page && select === 'all';

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
