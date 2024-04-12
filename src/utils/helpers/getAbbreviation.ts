export const getAbbreviation = (text: string) => {
  const abbreviation = text
    ?.replace('-', ' ')
    .split(/\s+/)
    .reduce((acc, el) => acc + el.at(0), '')
    .substring(0, 2);

  return abbreviation;
};
