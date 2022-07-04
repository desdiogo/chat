export interface Signin {
  email: string;
  password: string;
}

export interface SigninResponseSuccess {
  accessToken: string;
  refreshToken: string;
}

export interface SigninResponseError {
  statusCode: number;
  message: string | string[];
  error: string;
}
