import { MongooseAdapter } from '../../../infra/adapters';
import { Module } from '..';

export class MongodbModule extends MongooseAdapter implements Module {
  async start(): Promise<void> {
    await this.startConnection();
    console.info('Mongodb: connection established');
  }

  async close(): Promise<void> {
    await this.connection.disconnect();
    console.info('Mongodb: disconnecting');
  }
}
