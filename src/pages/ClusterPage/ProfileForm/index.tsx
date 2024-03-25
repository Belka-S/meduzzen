import InputRhf from 'components/InputRHF';
import Button from 'components/ui/Button';
import { Resolver, SubmitHandler, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppExtraDispatch } from 'store';
import { editActiveUser, updateUserInfoThunk } from 'store/user';
import { useUser } from 'utils/hooks';
import { profileSchema } from 'utils/validation';
import { InferType } from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';

import s from './index.module.scss';

type TInput = InferType<typeof profileSchema>;

const inputFields = Object.keys(profileSchema.fields) as Array<keyof TInput>;

const ProfileForm = () => {
  const { id } = useParams();

  const dispatch = useAppDispatch();
  const dispatchExtra = useAppExtraDispatch();
  const { activeUser } = useUser();

  const resolver: Resolver<TInput> = yupResolver(profileSchema);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TInput>({
    resolver,
    mode: 'onChange',
    defaultValues: { ...activeUser },
  });

  const onSubmit: SubmitHandler<TInput> = data => {
    dispatchExtra(updateUserInfoThunk({ ...data, user_id: Number(id) }))
      .unwrap()
      .then(() => dispatch(editActiveUser({ ...data, edit: false })));
  };

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      {inputFields.map(el => (
        <InputRhf key={el} inputName={el} errors={errors} register={register} />
      ))}

      <Button type="submit" color="outlined" variant="smooth" label="Submit" />
    </form>
  );
};

export default ProfileForm;
