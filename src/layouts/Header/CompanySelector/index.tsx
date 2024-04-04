import classNames from 'classnames';
import { useAppDispatch } from 'store';
import { selectCompanies } from 'store/company';
import { useCompany } from 'utils/hooks';

import s from './index.module.scss';

const CompanySelector = () => {
  const dispatch = useAppDispatch();
  const { select } = useCompany();

  const isAll = select === 'all';
  const isMy = select === 'own';

  if (!select) return;
  return (
    <>
      <label
        className={classNames(s.label, isAll && s.active)}
        onClick={() => dispatch(selectCompanies('all'))}
      >
        all
        <input
          className={s.input}
          type="radio"
          id="all"
          name="companies"
          value={select}
          checked={isAll}
          readOnly
        />
      </label>

      <label
        className={classNames(s.label, isMy && s.active)}
        onClick={() => dispatch(selectCompanies('own'))}
      >
        my
        <input
          className={s.input}
          type="radio"
          id="own"
          name="companies"
          value={select}
          checked={isMy}
          readOnly
        />
      </label>
    </>
  );
};

export default CompanySelector;
