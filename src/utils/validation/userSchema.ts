import * as Yup from 'yup';

import { email, name, password, phone } from './pattern';
import { address, file, link, text } from './pattern';

export const signinSchema = Yup.object().shape({
  user_email: email,
  user_password: password,
});

export const signupSchema = Yup.object().shape({
  user_firstname: name,
  user_lastname: name,
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

export const userProfileSchema = Yup.object().shape({
  user_firstname: name,
  user_lastname: name,
  user_phone: phone,
  user_city: address,
  user_status: text,
  link: link,
  a_link: link,
  b_link: link,
  c_link: link,
  d_link: link,
});

export const avatarSchema = Yup.object().shape({ avatar: file });
