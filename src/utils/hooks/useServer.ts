import { useAppSelector } from 'store';
import * as selectors from 'store/server/serverSelectors';

export const useServer = () => {
  const server = useAppSelector(selectors.selectCommon);

  const loading = useAppSelector(selectors.selectLoading);
  const error = useAppSelector(selectors.selectError);

  return { server, loading, error };
};
