import * as dotenv from 'dotenv';
import { EnvValidator } from './validator';

dotenv.config();

const props = {
  graphql_port: parseInt(process.env.GRAPHQL_PORT || '', 10),
  http_port: parseInt(process.env.HTTP_PORT || '', 10),
  db_host: process.env.DB_HOST || '',
  db_user: process.env.DB_USERNAME || '',
  db_password: process.env.DB_PASSWORD || '',
  db_database: process.env.DB_DATABASE || '',
  db_not_sql_database: process.env.DB_NOT_SQL_DATABASE || '',
  db_not_sql_host: process.env.DB_NOT_SQL_HOST || '',
  db_not_sql_user: process.env.DB_NOT_SQL_USER || '',
  db_not_sql_password: process.env.DB_NOT_SQL_PASSWORD || '',
  db_not_sql_auth_source: process.env.DB_NOT_SQL_AUTH_SOURCE || '',
  db_port: process.env.DB_PORT || 3365,
  rabbit_mq_enabled: process.env.RABBITMQ_ENABLED === 'true',
  rabbit_mq_protocol: process.env.RABBITMQ_PROTOCOL || '',
  logger_beautify: process.env.LOGGER_BEAUTIFY === 'true',
  logger_level: process.env.LOGGER_LEVEL || '',
  rabbit_mq_host: process.env.RABBITMQ_HOST || '',
  rabbit_mq_port: parseInt(process.env.RABBITMQ_PORT || '5672', 10),
  rabbit_mq_username: process.env.RABBITMQ_USERNAME || '',
  rabbit_mq_password: process.env.RABBITMQ_PASSWORD || '',
  rabbit_mq_vhost: process.env.RABBITMQ_VHOST || '/',
  redis_port: parseInt(process.env.REDIS_PORT || '', 10),
  redis_host: process.env.REDIS_HOST || '',
  json_place_holder_url: process.env.JSON_PLACE_HOLDER_URL || '',
};

export const env = new EnvValidator(props);
