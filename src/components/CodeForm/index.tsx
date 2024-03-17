import classNames from 'classnames';
import Button from 'components/ui/Button';
import { Resolver, SubmitHandler, useForm } from 'react-hook-form';
// import { toast } from 'react-toastify';
// import { refreshUserThunk, verifyEmailThunk } from 'store/auth/authThunks';
// import { useAuth } from 'utils/hooks';
import { verifySchema } from 'utils/validation';
import { InferType } from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';

import H4 from '../ui/Typography/H4';

import s from './index.module.scss';

type Inputs = InferType<typeof verifySchema>;

const CodeForm = () => {
  const { user } = useAuth();

  const resolver: Resolver<Inputs> = yupResolver(verifySchema);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ mode: 'onBlur', resolver });

  const onSubmit: SubmitHandler<Inputs> = data => {
    console.log('data: ', data);
    // dispatch(verifyEmailThunk({ ...data, email: user.email }))
    //   .unwrap()
    //   .then(pld => console.log(pld))
    //   .catch(err => err.includes('401') && toast.error('Unauthorized'));
  };

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      <H4>{`Verify: ${user.email}`}</H4>

      <label className={s.label}>
        Code <span> {errors.verificationCode?.message}</span>
        <input
          placeholder=""
          className={classNames(
            s.input,
            errors.verificationCode ? s.invalid : s.valid,
          )}
          {...register('verificationCode', { required: true })}
        />
      </label>

      <Button type="submit" size="m" label="Submit" />
    </form>
  );
};

export default CodeForm;
