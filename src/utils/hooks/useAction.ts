import { useAppSelector } from 'store';
import * as selectors from 'store/action/actionSelectors';
import * as companyDataSelectots from 'store/companyData/companyDataSelectors';
import * as userDataSelectots from 'store/userData/userDataSelectors';

export const useAction = () => {
  const action = useAppSelector(selectors.selectAction);
  const loading = useAppSelector(selectors.selectLoading);
  const error = useAppSelector(selectors.selectError);

  const companyData = useAppSelector(companyDataSelectots.selectData);
  const loadingCD = useAppSelector(companyDataSelectots.selectLoading);
  const errorCD = useAppSelector(companyDataSelectots.selectError);

  const userData = useAppSelector(userDataSelectots.selectData);
  const loadingUD = useAppSelector(userDataSelectots.selectLoading);
  const errorUD = useAppSelector(userDataSelectots.selectError);

  return {
    action,
    loading,
    error,
    companyData,
    loadingCD,
    errorCD,
    userData,
    loadingUD,
    errorUD,
  };
};
