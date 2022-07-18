import Redis from 'ioredis';
import { RedisAdapter } from '../../adapters';
import { Cache } from '..';
import { logger } from '../../../main/logger';

export class CacheClient extends RedisAdapter implements Cache {
  constructor(cache?: Redis) {
    super(cache);
    cache && logger.info('Redis: Testing client');
  }

  get(key: string): Promise<string | null> {
    return this.cache.get(key);
  }

  async set(key: string, value: any): Promise<void> {
    await this.cache.set(key, value);
  }

  async setWithExpirationTime(
    key: string,
    value: any,
    expiration_time: number
  ): Promise<void> {
    await this.cache.set(key, value, 'EX', expiration_time);
  }
}
