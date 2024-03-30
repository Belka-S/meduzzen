import { FC } from 'react';
import InputRhf from 'components/InputRhf';
import Button from 'components/ui/Button';
import H3 from 'components/ui/Typography/H3';
import { Resolver, SubmitHandler, useForm } from 'react-hook-form';
import { useAppExtraDispatch } from 'store';
import { updatePasswordThunk } from 'store/user';
import { useUser } from 'utils/hooks';
import { passwordSchema } from 'utils/validation';
import { InferType } from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';

import s from './index.module.scss';

type TInput = InferType<typeof passwordSchema>;
type TPasswordForm = { setIsModal: () => void };
const inputFields = Object.keys(passwordSchema.fields) as Array<keyof TInput>;

const PasswordForm: FC<TPasswordForm> = ({ setIsModal }) => {
  const dispatch = useAppExtraDispatch();
  const { owner } = useUser();
  // RHF
  const resolver: Resolver<TInput> = yupResolver(passwordSchema);
  const { register, handleSubmit, formState } = useForm<TInput>({
    resolver,
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<TInput> = async data => {
    const user_id = Number(owner?.user_id);
    const user = { ...data, user_id };
    await dispatch(updatePasswordThunk(user));
    setIsModal();
  };

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={s.title__wrap}>
        <H3 className={s.title}>Change password</H3>
      </div>

      {inputFields.map(el => (
        <InputRhf
          key={el}
          inputField={el}
          errors={formState.errors}
          register={register}
        />
      ))}

      <Button type="submit" variant="smooth" label="Submit" />
    </form>
  );
};

export default PasswordForm;
