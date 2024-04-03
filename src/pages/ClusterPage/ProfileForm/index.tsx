import { useEffect, useMemo } from 'react';
import InputText from 'components/InputText';
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
  const allLinks = useMemo(
    () => inputFields.filter(el => el.includes('link')),
    [],
  );

  // hidden link inputs
  let hiddenLinks = useMemo(
    () =>
      allLinks
        .map((el, i) => {
          if (user?.user_links && !user.user_links[i]) return el;
        })
        .filter(el => el && el)
        .slice(1),
    [allLinks, user?.user_links],
  );
  hiddenLinks = useMemo(
    () =>
      !hiddenLinks.length
        ? hiddenLinks
        : inputFields.filter(el => el.includes('_link')),
    [hiddenLinks],
  );

  // initial link inputs
  const initialLinks = useMemo(
    () =>
      allLinks.reduce((acc, el, i) => {
        if (user?.user_links && user?.user_links[i]) {
          return { ...acc, [el]: user?.user_links[i] };
        } else return acc;
      }, {}),
    [allLinks, user?.user_links],
  );

  // RHF
  const resolver: Resolver<TInput> = yupResolver(userProfileSchema);
  const { register, handleSubmit, watch, formState } = useForm<TInput>({
    resolver,
    mode: 'onChange',
    defaultValues: { ...user, ...initialLinks },
  });
  const { errors, isValid, touchedFields } = formState;

  const onSubmit: SubmitHandler<TInput> = async data => {
    const user_id = Number(id);
    const user_links = allLinks
      .map(el => data[el])
      .filter(el => el && el) as string[];

    await dispatchExtra(updateInfoThunk({ user_id, ...data, user_links }));
    const { payload } = await dispatchExtra(getUserThunk(user_id));
    toast.success(payload.detail);
    dispatch(editUser(false));
  };

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

  const isDisabled = !isValid || Object.keys(touchedFields).length === 0;

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      {inputFields.map(el => (
        <InputText
          key={el}
          style={{ display: hiddenLinks.includes(el) ? 'none' : 'block' }}
          inputField={el}
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
