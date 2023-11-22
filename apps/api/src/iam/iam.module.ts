import { APP_GUARD } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { jwtConfig } from '../config';

import { RedisModule } from '../redis';

import { ArgonService, HashingService } from './services';
import { AuthController } from './auth';
import { AuthService } from './auth/services';
import { JwtStrategy } from './auth/strategies';
import { JwtGuard } from './auth/guards';
import { HouseholdService } from '../household/household.service';

@Module({
  imports: [
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    RedisModule,
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: HashingService,
      useClass: ArgonService,
    },
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
    AuthService,
    HouseholdService,
    JwtStrategy,
  ],
})
export class IamModule {}
