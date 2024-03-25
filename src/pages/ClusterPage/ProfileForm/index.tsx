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
    defaultValues: {
      ['first name']: activeUser.user_firstname ?? '',
      ['last name']: activeUser.user_lastname ?? '',
      phone: activeUser.user_phone ?? '',
      city: activeUser.user_city ?? '',
      status: activeUser.user_status ?? '',
      // links: activeUser.user_links ?? '',
    },
  });

  const onSubmit: SubmitHandler<TInput> = data => {
    const credentials = {
      user_firstname: data['first name'],
      user_lastname: data['last name'],
      user_phone: data.phone,
      user_city: data.city,
      user_status: data.status,
    };

    dispatchExtra(updateUserInfoThunk({ ...credentials, user_id: Number(id) }))
      .unwrap()
      .then(() => dispatch(editActiveUser({ ...credentials, edit: false })));
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
