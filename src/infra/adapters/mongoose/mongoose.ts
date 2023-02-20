import { connect, Mongoose } from 'mongoose';
import { env } from 'src/shared/env';

export class MongooseAdapter {
  connection: Mongoose;

  async startConnection(): Promise<void> {
    this.connection = await connect(env.mongo_host, {
      dbName: env.mongo_database,
      authSource: env.mongo_auth_source,
      pass: env.mongo_password,
      user: env.mongo_user,
    });
  }
}
