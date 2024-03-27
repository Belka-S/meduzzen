import { FC } from 'react';
import InputRhf from 'components/InputRHF';
import Button from 'components/ui/Button';
import H3 from 'components/ui/Typography/H3';
import { Resolver, SubmitHandler, useForm } from 'react-hook-form';
import { useAppExtraDispatch } from 'store';
import { updatePasswordThunk } from 'store/user';
import { useAuth } from 'utils/hooks';
import { passwordSchema } from 'utils/validation';
import { InferType } from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';

import s from './index.module.scss';

type TInput = InferType<typeof passwordSchema>;
type TPasswordForm = { setIsModal: () => void };

const inputFields = Object.keys(passwordSchema.fields) as Array<keyof TInput>;

const PasswordForm: FC<TPasswordForm> = ({ setIsModal }) => {
  const dispatch = useAppExtraDispatch();
  const { user } = useAuth();
  const { user_id } = user;
  const resolver: Resolver<TInput> = yupResolver(passwordSchema);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TInput>({ mode: 'onChange', resolver });

  const onSubmit: SubmitHandler<TInput> = data => {
    dispatch(updatePasswordThunk({ ...data, user_id }))
      .unwrap()
      .then(res => console.log(res))
      .then(() => setIsModal());
  };

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={s.title__wrap}>
        <H3 className={s.title}>Change password</H3>
      </div>

      {inputFields.map(el => (
        <InputRhf key={el} inputName={el} errors={errors} register={register} />
      ))}

      <Button type="submit" variant="smooth" label="Submit" />
    </form>
  );
};

export default PasswordForm;
