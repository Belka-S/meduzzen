import {
  TAnswers,
  TMyCompanyFromList,
  TNotification,
  TQuizPass,
  TRatingAnalytic,
} from 'store';

export type TInitialState = {
  myCompanies: TMyCompanyFromList[];
  invites: TMyCompanyFromList[];
  requests: TMyCompanyFromList[];

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
  error: boolean;
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
