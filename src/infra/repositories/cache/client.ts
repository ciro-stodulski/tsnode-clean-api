import { Redis } from 'ioredis';
import { Cache } from '..';

export class CacheClient implements Cache {
  constructor(private cache: Redis) {}

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
