import { useEffect } from 'react';
import InputRhf from 'components/InputRhf';
import Button from 'components/ui/Button';
import { Resolver, SubmitHandler, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppExtraDispatch } from 'store';
import { editUser, getUserThunk, updateInfoThunk } from 'store/user';
import { useUser } from 'utils/hooks';
import { userProfileSchema } from 'utils/validation';
import { InferType } from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';

import s from './index.module.scss';

type TInput = InferType<typeof userProfileSchema>;

const inputFields = Object.keys(userProfileSchema.fields) as Array<
  keyof TInput
>;

const ProfileForm = () => {
  const dispatch = useAppDispatch();
  const dispatchExtra = useAppExtraDispatch();
  const { id } = useParams();
  const { user } = useUser();

  // all link inputs
  const allLinks = inputFields.filter(el => el.includes('link'));

  // hidden link inputs
  let hiddenLinks = allLinks
    .map((el, i) => {
      if (user?.user_links && !user.user_links[i]) return el;
    })
    .filter(el => el && el)
    .slice(1);

  hiddenLinks =
    hiddenLinks.length > 0
      ? hiddenLinks
      : inputFields.filter(el => el.includes('_link'));

  // initial link inputs
  const initialLinks = allLinks.reduce((acc, el, i) => {
    if (user?.user_links && user?.user_links[i]) {
      return { ...acc, [el]: user?.user_links[i] };
    } else return acc;
  }, {});

  const resolver: Resolver<TInput> = yupResolver(userProfileSchema);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid, touchedFields },
  } = useForm<TInput>({
    resolver,
    mode: 'onChange',
    defaultValues: { ...user, ...initialLinks },
  });

  // automaticly open new link input
  inputFields.map(el => watch(el));

  // show / hide inputs
  useEffect(() => {
    const linkElObj = inputFields
      .filter(el => el.includes('link'))
      .map(el => {
        const inputEl = document.querySelector(`input[name="${el}"]`);
        const labelEl = inputEl?.closest('label');
        return {
          input: inputEl as HTMLInputElement,
          label: labelEl as HTMLLabelElement,
        };
      });

    if (linkElObj && linkElObj[0].input) {
      for (let i = 0; i < linkElObj.length - 1; i += 1) {
        if (linkElObj[i].input.value) {
          linkElObj[i + 1].label.style.display = 'block';
        } else {
          linkElObj[i + 1].label.style.display = 'none';
        }
      }
    }
  }, [initialLinks]);

  const onSubmit: SubmitHandler<TInput> = data => {
    const user_id = Number(id);
    const user_links = allLinks.map(el => data[el]).filter(el => el && el);
    dispatchExtra(updateInfoThunk({ user_id, ...data, user_links }))
      .then(() => dispatchExtra(getUserThunk(user_id)))
      .then(res => toast.success(res.payload.detail))
      .finally(() => dispatch(editUser(false)));
  };

  const isDisabled = !isValid || Object.keys(touchedFields).length === 0;

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      {inputFields.map(el => (
        <InputRhf
          key={el}
          style={{ display: hiddenLinks.includes(el) ? 'none' : 'block' }}
          inputName={el}
          errors={errors}
          watch={watch}
          register={register}
        />
      ))}

      <Button
        type="submit"
        color={isDisabled ? 'disabled' : 'outlined'}
        variant="smooth"
        label="Submit"
        onClick={e => e.currentTarget.blur()}
        onMouseOver={e => e.currentTarget.focus()}
      />
    </form>
  );
};

export default ProfileForm;
