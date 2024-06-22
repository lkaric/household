import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from './prisma';
import { IamModule } from './iam';
import { HouseholdModule } from './household';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule,
    IamModule,
    HouseholdModule,
    UserModule,
  ],
})
export class AppModule {}
