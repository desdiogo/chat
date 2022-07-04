export interface MeResponseSuccess {
  id: string;
  email: string;
  name: string;
  emailVerifiedAt: Date | null;
}

export interface MeResponseError {
  statusCode: number;
  message: string | string[];
  error: string;
}
