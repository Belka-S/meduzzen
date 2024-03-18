import classNames from 'classnames';
import Button from 'components/ui/Button';
import H3 from 'components/ui/Typography/H3';
import { Resolver, SubmitHandler, useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { loginThunk } from 'store/auth/authThunks';
// import { deleteElement, fetchElements } from 'store/elements/elementSlice';
// import { fetchElementsThunk } from 'store/elements/elementThunks';
// import { useAuth } from 'utils/hooks';
import { signinSchema } from 'utils/validation';
import { InferType } from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';

import s from './index.module.scss';

type Inputs = InferType<typeof signinSchema>;

const inputFields = Object.keys(signinSchema.fields) as Array<keyof Inputs>;

const SigninForm = () => {
  // const { user } = useAuth();

  const resolver: Resolver<Inputs> = yupResolver(signinSchema);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver,
    mode: 'onChange',
    // defaultValues: { email: user.email },
  });

  const onSubmit: SubmitHandler<Inputs> = data => {
    console.log('data: ', data);
    // dispatch(loginThunk(data))
    //   .unwrap()
    //   .then(pld => console.log(pld))
    //   .catch(err => err.includes('401') && toast.error('Unauthorized'));
  };

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={s.title__wrap}>
        <H3 className={s.title}>Sign In</H3>
        <NavLink to={'/signup'} className={s.navlink}>
          Don`t have an account?
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

export default SigninForm;
