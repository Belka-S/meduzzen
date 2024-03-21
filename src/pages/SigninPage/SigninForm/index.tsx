import InputRhf from 'components/InputRHF';
import Button from 'components/ui/Button';
import H3 from 'components/ui/Typography/H3';
import { Resolver, SubmitHandler, useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import { useAppExtraDispatch } from 'store';
import { loginThunk } from 'store/auth';
import { useAuth } from 'utils/hooks';
import { signinSchema } from 'utils/validation';
import { InferType } from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';

import s from './index.module.scss';

type TInput = InferType<typeof signinSchema>;

const inputFields = Object.keys(signinSchema.fields) as Array<keyof TInput>;

const SigninForm = () => {
  const dispatch = useAppExtraDispatch();
  const { user } = useAuth();

  const resolver: Resolver<TInput> = yupResolver(signinSchema);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TInput>({
    resolver,
    mode: 'onChange',
    defaultValues: { email: user.email },
  });

  const onSubmit: SubmitHandler<TInput> = data => {
    dispatch(loginThunk(data));
  };

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={s.title__wrap}>
        <H3 className={s.title}>Sign In</H3>
        <NavLink to={'/signup'} className={s.navlink}>
          Don`t have an account?
        </NavLink>
      </div>

      {inputFields.map(el => (
        <InputRhf key={el} inputName={el} errors={errors} register={register} />
      ))}

      <Button type="submit" border="round" label="Submit" />
    </form>
  );
};

export default SigninForm;
