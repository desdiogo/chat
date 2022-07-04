import { UserFromJwt } from './user-from-jwt';

export interface UserFromRtJwt extends UserFromJwt {
  refreshToken: string;
}
