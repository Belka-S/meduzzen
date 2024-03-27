import { regExp } from 'utils/constants';
import * as Yup from 'yup';

const pattern = (regExp: regExp.TRegExp): [RegExp, string] => {
  return [regExp.pattern, regExp.msg];
};

// name
const firstName = Yup.string()
  .min(4, 'is too short')
  .required('is required')
  .matches(...pattern(regExp.NAME));
const lastName = firstName;

// email
const email = Yup.string()
  .required('is required')
  .matches(...pattern(regExp.EMAIL));

// password
const password = Yup.string().min(6, 'is too short').required('is required');

// phone
const phone = Yup.string()
  .matches(...pattern(regExp.PHONE))
  .nullable()
  .transform(value => (value ? value : null));

// address
const address = Yup.string()
  .matches(...pattern(regExp.ADDRESS))
  .nullable()
  .transform(value => (value ? value : null));

// status
const status = Yup.string()
  .min(4, 'is too short')
  .nullable()
  .transform(value => (value ? value : null));

// link
const link = Yup.string()
  .matches(...pattern(regExp.HTTP))
  .nullable()
  .transform(value => (value ? value : null));

// const links = Yup.array()
//   .min(1, "You can't leave this blank.")
//   .required("You can't leave this blank.")
//   .nullable();

// file
const MAX_SIZE = 1024 * 1024;
const MB = 1024 * 1024; // const kB = 1024;

const file = Yup.mixed<FileList>().test(
  'size',
  `You need to provide a file, max size: ${MAX_SIZE / MB}MB`,
  async files => {
    if (files) return true;
    // if (files) return files[0].size <= MAX_SIZE;
    return false;
  },
);

// const MAX_SIZE = 1024 * 1024;
// const MB = 1024 * 1024; // const kB = 1024;

// const file = Yup.mixed()
//   .test('size', ` max file size: ${MAX_SIZE / MB}MB`, (file: any) =>
//     !file ? true : file.size <= MAX_SIZE,
//   )
//   .test('type', 'invalid file type', (file: any) =>
//     !file ? true : file.type.includes('image'),
//   );
export const signinSchema = Yup.object().shape({
  user_email: email,
  user_password: password,
});

export const signupSchema = Yup.object().shape({
  user_firstname: firstName,
  user_lastname: lastName,
  user_email: email,
  user_password: password,
  user_password_repeat: password.oneOf(
    [Yup.ref('user_password')],
    'must match',
  ),
});

export const passwordSchema = Yup.object().shape({
  user_password: password,
  user_password_repeat: password.oneOf(
    [Yup.ref('user_password')],
    'must match',
  ),
});

export const profileSchema = Yup.object().shape({
  user_firstname: firstName,
  user_lastname: lastName,
  user_phone: phone,
  user_city: address,
  user_status: status,
  link: link,
  a_link: link,
  b_link: link,
  c_link: link,
  d_link: link,
});

export const avatarSchema = Yup.object().shape({ file });
