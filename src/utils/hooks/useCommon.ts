import { useAppSelector } from 'store';
import * as selectors from 'store/common/commonSelectors';

export const useCommon = () => {
  const server = useAppSelector(selectors.selectCommon);

  const isLoading = useAppSelector(selectors.selectIsLoading);
  const error = useAppSelector(selectors.selectError);

  return { server, isLoading, error };
};
