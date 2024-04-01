import { makeStore, rootReducer, store } from 'store';

export type TRootState = ReturnType<typeof rootReducer>; // without rootReducer -> TRootState = ReturnType<typeof store.getState>;
export type TAppStore = ReturnType<typeof makeStore>;
export type TAppDispatch = typeof store.dispatch;

// auth
export type TAuth = {
  access_token: string;
  token_type?: string;
};

export type TPassword = {
  user_id: number;
  user_password: string;
  user_password_repeat: string;
};

export interface IRegister
  extends Pick<TUser, 'user_email' & 'user_firstname' & 'user_lastname'> {
  user_firstname: string;
  user_password: string;
  user_password_repeat: string;
}

// user
export type TUser = {
  user_id: number;
  user_email: string;
  user_firstname: string;
  user_lastname: string;
  user_avatar: string;
  user_status: string | null;
  user_city: string | null;
  user_phone: string | null;
  user_links: string[];
  is_superuser: boolean;
};

// companies
export type TCompany = {
  company_id: number;
  company_name: string;
  company_title: string | null;
  company_description: string | null;
  company_city: string | null;
  company_phone: string | null;
  company_avatar: string;
  is_visible: boolean;

  company_links: string[];
  company_owner: Pick<
    TUser,
    'user_id' &
      'user_email' &
      'user_firstname' &
      'user_lastname' &
      'user_avatar'
  >;
};

export type TCompanyFromList = Pick<
  TCompany,
  'company_id' &
    'company_name' &
    'company_title' &
    'company_avatar' &
    'is_visible'
>;

export type TCompaniesList = Array<TCompanyFromList>;

// pagination
export type TPagination = {
  current_page: number;
  total_page: number;
  total_results?: number;
};

export type TPaginationParams = { page: number; page_size: number };

// edit avatar
export type TEdit = false | 'avatar' | 'data';

// actions
export type TQuiz = {
  quiz_id: number;
  quiz_name: string;
  quiz_title: string;
  quiz_description: string;
};

export type TAction = { action_id: number; action: string };

export type TActionParams = Pick<TUser, 'user_id'> &
  Pick<TCompany, 'company_id'>;

// user data
export type TMyCompanyFromList = TCompanyFromList & TAction;

export type TQuizUserParams = Pick<TUser, 'user_id'> & Pick<TQuiz, 'quiz_id'>;

export type TNotificationParams = Pick<TUser, 'user_id'> & {
  notification_id: number;
};

export type TRating = { rating: number; user_id: number };

export type TRatingAnalytic = {
  current_rating: number;
  average_rating: number;
  pass_at: Date;
};

export type TAnswers = {
  user_id: number;
  company_id: number;
  quiz_id: number;
  question_id: number;
  question: string;
  answer: string;
  is_correct: boolean;
  created_at: Date;
};

export type TQuizPass = TQuiz & { last_quiz_pass_at: Date };
export type TQuizPassList = Pick<TQuiz, 'quiz_id'> & {
  last_quiz_pass_at: Date;
};
export type TUsersWithQuizzesPassed = Array<
  Pick<TUser, 'user_id'> & TQuizPassList
>;

export type TNotification = {
  notification_id: number;
  notification_title: string;
  notification_message: string;
  notification_user_id: number;
  notification_company_id: number;
  is_read: boolean;
  created_at: Date;
};

// company data
export type TQuizCompanyParams = Pick<TCompany, 'company_id'> &
  Pick<TQuiz, 'quiz_id'>;

export type TUserFromList = TAction &
  Pick<
    TUser,
    'user_id' &
      'user_email' &
      'user_firstname' &
      'user_lastname' &
      'user_avatar'
  >;
