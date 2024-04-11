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

export type TRegister = {
  user_email: string;
  user_firstname: string;
  user_lastname: string;
  user_password: string;
  user_password_repeat: string;
};

// user
export type TUserOfList = {
  user_id: number;
  user_email: string;
  user_firstname: string;
  user_lastname: string;
  user_avatar: string;
  // action_id?: number; action?: 'owner' | 'member';
} & Partial<TAction>;

export type TUser = TUserOfList & {
  user_status: string | null;
  user_city: string | null;
  user_phone: string | null;
  user_links: string[];
  is_superuser: boolean;
};

// companies
export type TCompanyOfList = {
  company_id: number;
  company_name: string;
  company_title: string;
  company_avatar: string;
  is_visible: boolean;
  // action_id?: number; action?: 'owner' | 'member';
} & Partial<TAction>;

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
  company_owner: TUserOfList;
};

export type TCompanySelect = 'all' | 'owner' | 'member';

// pagination
export type TPagination = {
  current_page: number;
  total_page: number;
  total_results?: number;
};

export type TPaginationParams = { page: number; page_size: number };

// edit avatar
export type TEdit = false | 'avatar' | 'data';

// profile appendix
export type TUserAppendix =
  | null
  | 'checked'
  | 'invites'
  | 'requests'
  | 'quizzez';

export type TCompanyAppendix = TUserAppendix | 'members';

// actions
export type TAction = {
  action_id: number;
  action: 'owner' | 'member' | 'admin';
};

export type TActionParams = { user_id: number; company_id: number };

// user data
export type TQuizUserParams = { user_id: number; quiz_id: number };

export type TNotificationParams = { user_id: number; notification_id: number };

export type TRating = { user_id: number; rating: number };

export type TRatingAnalytic = {
  current_rating: number;
  average_rating: number;
  pass_at: Date;
};

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
export type TQuizCompanyParams = { company_id: number; quiz_id: number };

// quiz
export type TQuizCreate = {
  quiz_id: number;
  quiz_name: string;
  quiz_frequency: number;
  company_id: number;
  questions_list: TQuestion[];
};

export type TQuizUpdate = {
  quiz_id: number;
  quiz_name: string;
  quiz_frequency: number;
};

export type TQuestion = {
  question_id: number;
  question_text: string;
  question_answers: string[];
  question_correct_answer: number;
};

export type TQuizOfList = {
  quiz_id: number;
  quiz_name: string;
  quiz_title: string;
  quiz_description: string;
  quiz_frequency?: number;
};

export type TQuiz = TQuizOfList & {
  created_by: TUserOfList;
  questions_list: Array<TQuestion & { question_id: number }>;
};

export type TAnswer = {
  user_id: number;
  company_id: number;
  quiz_id: number;
  question_id: number;
  question: string;
  answer: string;
  is_correct: boolean;
  created_at: Date;
};

export type TQuizPass = {
  user_id: number;
  quizzes: Array<{ quiz_id: number; last_quiz_pass_at: Date }>;
};

export type TUsersWithQuizzesPassed = {
  user_id: number;
  quiz_id: number;
  last_quiz_pass_at: Date;
};

// common result
export type TCommonResult = { [key: string]: number } | string | null;
