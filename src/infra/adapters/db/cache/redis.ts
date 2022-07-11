import Redis from 'ioredis';
import { RedisConfig } from '..';

export class Cache {
  getConnection(config: RedisConfig): Redis {
    return new Redis({
      port: config.port,
      host: config.host,
    });
  }
}
