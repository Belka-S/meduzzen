import {
  TAnswers,
  TQuiz,
  TRating,
  TRatingAnalytic,
  TUserOfList,
  TUsersWithQuizzesPassed,
} from 'store';

export type TInitialState = {
  members: TUserOfList[];
  invites: TUserOfList[];
  requests: TUserOfList[];
  blocked: TUserOfList[];
  quizzes: TQuiz[];
  quizzesPassed: TUsersWithQuizzesPassed[];

  answersCompany: TAnswers[];
  answersUser: TAnswers[];
  answersQuiz: TAnswers[];

  ratingUsers: TRating[];
  ratingUser: TRating[];
  ratingQuiz: TRating[];

  analyticUsers: TRatingAnalytic[];
  analyticUser: TRatingAnalytic[];
  analyticQuiz: TRatingAnalytic[];

  loading: boolean;
  error: boolean | string;
};

export const initialState: TInitialState = {
  members: [],
  invites: [],
  requests: [],
  blocked: [],
  quizzes: [],
  quizzesPassed: [],

  answersCompany: [],
  answersUser: [],
  answersQuiz: [],

  ratingUsers: [],
  ratingUser: [],
  ratingQuiz: [],

  analyticUsers: [],
  analyticUser: [],
  analyticQuiz: [],

  loading: false,
  error: false,
};
