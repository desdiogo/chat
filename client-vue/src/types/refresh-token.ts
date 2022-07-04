export interface RefreshTokenResponseSuccess {
  accessToken: string;
  refreshToken: string;
}

export interface RefreshTokenResponseError {
  statusCode: number;
  message: string | string[];
}
