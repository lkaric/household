import {
  Inject,
  Injectable,
  OnApplicationBootstrap,
  OnApplicationShutdown,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Redis } from 'ioredis';

import { redisConfig } from '../config';

@Injectable()
export class RedisService
  implements OnApplicationBootstrap, OnApplicationShutdown
{
  private redisClient: Redis;

  constructor(
    @Inject(redisConfig.KEY)
    private readonly redisConfiguration: ConfigType<typeof redisConfig>
  ) {}

  onApplicationBootstrap() {
    this.redisClient = new Redis({
      host: this.redisConfiguration.host,
      port: this.redisConfiguration.port,
    });
  }

  onApplicationShutdown() {
    this.redisClient.quit();
  }

  public async insert(key: string, value: string): Promise<void> {
    await this.redisClient.set(key, value);
  }
  public async insertExpire(key: string, value: string,expire: number): Promise<void> {
    await this.redisClient.set(key, value,"EX",expire);
  }

  public async get(key: string): Promise<string> {
    const data = this.redisClient.get(key);

    return data;
  }

  public async delete(key: string): Promise<void> {
    await this.redisClient.del(key);
  }

  public async areStringsEqual(key: string, comparison: string) {
    const persisted = await this.get(key);

    return persisted === comparison;
  }

  public key(value: string, prefix?: string, suffix?: string) {
    if (prefix && !suffix) {
      return `${prefix}-${value}`;
    }

    if (suffix && !prefix) {
      return `${value}-${suffix}`;
    }

    if (suffix && prefix) {
      return `${prefix}-${value}-${suffix}`;
    }

    return value;
  }
}
