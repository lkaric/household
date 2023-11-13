import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from '../prisma';
import { IamModule } from '../iam';

@Module({
  imports: [ConfigModule.forRoot(), PrismaModule, IamModule],
})
export class AppModule {}
