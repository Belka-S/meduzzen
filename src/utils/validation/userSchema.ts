import { regExp } from 'utils/constants';
import * as Yup from 'yup';

const pattern = (regExp: regExp.TRegExp): [RegExp, string] => {
  return [regExp.pattern, regExp.msg];
};

// Name, Email, Password
const firstName = Yup.string()
  .min(4, 'is too short')
  .required('is required')
  .matches(...pattern(regExp.NAME));
const lastName = firstName;
const email = Yup.string()
  .required('is required')
  .matches(...pattern(regExp.EMAIL));
const password = Yup.string().min(6, 'is too short').required('is required');
const confirmPass = password.oneOf([Yup.ref('password')], 'must match');
const code = Yup.string().required('is required');

// Avatar
// const MAX_SIZE = 1024 * 1024;
// const MB = 1024 * 1024; // const kB = 1024;

// const avatar = Yup.mixed()
//   .test('size', ` max file size: ${MAX_SIZE / MB}MB`, (file: any) =>
//     !file ? true : file.size <= MAX_SIZE,
//   )
//   .test('type', 'invalid file type', (file: any) =>
//     !file ? true : file.type.includes('image'),
//   );

export const signupSchema = Yup.object().shape({
  ['first name']: firstName,
  ['last name']: lastName,
  email,
  password,
  ['confirm password']: confirmPass,
});
export const signinSchema = Yup.object().shape({ email, password });
export const verifySchema = Yup.object().shape({ verificationCode: code });
export const forgotSchema = Yup.object().shape({ email });
export const resetSchema = Yup.object().shape({
  newPass: password,
  confirmPass: password.oneOf([Yup.ref('newPass')], 'must match'),
});

export const profileSchema = Yup.object().shape({
  firstName,
  lastName,
  email,
  whatsApp: Yup.string().matches(...pattern(regExp.PHONE)),
  telegram: Yup.string().matches(...pattern(regExp.TELEGRAM)),
  location: Yup.string().matches(...pattern(regExp.ADDRESS)),
  socialLink: Yup.string().matches(...pattern(regExp.HTTP)),
  birthday: Yup.string().matches(...pattern(regExp.DATE)),
  about: Yup.string(),
});

// export const avatarSchema = Yup.object().shape({ avatar });
