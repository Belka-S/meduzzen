export const trimName = (text: string) => {
  const trash = ['@', '_', '.'];
  const isNormal = trash.every(el => !text.includes(el));
  let normText = text;
  if (!isNormal) {
    for (let i = 0; i < trash.length; i += 1) {
      const index = normText.indexOf(trash[i]);
      if (index !== -1) {
        normText = normText.substring(0, index);
      }
    }
  }
  return normText;
};
