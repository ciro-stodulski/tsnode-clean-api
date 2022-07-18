import Redis from 'ioredis';
import { env } from '../../../main/env';
import { logger } from '../../../shared/logger';

export class RedisAdapter {
  public cache: Redis;

  constructor(redis?: Redis) {
    this.cache =
      redis ||
      new Redis({
        host: env.redis_host,
        port: env.redis_port,
      });
    logger.info('Redis: Connection established');
  }
}
