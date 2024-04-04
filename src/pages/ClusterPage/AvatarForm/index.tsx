import { ChangeEvent, useEffect, useState } from 'react';
import InputFile from 'components/InputFile';
import Button from 'components/ui/Button';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppExtraDispatch } from 'store';
import { editUser, updateAvatarPreview, updateAvatarThunk } from 'store/user';
import { getAbbreviation, getRandomColor } from 'utils/helpers';
import { getRandomNumber } from 'utils/helpers/getRandomNumber';
import { useUser } from 'utils/hooks';
import { avatarSchema } from 'utils/validation';
import { InferType, ValidationError } from 'yup';

import s from './index.module.scss';

type TInput = InferType<typeof avatarSchema>;

const AvatarForm = () => {
  const dispatch = useAppDispatch();
  const dispatchExtra = useAppExtraDispatch();
  const { user } = useUser();
  const [fileError, setFileError] = useState<'noError' | string>('');

  // RHF
  const { register, control, handleSubmit, formState } = useForm<TInput>({
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<TInput> = async data => {
    const formData = new FormData();
    let file = (data.file as unknown as FileList)[0];
    if (!file?.type) {
      file = data.file as File;
    }
    formData.append('file', file);
    // for (const [key, value] of formData) { console.log(`${key}: ${value}`); }
    await dispatchExtra(updateAvatarThunk(formData));
    dispatch(editUser(false));
    document.location.reload();
  };

  // avatar file, preview image
  const setAvatar = async (e: Event | ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const avatar = (target.files as FileList)[0];
    const user_avatar = URL.createObjectURL(avatar);
    dispatch(updateAvatarPreview({ user_avatar }));
    try {
      await avatarSchema.validate({ file: avatar }, { abortEarly: false });
      setFileError('noError');
    } catch (err) {
      if (err instanceof ValidationError) {
        const msg = err.inner[0].message;
        toast.error(msg);
        setFileError(msg);
      }
      return err;
    }
  };

  // profile button styles
  const btnId = `profile-${getRandomNumber(12)}`;
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

  // input validation
  const errorMessage = fileError === 'noError' ? '' : fileError;
  const isModified = Object.keys(formState.touchedFields).length > 0;
  const isDisabled = !isModified || errorMessage;

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      <InputFile
        inputName={'file'}
        register={register}
        control={control}
        callback={setAvatar}
        accept={'image/*'}
        btnId={btnId}
        fileError={fileError}
        errorMessage={errorMessage}
      />

      {Object.keys(formState.touchedFields).length > 0 && (
        <Button
          className={s.button}
          type="submit"
          color={isDisabled ? 'disabled' : 'outlined'}
          variant="smooth"
          label="Submit"
          onClick={e => e.currentTarget.blur()}
        />
      )}
    </form>
  );
};

export default AvatarForm;
