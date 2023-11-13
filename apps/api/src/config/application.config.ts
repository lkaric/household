import { registerAs } from '@nestjs/config';

export const jwtConfig = registerAs('application', () => ({
  secret: process.env.APPLICATION_PORT,
}));
