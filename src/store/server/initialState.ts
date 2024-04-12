export type TCommonInitialState = {
  status: string;
  logs: string;
  ping: {
    loc: [string, 0];
    msg: string;
    type: string;
  };
};

export const commonInitialState: TCommonInitialState = {
  status: '',
  logs: '',
  ping: {
    loc: ['', 0],
    msg: '',
    type: '',
  },
};
