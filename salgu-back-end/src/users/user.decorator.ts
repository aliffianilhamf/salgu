import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserFromPayload } from 'src/auth/types';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): UserFromPayload | undefined => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
