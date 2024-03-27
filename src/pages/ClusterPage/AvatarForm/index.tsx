import { FormEvent, useEffect, useState } from 'react';
import classNames from 'classnames';
import Button from 'components/ui/Button';
import { Resolver, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppExtraDispatch } from 'store';
import { getMeThunk, updateAvatarPreview, updateAvatarThunk } from 'store/user';
import { editUser } from 'store/user';
import { getAbbreviation, getRandomColor } from 'utils/helpers';
import { useUser } from 'utils/hooks';
import { avatarSchema } from 'utils/validation';
import { InferType } from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';

import s from './index.module.scss';

type TInput = InferType<typeof avatarSchema>;

const AvatarForm = () => {
  const dispatch = useAppDispatch();
  const dispatchExtra = useAppExtraDispatch();
  const { user } = useUser();
  const { user_id, user_firstname, user_lastname, user_avatar } = user;

  const [avatarError, setAvatarError] = useState('');

  const resolver: Resolver<TInput> = yupResolver(avatarSchema);
  const {
    register,
    handleSubmit,
    formState: { touchedFields },
  } = useForm<TInput>({
    resolver,
    mode: 'onChange',
  });

  // avatar preview
  const setAvatar = async (e: FormEvent<HTMLInputElement>) => {
    setAvatarError('');
    const avatar = e.target.files[0];
    const user_avatar = URL.createObjectURL(avatar);
    dispatch(updateAvatarPreview({ user_avatar }));

    try {
      await avatarSchema.validate({ avatar }, { abortEarly: false });
      setAvatarError('noError');
    } catch (err) {
      const msg = err.inner[0].message;
      toast.error(msg);
      setAvatarError(msg);
      return err;
    }
  };

  // profile button styles
  const random = (Math.random() * 1000).toFixed();
  const btnId = `profile-${user_id}${random}`;
  const color = getRandomColor(60);

  useEffect(() => {
    if (user_avatar) {
      document.styleSheets[0].insertRule(
        `#${btnId} {background-image: url(${user_avatar})}`,
        0,
      );
    } else if (user_firstname || user_lastname) {
      const abbr = getAbbreviation(`${user_firstname} ${user_lastname}`);
      // document.styleSheets[0].deleteRule(0);
      document.styleSheets[0].insertRule(
        `#${btnId}::after { background-color: ${color}; color: #ffffff; content: '${abbr}'}`,
      );
    }
  }, [btnId, color, user_avatar, user_firstname, user_lastname]);

  const onSubmit: SubmitHandler<TInput> = data => {
    const formData = new FormData();
    if (data.file && data.file[0]) {
      formData.append('file', data.file[0]);
    } // for (const [key, value] of formData) { console.log(`${key}: ${value}`); }

    dispatchExtra(updateAvatarThunk(formData))
      .unwrap()
      .then(() => dispatchExtra(getMeThunk()))
      .finally(() => dispatch(editUser(false)));
  };

  const errorMessage = avatarError === 'noError' ? '' : avatarError;

  const isDisabled = errorMessage || Object.keys(touchedFields).length === 0;

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      <label>
        <span className={s.error}>{errorMessage}</span>
        <input
          id={`${btnId}`}
          className={classNames(
            s.avatar,
            avatarError && s.border__error,
            avatarError === 'noError' && s.border__success,
          )}
          type="file"
          accept="image/*"
          {...register('avatar', { required: true })}
          onChange={e => setAvatar(e)}
        />
      </label>

      <Button
        className={s.button}
        type="submit"
        color={isDisabled ? 'disabled' : 'outlined'}
        variant="smooth"
        label="Submit"
        onClick={e => e.currentTarget.blur()}
      />
    </form>
  );
};

export default AvatarForm;
