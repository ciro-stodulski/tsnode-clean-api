import * as dotenv from 'dotenv';
import { EnvValidator } from './validator';

dotenv.config();

const props = {
  http_port: parseInt(process.env.HTTP_PORT || ''),
  db_host: process.env.DB_HOST || '',
  db_user: process.env.DB_USERNAME || '', 
  db_password: process.env.DB_PASSWORD || '',
  db_database: process.env.DB_DATABASE || '',
  db_port: process.env.DB_PORT || 3365,
  rabbit_mq_enabled: process.env.RABBITMQ_ENABLED === 'true',
  rabbit_mq_protocol: process.env.RABBITMQ_PROTOCOL || '',
  rabbit_mq_host: process.env.RABBITMQ_HOST || '',
  rabbit_mq_port: parseInt(process.env.RABBITMQ_PORT || '5672', 10),
  rabbit_mq_username: process.env.RABBITMQ_USERNAME || '',
  rabbit_mq_password: process.env.RABBITMQ_PASSWORD || '',
  rabbit_mq_vhost: process.env.RABBITMQ_VHOST || '/',
  redis_port: parseInt(process.env.REDIS_PORT || '', 10),
  redis_host: process.env.REDIS_HOST || '',
};

export const env = new EnvValidator(props);