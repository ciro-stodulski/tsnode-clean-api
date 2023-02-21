import { IsEnum, IsInt, IsNotEmpty } from 'class-validator';

export class EnvValidator {
  @IsInt()
  @IsNotEmpty()
  http_port: number;

  @IsInt()
  @IsNotEmpty()
  graphql_port: number;

  @IsNotEmpty()
  rabbit_mq_enabled: boolean;

  @IsEnum(['amqp'])
  rabbit_mq_protocol: string;

  @IsNotEmpty()
  rabbit_mq_host: string;

  @IsInt()
  rabbit_mq_port: number;

  @IsNotEmpty()
  rabbit_mq_username: string;

  @IsNotEmpty()
  rabbit_mq_password: string;

  @IsNotEmpty()
  rabbit_mq_vhost: string;

  @IsNotEmpty()
  redis_port: number;

  @IsNotEmpty()
  redis_host: string;

  @IsNotEmpty()
  json_place_holder_url: string;

  @IsNotEmpty()
  mongo_database: string;

  @IsNotEmpty()
  mongo_host: string;

  @IsNotEmpty()
  mongo_auth_source: string;

  @IsNotEmpty()
  mongo_user: string;

  @IsNotEmpty()
  mongo_password: string;

  @IsNotEmpty()
  logger_level: string;

  @IsNotEmpty()
  logger_beautify: boolean;

  @IsNotEmpty()
  grpc_host: string;

  @IsNotEmpty()
  client_grpc_host: string;

  constructor(props: any) {
    Object.assign(this, props);
  }
}
