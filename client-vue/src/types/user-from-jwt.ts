export interface UserFromJwt {
  id: string;
  email: string;
  name: string;
  emailVerifiedAt: Date | null;
  iat: number;
  exp: number;
}
