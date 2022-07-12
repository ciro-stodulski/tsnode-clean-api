import Redis from 'ioredis';
import { env } from '../../../../main/env';

export class RedisAdapter {
  public cache: Redis;

  constructor(redis?: Redis) {
    this.cache =
      redis ||
      new Redis({
        host: env.redis_host,
        port: env.redis_port,
      });
    console.info('Redis: Connection established');
  }
}
