import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import { PrismaService } from '../../../prisma';

import { jwtConfig } from '../../../config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    private readonly prismaService: PrismaService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConfiguration.secret,
      issuer: jwtConfiguration.issuer,
      audience: jwtConfiguration.audience,
    });
  }

  // TODO: Fix this
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async validate(payload: any) {
    const user = await this.prismaService.user.findUnique({
      where: { id: payload.sub },
    });

    return { sub: user.id, email: user.email };
  }
}
