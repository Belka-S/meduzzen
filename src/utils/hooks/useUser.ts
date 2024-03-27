import { useAppSelector } from 'store';
import * as selectors from 'store/user/userSelectors';

export const useUser = () => {
  const users = useAppSelector(selectors.selectUsers);
  const pagination = useAppSelector(selectors.selectPagination);
  const activeUser = useAppSelector(selectors.selectActive);

  const isLoading = useAppSelector(selectors.selectLoading);
  const error = useAppSelector(selectors.selectError);

  return { users, pagination, activeUser, isLoading, error };
};
