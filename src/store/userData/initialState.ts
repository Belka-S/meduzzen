import {
  TAnswers,
  TCompanyOfList,
  TNotification,
  TQuizPass,
  TRatingAnalytic,
} from 'store';

export type TInitialState = {
  myCompanies: TCompanyOfList[];
  invites: TCompanyOfList[];
  requests: TCompanyOfList[];

  rating: number;
  analytic: TRatingAnalytic[];
  ratingInCompany: number;
  analyticInCompany: TRatingAnalytic[];
  ratingForQuiz: number;
  analyticForQuiz: TRatingAnalytic[];

  answers: TAnswers[];
  quizzesPass: TQuizPass[];
  notifications: TNotification[];
  readNoteId: number;

  loading: boolean;
  error: boolean | string;
};

export const initialState: TInitialState = {
  myCompanies: [],
  invites: [],
  requests: [],

  rating: 0,
  analytic: [],
  ratingInCompany: 0,
  analyticInCompany: [],
  ratingForQuiz: 0,
  analyticForQuiz: [],

  answers: [],
  quizzesPass: [],
  notifications: [],
  readNoteId: 0,

  loading: false,
  error: false,
};
