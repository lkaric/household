import { ExecutionContext, createParamDecorator } from '@nestjs/common';

import { CurrentUserData } from '../interfaces';

export const CurrentUser = createParamDecorator(
  (field: keyof CurrentUserData | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    const user: CurrentUserData | undefined = request.user;

    return field ? user?.[field] : user;
  }
);
