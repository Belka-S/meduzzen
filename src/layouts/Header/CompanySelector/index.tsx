import classNames from 'classnames';
import { TCompanySelect, useAppDispatch } from 'store';
import { selectCompanies } from 'store/company';
import { useCompany } from 'utils/hooks';

import s from './index.module.scss';

const CompanySelector = () => {
  const dispatch = useAppDispatch();
  const { select } = useCompany();

  const companies: TCompanySelect[] = ['all', 'owner', 'member'];

  if (!select) return;
  return companies.map(el => (
    <label
      key={el}
      className={classNames(s.label, select === el && s.active)}
      onClick={() => dispatch(selectCompanies(el))}
    >
      {el}
      <input
        className={s.input}
        type="radio"
        id="all"
        name="companies"
        value={select}
        checked={select === el}
        readOnly
      />
    </label>
  ));
};

export default CompanySelector;
