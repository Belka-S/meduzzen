import Button from 'components/ui/Button';
import { Resolver, SubmitHandler, useForm } from 'react-hook-form';
// import { useAppDispatch, useAppExtraDispatch } from 'store';
// import { editActiveUser } from 'store/user';
// import { useAuth } from 'utils/hooks';
import { avatarSchema } from 'utils/validation';
import { InferType } from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';

import s from './index.module.scss';

type TInput = InferType<typeof avatarSchema>;

const inputFields = Object.keys(avatarSchema.fields) as Array<keyof TInput>;

const AvatarForm = () => {
  // const dispatch = useAppDispatch();
  // const dispatchExtra = useAppExtraDispatch();
  // const { user } = useAuth();
  console.log(inputFields[0]);

  const resolver: Resolver<TInput> = yupResolver(avatarSchema);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TInput>({
    resolver,
    mode: 'onChange',
    // defaultValues: { email: user.user_email ?? '' },
  });

  const onSubmit: SubmitHandler<TInput> = data => {
    console.log('data: ', data);
    const formData = new FormData();
    // const file = new File([''], 'file');
    formData.append('file', data.file);
    console.log('formData: ', formData);

    // dispatchExtra(authThunk({ user_email, user_password }))
    //   .unwrap()
    //   .then(() => dispatch(editActiveUser({ edit: false })));
  };

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      <label>
        <span>{errors.file?.message}</span>
        <input
          className={s.avatar}
          type="file"
          accept="image/*"
          {...register('file', { required: true })}
        />
      </label>

      <Button
        type="submit"
        size="s"
        color="outlined"
        variant="smooth"
        label="Submit"
      />
    </form>
  );
};

export default AvatarForm;
