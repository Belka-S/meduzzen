import { regExp } from 'utils/constants';
import * as Yup from 'yup';

const pattern = (regExp: regExp.TRegExp): [RegExp, string] => {
  return [regExp.pattern, regExp.msg];
};

// name
const name = Yup.string()
  .min(4, 'is too short')
  .required('is required')
  .matches(...pattern(regExp.NAME));

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
const text = Yup.string()
  .min(4, 'is too short')
  .nullable()
  .transform(value => (value ? value : null));

// link
const link = Yup.string()
  .matches(...pattern(regExp.HTTP))
  .nullable()
  .transform(value => (value ? value : null));

// file
const MAX_SIZE = 1024 * 1024;
const MB = 1024 * 1024; // const kB = 1024;

const file = Yup.mixed<File>().test(
  'size',
  ` max file size: ${MAX_SIZE / MB}MB`,
  file => (!file ? true : file.size <= MAX_SIZE),
); // .test('type', 'invalid file type', (file: any) => !file ? true : file.type.includes('image'), );

export { address, email, file, link, name, password, phone, text };
