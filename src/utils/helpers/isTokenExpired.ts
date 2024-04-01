// const isTokenExpired = (token: string) => Date.now() >= JSON.parse(atob(token.split('.')[1])).exp * 1000;
// const isTokenExpired = (token: string) => Date.now() >= JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString()).exp * 1000;

export const isTokenExpired = (JWT: string) => {
  const jwtPayload = JSON.parse(atob(JWT.split('.')[1]));
  const isExpired = Date.now() >= jwtPayload.exp * 1000;
  return isExpired;
};
