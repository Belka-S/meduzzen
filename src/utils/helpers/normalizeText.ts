export const normalizeText = (text: string) => {
  const index = text.indexOf('_');
  const normalText = text
    .substring(index + 1)
    .replace('name', ' name')
    .replace('password_repeat', 'confirm password');
  return normalText;
};
