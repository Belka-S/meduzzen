import { useAppSelector } from 'store';
import * as selectors from 'store/user/userSelectors';

export const useUser = () => {
  const owner = useAppSelector(selectors.selectOwner);
  const user = useAppSelector(selectors.selectUser);
  const edit = useAppSelector(selectors.selectEdit);
  const userList = useAppSelector(selectors.selectUserList);
  const pagination = useAppSelector(selectors.selectPagination);

  const isLoading = useAppSelector(selectors.selectLoading);
  const error = useAppSelector(selectors.selectError);

  return { owner, user, edit, userList, pagination, isLoading, error };
};
