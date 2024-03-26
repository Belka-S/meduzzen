import Button from 'components/ui/Button';
import { Resolver, SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch, useAppExtraDispatch } from 'store';
import { updateAvatarThunk } from 'store/user';
import { editUser } from 'store/user';
// import { useAuth } from 'utils/hooks';
import { avatarSchema } from 'utils/validation';
import { InferType } from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';

import s from './index.module.scss';

type TInput = InferType<typeof avatarSchema>;

const AvatarForm = () => {
  const dispatch = useAppDispatch();
  const dispatchExtra = useAppExtraDispatch();
  // const { user } = useAuth();

  const resolver: Resolver<TInput> = yupResolver(avatarSchema);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TInput>({
    resolver,
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<TInput> = data => {
    const formData = new FormData();
    if (data.file && data.file[0]) {
      formData.append('file', data.file[0]);
    }

    // for (const [key, value] of formData) {
    //   console.log(`${key}: ${value}`);
    // }

    dispatchExtra(updateAvatarThunk(formData))
      .unwrap()
      .finally(() => dispatch(editUser(false)));
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
