import InputRhf from 'components/InputRHF';
import Button from 'components/ui/Button';
import SvgIcon from 'components/ui/SvgIcon';
import H3 from 'components/ui/Typography/H3';
import { Resolver, SubmitHandler, useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import { useAppExtraDispatch } from 'store';
import { registerThunk } from 'store/user';
import { signupSchema } from 'utils/validation';
import { InferType } from 'yup';

import { useAuth0 } from '@auth0/auth0-react';
import { yupResolver } from '@hookform/resolvers/yup';

import s from './index.module.scss';

type TInput = InferType<typeof signupSchema>;

const inputFields = Object.keys(signupSchema.fields) as Array<keyof TInput>;

const SignupForm = () => {
  const dispatch = useAppExtraDispatch();
  const { loginWithRedirect } = useAuth0();
  const resolver: Resolver<TInput> = yupResolver(signupSchema);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TInput>({ mode: 'onChange', resolver });

  const onSubmit: SubmitHandler<TInput> = data => {
    const credentials = {
      user_email: data.email,
      user_firstname: data['first name'],
      user_lastname: data['last name'],
      user_password: data.password,
      user_password_repeat: data['confirm password'],
    };
    dispatch(registerThunk(credentials));
  };

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={s.title__wrap}>
        <H3 className={s.title}>Sign up</H3>
        <NavLink to={'/signin'} className={s.navlink}>
          Have an account?
        </NavLink>
      </div>

      {inputFields.map(el => (
        <InputRhf key={el} inputName={el} errors={errors} register={register} />
      ))}

      <Button type="submit" variant="smooth" label="Sign up" />
      <Button
        onClick={() =>
          loginWithRedirect({
            authorizationParams: { screen_hint: 'signup' },
          })
        }
        color="outlined"
        variant="smooth"
        label="Continue with"
      >
        <SvgIcon svgId="auth0" size={125} />
      </Button>
    </form>
  );
};

export default SignupForm;
