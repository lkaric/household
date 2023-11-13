import { Injectable, OnModuleInit } from '@nestjs/common';

import { PrismaClient } from '@prisma/client';

@Injectable()
class PrismaService extends PrismaClient implements OnModuleInit {
  onModuleInit() {
    this.$connect();
  }
}

export { PrismaService };
