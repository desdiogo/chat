import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserFromJwt } from '../models/user-from-jwt';
import { AuthRequest } from '../models/auth-request';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): UserFromJwt => {
    const request = context.switchToHttp().getRequest<AuthRequest>();

    return request.user;
  },
);
