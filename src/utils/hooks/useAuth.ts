import { useAppSelector } from 'store';
import * as selectors from 'store/auth/authSelectors';

export const useAuth = () => {
  const user = useAppSelector(selectors.selectUser);
  const isAuth = Boolean(user.accessToken);

  const isLoading = useAppSelector(selectors.selectLoading);
  const error = useAppSelector(selectors.selectError);

  return { user, isAuth, isLoading, error };
};
