export type TUserInitialState = {
  id: string;
  name: string;
  email: string;
  accessToken: string;
};

export const userInitialState: TUserInitialState = {
  id: '',
  name: '',
  email: '',
  accessToken: '',
};
