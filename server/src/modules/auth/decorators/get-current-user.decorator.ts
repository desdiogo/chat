import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserFromRtJwt } from '../models/user-from-rt-jwt';

export const GetCurrentUser = createParamDecorator(
  (data: keyof UserFromRtJwt | undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    if (!data) return request.user;
    return request.user[data];
  },
);
