import { ChangeEvent, useEffect, useState } from 'react';
import classNames from 'classnames';
import Button from 'components/ui/Button';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppExtraDispatch } from 'store';
import { getMeThunk, updateAvatarPreview, updateAvatarThunk } from 'store/user';
import { editUser } from 'store/user';
import { getAbbreviation, getRandomColor } from 'utils/helpers';
import { useUser } from 'utils/hooks';
import { avatarSchema } from 'utils/validation';
import { InferType, ValidationError } from 'yup';

import s from './index.module.scss';

type TInput = InferType<typeof avatarSchema>;

const AvatarForm = () => {
  const dispatch = useAppDispatch();
  const dispatchExtra = useAppExtraDispatch();
  const { user } = useUser();

  const [avatarError, setAvatarError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { touchedFields },
  } = useForm<TInput>({ mode: 'onChange' });

  // avatar preview
  const setAvatar = async (e: Event | ChangeEvent) => {
    setAvatarError('');

    const target = e.target as HTMLInputElement;
    const avatar = (target.files as FileList)[0];

    const user_avatar = URL.createObjectURL(avatar);
    dispatch(updateAvatarPreview({ user_avatar }));
    try {
      await avatarSchema.validate({ file: avatar }, { abortEarly: false });
      setAvatarError('noError');
    } catch (err) {
      if (err instanceof ValidationError) {
        const msg = err.inner[0].message;
        toast.error(msg);
        setAvatarError(msg);
      }
      return err;
    }
  };

  // profile button styles
  const random = (Math.random() * 1000).toFixed();
  const btnId = `profile-${user?.user_id}${random}`;
  const color = getRandomColor(60);

  useEffect(() => {
    if (user?.user_avatar) {
      document.styleSheets[0].insertRule(
        `#${btnId} {background-image: url(${user?.user_avatar})}`,
        0,
      );
    } else if (user?.user_firstname || user?.user_lastname) {
      const abbr = getAbbreviation(
        `${user?.user_firstname} ${user?.user_lastname}`,
      );
      document.styleSheets[0].insertRule(
        `#${btnId}::after { background-color: ${color}; color: #ffffff; content: '${abbr}'}`,
      );
    }
  }, [btnId, color, user]);

  const onSubmit: SubmitHandler<TInput> = data => {
    const formData = new FormData(); // for (const [key, value] of formData) { console.log(`${key}: ${value}`); }
    const file = (data.file as FileList)[0];
    formData.append('file', file);

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
          {...register('file', { required: true })}
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
