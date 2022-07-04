export interface UserPayload {
  id: string;
  email: string;
  name: string;
  emailVerifiedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  iat?: number;
  exp?: number;
}
