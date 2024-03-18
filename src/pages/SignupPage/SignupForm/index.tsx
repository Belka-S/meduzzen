import classNames from 'classnames';
import Button from 'components/ui/Button';
import H3 from 'components/ui/Typography/H3';
import { Resolver, SubmitHandler, useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
// import { registerThunk } from 'store/auth/authThunks';
import { signupSchema } from 'utils/validation';
import { InferType } from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';

import s from './index.module.scss';

type Inputs = InferType<typeof signupSchema>;

const inputFields = Object.keys(signupSchema.fields) as Array<keyof Inputs>;

const SignupForm = () => {
  // const router = useRouter();
  const resolver: Resolver<Inputs> = yupResolver(signupSchema);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ mode: 'onChange', resolver });

  const onSubmit: SubmitHandler<Inputs> = data => {
    console.log('data: ', data);
    // dispatch(registerThunk(data));
  };

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={s.title__wrap}>
        <H3 className={s.title}>Sign Up</H3>
        <NavLink to={'/signin'} className={s.navlink} href="#">
          Have an account?
        </NavLink>
      </div>

      {inputFields.map(field => (
        <label key={field}>
          <span className={s.label}>{field}</span>
          <span className={s.error}> {errors[field]?.message}</span>
          <input
            type={field}
            placeholder=""
            readOnly
            onFocus={e => e.target.removeAttribute('readonly')}
            className={classNames(s.input, errors[field] ? s.invalid : s.valid)}
            {...register(field, { required: true })}
          />
        </label>
      ))}

      <Button type="submit" border="round" size="m" label="Submit" />
    </form>
  );
};

export default SignupForm;
