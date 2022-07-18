import { connect, Mongoose } from 'mongoose';
import { env } from '../../../shared/env';

export class MongooseAdapter {
  connection: Mongoose;

  async startConnection(): Promise<void> {
    this.connection = await connect(env.db_not_sql_host, {
      dbName: env.db_not_sql_database,
      authSource: env.db_not_sql_auth_source,
      pass: env.db_not_sql_password,
      user: env.db_not_sql_user,
    });
  }
}
