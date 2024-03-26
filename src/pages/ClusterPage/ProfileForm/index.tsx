import { useEffect } from 'react';
import InputRhf from 'components/InputRHF';
import Button from 'components/ui/Button';
import { Resolver, SubmitHandler, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppExtraDispatch } from 'store';
import { editUser, getUserThunk, updateUserInfoThunk } from 'store/user';
import { useUser } from 'utils/hooks';
import { profileSchema } from 'utils/validation';
import { InferType } from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';

import s from './index.module.scss';

type TInput = InferType<typeof profileSchema>;

const inputFields = Object.keys(profileSchema.fields) as Array<keyof TInput>;

const ProfileForm = () => {
  const dispatch = useAppDispatch();
  const dispatchExtra = useAppExtraDispatch();
  const { id } = useParams();
  const { user } = useUser();

  // user links
  const allLinks = inputFields.filter(el => el.includes('link'));
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
  // const initialLinks = allLinks.reduce(function (acc, el, i) {
  //   const value = user.user_links[i];
  //   if (value) { acc[el] = value; }
  //   return acc; }, {});
  const initialLinks = allLinks
    .map((el, i) => {
      if (user.user_links && user.user_links[i]) {
        return {
          [el]: user.user_links[i],
        };
      }
    })
    .filter(el => el && el);

  let hiddenLinks = allLinks
    .map((el, i) => {
      if (user.user_links && !user.user_links[i]) {
        return el;
      }
    })
    .filter(el => el && el)
    .slice(1);

  hiddenLinks =
    hiddenLinks.length > 0
      ? hiddenLinks
      : inputFields.filter(el => el.includes('_link'));

  const resolver: Resolver<TInput> = yupResolver(profileSchema);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TInput>({
    resolver,
    mode: 'onChange',
    defaultValues: {
      ...user,
      ...initialLinks[0],
      ...initialLinks[1],
      ...initialLinks[2],
      ...initialLinks[3],
      ...initialLinks[4],
    },
  });

  useEffect(() => {
    if (linkElObj && linkElObj[0].input) {
      for (let i = 0; i < linkElObj.length - 1; i += 1) {
        if (linkElObj[i].input.value) {
          linkElObj[i + 1].label.style.display = 'block';
        }
      }
    }
  }, [linkElObj, initialLinks]);

  const onSubmit: SubmitHandler<TInput> = data => {
    const user_id = Number(id);
    const user_links = allLinks.map(el => data[el]).filter(el => el && el);

    dispatchExtra(updateUserInfoThunk({ ...data, user_id, user_links }))
      .then(() => dispatchExtra(getUserThunk(user_id)))
      .then(res => toast.success(res.payload.detail))
      .finally(() => dispatch(editUser(false)));
  };

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      {inputFields.map(el => (
        <InputRhf
          key={el}
          style={{ display: hiddenLinks.includes(el) ? 'none' : 'block' }}
          inputName={el}
          errors={errors}
          register={register}
        />
      ))}

      <Button type="submit" color="outlined" variant="smooth" label="Submit" />
    </form>
  );
};

export default ProfileForm;
