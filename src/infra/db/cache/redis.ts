import Redis from 'ioredis';

export class Cache {
  getConnection(): Redis {
    return new Redis({
      port: 6379,
      host: 'localhost',
    });
  }
}
