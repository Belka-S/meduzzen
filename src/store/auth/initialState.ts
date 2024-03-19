export type TUserInitialState = {
  id: string | null;
  name: string | null;
  email: string | null;
  verifiedEmail: string | null;
  accessToken: string | null;
  refreshToken: string | null;
};

export const userInitialState: TUserInitialState = {
  id: null,
  name: null,
  email: null,
  verifiedEmail: null,
  accessToken: null,
  refreshToken: null,
};
