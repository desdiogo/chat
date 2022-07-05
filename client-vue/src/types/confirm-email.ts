export interface ConfirmEmailResponseSuccess {
  message: string;
}

export interface ConfirmEmailResponseError {
  statusCode: number;
  message: string | string[];
  error: string;
}
