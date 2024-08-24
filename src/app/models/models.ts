export interface User {
  name: string;
  email: string;
  role: 'manager' | 'user';
}

export interface SignupData {
  email: string;
  password: string;
  password_confirmation: string;
}

export interface SigninData {
  email: string;
  password: string;
}
