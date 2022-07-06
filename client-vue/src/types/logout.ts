export interface LogoutResponseSuccess {
  message: string;
}

export interface LogoutResponseError {
  statusCode: number;
  message: string | string[];
  error: string;
}
