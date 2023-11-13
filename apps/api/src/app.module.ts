import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from './prisma';
import { IamModule } from './iam';
import { HouseholdModule } from './household';

@Module({
  imports: [ConfigModule.forRoot(), PrismaModule, IamModule, HouseholdModule],
})
export class AppModule {}
