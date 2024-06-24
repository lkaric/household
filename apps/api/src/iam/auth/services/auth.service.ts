import { randomUUID } from 'crypto';
import {
  Inject,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { PrismaService } from '../../../prisma';
import { jwtConfig } from '../../../config';
import { RedisService } from '../../../redis';

import { HashingService } from '../../services';

import type { User } from '@prisma/client';
import type { LoginRequest, RefreshRequest, RegisterRequest } from '../dto';
import type {
  AccessTokenPayload,
  RefreshToken,
  RefreshTokenPayload,
  TokenPair,
} from '../interfaces';
import { HouseholdService } from '../../../household/household.service';

@Injectable()
class AuthService {
  private static REFRESH_TOKEN_PREFIX = 'rt';

  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly prismaService: PrismaService,
    private readonly hashingService: HashingService,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    private readonly redisService: RedisService,
    private readonly householdService: HouseholdService
  ) {}

  async register(payload: RegisterRequest, token?: string) {
    try {
      const data: RegisterRequest = {
        ...payload,
        password: await this.hashingService.hash(payload.password),
      };

      const user = await this.prismaService.user.create({ data });
      console.log('token' + token);
      if (token !== undefined && token !== '' && token !== ',') {
        //add add user to household
        this.householdService.addUserFromToken(token, user.email);
      }

      const tokens = await this.generateTokenPair(user);

      return tokens;
    } catch (err) {
      this.logger.error(err);

      throw err;
    }
  }

  async login(payload: LoginRequest) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { email: payload.email },
      });

      if (!user) {
        throw new NotFoundException();
      }

      const valid = await this.hashingService.verify(
        payload.password,
        user.password
      );

      if (valid) {
        const tokens = await this.generateTokenPair(user);

        return tokens;
      }

      throw new UnauthorizedException();
    } catch (err) {
      this.logger.error(err);

      throw err;
    }
  }

  async refresh(payload: RefreshRequest): Promise<TokenPair> {
    try {
      const { sub, id } = await this.jwtService.verifyAsync<RefreshToken>(
        payload.refreshToken,
        {
          audience: this.jwtConfiguration.audience,
          issuer: this.jwtConfiguration.issuer,
          secret: this.jwtConfiguration.secret,
        }
      );

      const user = await this.prismaService.user.findUniqueOrThrow({
        where: { id: sub },
      });

      const refreshTokenKey = this.redisService.key(
        sub,
        AuthService.REFRESH_TOKEN_PREFIX
      );

      const persistedRefreshTokenId = await this.redisService.get(
        refreshTokenKey
      );

      if (persistedRefreshTokenId === id) {
        await this.redisService.delete(refreshTokenKey);
      } else {
        throw new UnauthorizedException();
      }

      const tokens = await this.generateTokenPair(user);

      return tokens;
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }

  async generateToken<T>(
    user: User,
    expiresIn: number,
    payload: T
  ): Promise<string> {
    return this.jwtService.signAsync(
      { sub: user.id, ...payload },
      {
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        secret: this.jwtConfiguration.secret,
        expiresIn,
      }
    );
  }

  async generateTokenPair(user: User): Promise<TokenPair> {
    try {
      const accessTokenPromise = this.generateToken<AccessTokenPayload>(
        user,
        this.jwtConfiguration.accessTokenTtl,
        { email: user.email }
      );

      const refreshTokenId = randomUUID();

      const refreshTokenPromise = this.generateToken<RefreshTokenPayload>(
        user,
        this.jwtConfiguration.refreshTokenTtl,
        { id: refreshTokenId }
      );

      const [accessToken, refreshToken] = await Promise.all([
        accessTokenPromise,
        refreshTokenPromise,
      ]);

      const refreshTokenKey = this.redisService.key(
        user.id,
        AuthService.REFRESH_TOKEN_PREFIX
      );

      await this.redisService.insert(refreshTokenKey, refreshTokenId);

      return {
        accessToken,
        refreshToken,
      };
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }
}

export { AuthService };
