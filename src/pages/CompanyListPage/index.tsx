import { MouseEvent, useEffect } from 'react';
import classNames from 'classnames';
import Button from 'components/ui/Button';
import Section from 'components/ui/Section';
import { useAppDispatch, useAppExtraDispatch } from 'store';
import { editCompany, getAllCompaniesThunk } from 'store/company';
import { useCompany } from 'utils/hooks';

import TableHead from './CompanyItem/head';
import CompanyItem from './CompanyItem';

import s from './index.module.scss';

const CompanyListPage = () => {
  const dispatch = useAppDispatch();
  const dispatchExtra = useAppExtraDispatch();
  const { companyList, pagination } = useCompany();

  const { current_page: page, total_page } = pagination;
  const page_size = 30;

  // useEffect(() => {
  //   const activeFileEl = document.getElementById('active-company');
  //   const scrollOnActive = () => {
  //     activeFileEl?.scrollIntoView({ block: 'center', behavior: 'smooth' });
  //   };
  //   scrollOnActive();
  // }, []);

  useEffect(() => {
    dispatch(editCompany(false));
  }, [dispatch]);

  useEffect(() => {
    companyList.length === 0 &&
      dispatchExtra(getAllCompaniesThunk({ page: page + 1, page_size }));
  }, [dispatchExtra, page, companyList.length]);

  const handleLoadMore = (e: MouseEvent<HTMLButtonElement>) => {
    dispatchExtra(getAllCompaniesThunk({ page: page + 1, page_size }));
    e.currentTarget.blur();
  };

  const isLoadMore = total_page !== 0 && page < total_page;

  return (
    <Section className={classNames('container', s.screen)}>
      <TableHead />
      {companyList.map(el => (
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
