export const getArrFromObj = (obj: { [key: string]: unknown }) => {
  const arr = (Object.keys(obj) as Array<keyof typeof obj>).reduce(
    (acc, key) => {
      obj[key] && acc.push({ [key]: obj[key] });
      return acc;
    },
    [] as (typeof obj)[keyof typeof obj][],
  );
  return arr.filter(el => el && el);
};
