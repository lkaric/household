import { registerAs } from '@nestjs/config';

export const redisConfig = registerAs('redis', () => ({
  port: parseInt(process.env.REDIS_PORT ?? '6379', 10),
  host: process.env.REDIS_HOST,
}));
