import { FC, MouseEvent } from 'react';
import classNames from 'classnames';
import ProfileBtn from 'components/ProfileBtn';
import Button from 'components/ui/Button';
import SvgIcon from 'components/ui/SvgIcon';
import { NavLink, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { TQuizOfList, useAppDispatch, useAppExtraDispatch } from 'store';
import { checkCompany, setCompanyAppendix } from 'store/company';
import { uncheckCompany, updateVisibleThunk } from 'store/company';
import { deleteCompanyThunk, editCompany } from 'store/company';
import { getMembersListThunk } from 'store/companyData';
import { getCompaniesListThunk } from 'store/userData';
import { useCompany, useUser } from 'utils/hooks';

import s from './index.module.scss';

type TQuizProps = {
  props: TQuizOfList;
};

const QuizItem: FC<TQuizProps> = ({ props }) => {
  const { quiz_id, quiz_name, quiz_title } = props;
  const { quiz_description, quiz_frequency } = props;
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const dispatchExtra = useAppExtraDispatch();

  if (!quiz_id) return;
  // const isChecked = checkedCompanies.some(el => el.company_id === company_id);
  const isActive = false;

  const handleDelete = async (e: MouseEvent<HTMLButtonElement>) => {
    // e.preventDefault();
    // e.currentTarget.blur();
    // if (!confirm(`Are you sure you want to delete: ${company_name}`)) return;
    // const { payload } = await dispatchExtra(deleteCompanyThunk({ company_id }));
    // toast.success(payload.detail);
    // if (!owner) return;
    // const { user_id } = owner;
    // await dispatchExtra(getCompaniesListThunk({ user_id }));
  };

  const handleCheck = (e: MouseEvent<HTMLButtonElement>) => {
    // e.preventDefault();
    // dispatch(checkCompany(props));
  };

  const handleUncheck = (e: MouseEvent<HTMLButtonElement>) => {
    // e.preventDefault();
    // dispatch(uncheckCompany({ company_id }));
  };

  const handleLinkClick = async () => {
    // if (!checkedUsers.length && select !== 'all' && pathname === '/company') {
    //   await dispatchExtra(getMembersListThunk({ company_id }));
    //   dispatch(setCompanyAppendix('members'));
    // } else {
    //   dispatch(setCompanyAppendix(null));
    // }
  };

  return (
    <div
      // to={`/company/${1}`}
      className={classNames(s.item, s.hover, isActive && s.active)}
      onClick={handleLinkClick}
    >
      <span>{quiz_name}</span>
      <span>{quiz_title}</span>
      <span>{quiz_description}</span>
      <span>{quiz_frequency}</span>

      <Button className={s.button} variant="round" color="transparent">
        <SvgIcon className={s.icon_svg} svgId="ui-edit" />
      </Button>

      <Button
        className={s.button}
        variant="round"
        color="transparent"
        onClick={handleDelete}
      >
        <SvgIcon className={s.icon_svg} svgId="ui-trash" />
      </Button>

      <span>{quiz_id}</span>
    </div>
  );
};

export default QuizItem;
