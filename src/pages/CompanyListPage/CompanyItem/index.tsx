import { FC, MouseEvent } from 'react';
import classNames from 'classnames';
import ProfileBtn from 'components/ProfileBtn';
import Button from 'components/ui/Button';
import SvgIcon from 'components/ui/SvgIcon';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppExtraDispatch } from 'store';
import { TCompany } from 'store/company';
import { deleteCompanyThunk, editCompany } from 'store/company';
import { useCompany } from 'utils/hooks';

import s from './index.module.scss';

type TCompanyProps = {
  props: TCompany;
};

const CompanyItem: FC<TCompanyProps> = ({ props }) => {
  const { company_id, company_name, company_title } = props;
  const { is_visible, company_avatar } = props;
  const dispatch = useAppDispatch();
  const dispatchExtra = useAppExtraDispatch();
  const { company } = useCompany();

  if (!company_id) return;

  // const isMyCompany = company?.company_owner?.user_id === owner?.user_id;
  const isActive = company_id === company?.company_id;
  const ava = { id: company_id, url: company_avatar, name: company_name };

  const handleDelete = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.currentTarget.blur();
    if (confirm(`Are you sure you want to delete company: ${company_name}`)) {
      dispatchExtra(deleteCompanyThunk(company_id))
        .unwrap()
        .then(res => toast.success(res.detail));
    }
  };

  const handleUpdateInfo = () => dispatch(editCompany('data'));

  return (
    <NavLink
      to={`/company/${company_id}`}
      id={isActive ? 'active-company' : ''}
      className={classNames(s.item, s.hover, isActive && s.active)}
    >
      <ProfileBtn className={s.avatar} ava={ava} />

      <span>{company_name}</span>
      <span>{company_title}</span>

      <Button
        className={s.button}
        variant="round"
        color="transparent"
        onClick={handleUpdateInfo}
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

      {is_visible && (
        <Button
          className={s.button}
          variant="round"
          color="transparent"
          onClick={handleDelete}
        >
          <SvgIcon className={s.vision_svg} svgId="ui-visible" />
        </Button>
      )}

      {!is_visible && (
        <Button
          className={s.button}
          variant="round"
          color="transparent"
          onClick={handleDelete}
        >
          <SvgIcon className={s.vision_svg} svgId="ui-invisible" />
        </Button>
      )}

      <span>{company_id}</span>
    </NavLink>
  );
};

export default CompanyItem;
