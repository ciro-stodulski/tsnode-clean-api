import { MongooseAdapter } from 'src/infra/adapters';
import { Module } from 'src/main/modules';
import { logger } from 'src/shared/logger';

export class MongodbModule extends MongooseAdapter implements Module {
  async start(): Promise<void> {
    await this.startConnection();
    logger.info('Mongodb: connection established');
  }

  async close(): Promise<void> {
    await this.connection.disconnect();
    logger.warn('Mongodb: disconnecting');
  }
}
