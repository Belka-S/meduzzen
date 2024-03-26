import { useAppSelector } from 'store';
import * as selectors from 'store/auth/authSelectors';

export const useAuth = () => {
  const isAuth = Boolean(useAppSelector(selectors.selectToken));

  const isLoading = useAppSelector(selectors.selectLoading);
  const error = useAppSelector(selectors.selectError);

  return { isAuth, isLoading, error };
};
