import { FC } from 'react';
import InputCheck from 'components/InputCheck';
import InputRhf from 'components/InputRhf';
import Button from 'components/ui/Button';
import H3 from 'components/ui/Typography/H3';
import { Resolver, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppExtraDispatch } from 'store';
import { addCompanyToList, createCompanyThunk } from 'store/company';
import { useCompany } from 'utils/hooks';
import { companySchema } from 'utils/validation';
import { InferType } from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';

import s from './index.module.scss';

type TInput = InferType<typeof companySchema>;
type TCompanyForm = { setIsModal: () => void };

const inputFields = Object.keys(companySchema.fields) as Array<keyof TInput>;

const CompanyForm: FC<TCompanyForm> = ({ setIsModal }) => {
  const dispatch = useAppDispatch();
  const dispatchExtra = useAppExtraDispatch();
  const { companyList } = useCompany();
  const [company_name, is_visible] = inputFields;

  const resolver: Resolver<TInput> = yupResolver(companySchema);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TInput>({
    mode: 'onChange',
    resolver,
    defaultValues: { is_visible: true },
  });

  const onSubmit: SubmitHandler<TInput> = data => {
    const last_id = [...companyList].reverse().at(0)?.company_id;
    const company_id = last_id ? last_id + 1 : 1;

    dispatchExtra(createCompanyThunk(data))
      .unwrap()
      .then(res => toast.success(res?.detail))
      .then(() => dispatch(addCompanyToList({ ...data, company_id })))
      .then(() => setIsModal());
  };

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={s.title__wrap}>
        <H3 className={s.title}>Create company</H3>
      </div>

      <InputRhf inputName={company_name} errors={errors} register={register} />
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
