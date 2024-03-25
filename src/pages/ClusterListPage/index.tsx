import { MouseEvent, useEffect } from 'react';
import classNames from 'classnames';
import Button from 'components/ui/Button';
import Section from 'components/ui/Section';
import { useAppDispatch, useAppExtraDispatch } from 'store';
import { editActiveUser, TUser } from 'store/user';
import { getAllUsersThunk } from 'store/user';
import { useUser } from 'utils/hooks';

import TableHead from './UserItem/head';
import UserItem from './UserItem';

import s from './index.module.scss';

const ClusterListPage = () => {
  const dispatch = useAppDispatch();
  const dispatchExtra = useAppExtraDispatch();
  const { users, pagination } = useUser();

  const { current_page: page, total_page } = pagination;
  const page_size = 20;

  useEffect(() => {
    dispatch(editActiveUser({ edit: false }));
  }, [dispatch]);

  useEffect(() => {
    users.length === 0 &&
      dispatchExtra(getAllUsersThunk({ page: page + 1, page_size }));
  }, [dispatchExtra, page, users.length]);

  const handleLoadMore = (e: MouseEvent<HTMLButtonElement>) => {
    dispatchExtra(getAllUsersThunk({ page: page + 1, page_size }));
    e.currentTarget.blur();
  };

  const isLoadMore = total_page !== 0 && page < total_page;

  return (
    <Section className={classNames('container', s.screen)}>
      <TableHead />
      {users.map((el: TUser) => (
        <UserItem key={el.user_id} user={el} />
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

export default ClusterListPage;
