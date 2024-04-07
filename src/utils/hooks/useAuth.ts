import { useAppSelector } from 'store';
import * as selectors from 'store/auth/authSelectors';

export const useAuth = () => {
  const isAuth = Boolean(useAppSelector(selectors.selectToken));
  const accessToken = useAppSelector(selectors.selectToken);

  const loading = useAppSelector(selectors.selectLoading);
  const error = useAppSelector(selectors.selectError);

  return { isAuth, accessToken, loading, error };
};
