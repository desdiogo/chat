export interface UserPayload {
  sub: string;
  email: string;
  name: string;
  emailVerifiedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  iat?: number;
  exp?: number;
}
