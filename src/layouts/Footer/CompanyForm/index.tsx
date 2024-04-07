import { FC } from 'react';
import InputCheck from 'components/InputCheck';
import InputText from 'components/InputText';
import Button from 'components/ui/Button';
import H3 from 'components/ui/Typography/H3';
import { Resolver, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppExtraDispatch } from 'store';
import { createCompanyThunk, selectCompanies } from 'store/company';
import { getCompaniesListThunk } from 'store/userData';
import { useUser } from 'utils/hooks';
import { companySchema } from 'utils/validation';
import { InferType } from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';

import s from './index.module.scss';

type TInput = InferType<typeof companySchema>;
type TCompanyForm = { setIsModal: () => void };
const inputFields = Object.keys(companySchema.fields) as Array<keyof TInput>;

const CompanyForm: FC<TCompanyForm> = ({ setIsModal }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const dispatchExtra = useAppExtraDispatch();
  const { owner } = useUser();
  const [company_name, is_visible] = inputFields;
  // RHF
  const resolver: Resolver<TInput> = yupResolver(companySchema);
  const { register, handleSubmit, formState } = useForm<TInput>({
    resolver,
    mode: 'onChange',
    defaultValues: { is_visible: true },
  });

  const onSubmit: SubmitHandler<TInput> = async data => {
    const { payload } = await dispatchExtra(createCompanyThunk(data));
    toast.success(payload.detail);
    if (owner) {
      const { user_id } = owner;
      await dispatchExtra(getCompaniesListThunk({ user_id }));
      dispatch(selectCompanies('owner'));
    }
    navigate('/company', { replace: true });
    setIsModal();
  };

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={s.title__wrap}>
        <H3 className={s.title}>Create company</H3>
      </div>

      <InputText
        inputName={company_name}
        errors={formState.errors}
        register={register}
      />
      <InputCheck
        inputName={is_visible}
        register={register}
        label="the company is visible to all users"
      />

      <Button type="submit" variant="smooth" label="Submit" />
    </form>
  );
};

export default CompanyForm;
