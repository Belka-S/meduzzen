export type TUserInitialState = {
  id: string;
  name: string;
  email: string;
  verifiedEmail: string;
  accessToken: string;
  refreshToken: string;
};

export const userInitialState: TUserInitialState = {
  id: '',
  name: '',
  email: '',
  verifiedEmail: '',
  accessToken: '',
  refreshToken: '',
};
