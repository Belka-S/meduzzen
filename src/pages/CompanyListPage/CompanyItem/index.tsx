import { FC, MouseEvent } from 'react';
import classNames from 'classnames';
import ProfileBtn from 'components/ProfileBtn';
import Button from 'components/ui/Button';
import SvgIcon from 'components/ui/SvgIcon';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import { TCompanyOfList, useAppDispatch, useAppExtraDispatch } from 'store';
import { checkCompany, setCompanyAppendix } from 'store/company';
import { uncheckCompany, updateVisibleThunk } from 'store/company';
import { deleteCompanyThunk, editCompany } from 'store/company';
import { getCompaniesListThunk } from 'store/userData';
import { useCompany, useUser } from 'utils/hooks';

import s from './index.module.scss';

type TCompanyProps = {
  props: TCompanyOfList;
};

const CompanyItem: FC<TCompanyProps> = ({ props }) => {
  const { company_id, company_name, company_title } = props;
  const { is_visible, company_avatar } = props;
  const dispatch = useAppDispatch();
  const dispatchExtra = useAppExtraDispatch();
  const { company, checkedCompanies } = useCompany();
  const { owner, checkedUsers } = useUser();

  if (!company_id) return;
  const isChecked = checkedCompanies.some(el => el.company_id === company_id);
  const isActive = company_id === company?.company_id;
  const ava = { id: company_id, url: company_avatar, name: company_name };

  const handleDelete = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.currentTarget.blur();
    if (!confirm(`Are you sure you want to delete: ${company_name}`)) return;
    const { payload } = await dispatchExtra(deleteCompanyThunk({ company_id }));
    toast.success(payload.detail);
  };

  const switchVisible = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const options = { company_id, is_visible: !is_visible };
    await dispatchExtra(updateVisibleThunk(options));
    if (owner?.user_id) {
      dispatchExtra(getCompaniesListThunk({ user_id: owner?.user_id }));
    }
  };

  const handleCheck = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(checkCompany(props));
  };

  const handleUncheck = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(uncheckCompany({ company_id }));
  };

  return (
    <NavLink
      to={`/company/${company_id}`}
      id={isActive ? 'active-company' : ''}
      className={classNames(s.item, s.hover, isActive && s.active)}
      onClick={() =>
        !checkedUsers.length && dispatch(setCompanyAppendix('members'))
      }
    >
      <ProfileBtn className={s.avatar} ava={ava} />

      <span>{company_name}</span>
      <span>{company_title}</span>

      <Button
        className={s.button}
        variant="round"
        color="transparent"
        onClick={() => dispatch(editCompany('data'))}
      >
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

      {!isChecked && (
        <Button
          className={s.button}
          variant="round"
          color="transparent"
          onClick={handleCheck}
        >
          <SvgIcon className={s.icon_svg} svgId="ui-circle_uncheck" />
        </Button>
      )}

      {isChecked && (
        <Button
          className={s.button}
          variant="round"
          color="transparent"
          onClick={handleUncheck}
        >
          <SvgIcon className={s.icon_svg__shown} svgId="ui-circle_check" />
        </Button>
      )}

      {is_visible && (
        <Button
          className={s.button}
          variant="round"
          color="transparent"
          onClick={switchVisible}
        >
          <SvgIcon className={s.vision_svg} svgId="ui-visible" />
        </Button>
      )}

      {!is_visible && (
        <Button
          className={s.button}
          variant="round"
          color="transparent"
          onClick={switchVisible}
        >
          <SvgIcon className={s.vision_svg} svgId="ui-invisible" />
        </Button>
      )}

      <span>{company_id}</span>
    </NavLink>
  );
};

export default CompanyItem;
