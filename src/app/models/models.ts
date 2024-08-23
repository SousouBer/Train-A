export default interface SignupData {
  email: string;
  password: string;
  password_confirmation: string;
}

export default interface SigninData {
  email: string;
  password: string;
}

export default interface User {
  name: string;
  email: string;
  role: 'manager' | 'user';
}
