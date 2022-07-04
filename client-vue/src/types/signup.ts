export interface Signup {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export interface SignupResponseSuccess {
  message: string;
}

export interface SignupResponseError {
  statusCode: number;
  message: string | string[];
  error: string;
}
