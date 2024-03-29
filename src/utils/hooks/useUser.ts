import { useAppSelector } from 'store';
import * as selectors from 'store/user/userSelectors';

export const useUser = () => {
  const owner = useAppSelector(selectors.selectOwner);
  const user = useAppSelector(selectors.selectUser);
  const userList = useAppSelector(selectors.selectUserList);
  const pagination = useAppSelector(selectors.selectPagination);
  const edit = useAppSelector(selectors.selectEdit);

  const profileInfo = [
    ['email', user?.user_email ?? ''],
    ['phone', user?.user_phone ?? ''],
    ['city', user?.user_city ?? ''],
    ['status', user?.user_status ?? ''],
  ];

  const isLoading = useAppSelector(selectors.selectLoading);
  const error = useAppSelector(selectors.selectError);

  return {
    owner,
    user,
    profileInfo,
    edit,
    userList,
    pagination,
    isLoading,
    error,
  };
};
