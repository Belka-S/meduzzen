import InputRhf from 'components/InputRHF';
import Button from 'components/ui/Button';
import SvgIcon from 'components/ui/SvgIcon';
import H3 from 'components/ui/Typography/H3';
import { Resolver, SubmitHandler, useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const { loginWithRedirect } = useAuth0();
  const resolver: Resolver<TInput> = yupResolver(signupSchema);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TInput>({ mode: 'onChange', resolver });

  const onSubmit: SubmitHandler<TInput> = data => {
    dispatch(registerThunk(data))
      .unwrap()
      .then(() => navigate('/signin', { replace: true }));
  };

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={s.title__wrap}>
        <H3 className={s.title}>Sign Up</H3>
        <NavLink to={'/signin'} className={s.navlink}>
          Have an account?
        </NavLink>
      </div>

      {inputFields.map(el => (
        <InputRhf key={el} inputName={el} errors={errors} register={register} />
      ))}

      <Button
        type="submit"
        variant="smooth"
        label="Sign Up"
        onClick={e => e.currentTarget.blur()}
      />
      <Button
        onClick={() =>
          loginWithRedirect({
            authorizationParams: { screen_hint: 'signup' },
          })
        }
        color="outlined"
        variant="smooth"
        label="Continue With"
      >
        <SvgIcon svgId="auth0" size={125} />
      </Button>
    </form>
  );
};

export default SignupForm;
