import { ChangeEvent, useEffect, useState } from 'react';
import InputFile from 'components/InputFile';
import Button from 'components/ui/Button';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppExtraDispatch } from 'store';
import { editCompany, getCompanyThunk } from 'store/company';
import { updateAvatarPreview, updateAvatarThunk } from 'store/company';
import { getAbbreviation, getRandomColor } from 'utils/helpers';
import { getRandomNumber } from 'utils/helpers/getRandomNumber';
import { useCompany } from 'utils/hooks';
import { avatarSchema } from 'utils/validation';
import { InferType, ValidationError } from 'yup';

import s from './index.module.scss';

type TInput = InferType<typeof avatarSchema>;

const AvatarForm = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const dispatchExtra = useAppExtraDispatch();
  const { company } = useCompany();
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
    await dispatchExtra(getCompanyThunk({ company_id: Number(id) }));
    dispatch(editCompany(false));
  };

  // avatar file, preview image
  const setAvatar = async (e: Event | ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const avatar = (target.files as FileList)[0];
    const company_avatar = URL.createObjectURL(avatar);
    dispatch(updateAvatarPreview({ company_avatar }));
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
    if (company?.company_avatar) {
      // document.styleSheets[0].deleteRule(0);
      document.styleSheets[0].insertRule(
        `#${btnId} {background-image: url(${company?.company_avatar})}`,
        0,
      );
    } else if (company?.company_name) {
      const abbr = getAbbreviation(company?.company_name);
      document.styleSheets[0].insertRule(
        `#${btnId}::after { background-color: ${color}; color: #ffffff; content: '${abbr}'}`,
      );
    }
  }, [btnId, color, company]);

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
