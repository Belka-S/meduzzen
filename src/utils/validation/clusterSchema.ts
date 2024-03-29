import * as Yup from 'yup';

import { address, link, name, phone, text } from './pattern';

export const companySchema = Yup.object().shape({
  company_name: name,
  is_visible: Yup.boolean().required().default(true),
});

export const companyProfileSchema = Yup.object().shape({
  company_name: name,
  company_title: text,
  company_phone: phone,
  company_city: address,
  company_description: text,
  link: link,
  a_link: link,
  b_link: link,
  c_link: link,
  d_link: link,
});
