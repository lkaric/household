import {
  ExecutionContext,
  Injectable,
  UseGuards,
  applyDecorators,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

import { IS_PUBLIC_KEY } from '../decorators';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const isPublic =
      this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
        ctx.getHandler(),
        ctx.getClass(),
      ]) ?? false;

    if (isPublic) {
      return true;
    }

    const canActivate = (await super.canActivate(ctx)) as boolean;

    return canActivate;
  }
}

export const UseJwtGuard = () => applyDecorators(UseGuards(JwtGuard));
