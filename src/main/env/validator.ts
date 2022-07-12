import { IsEnum, IsInt, IsNotEmpty } from 'class-validator';

export class EnvValidator {
  @IsInt()
  @IsNotEmpty()
  http_port: number;

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

  constructor(props: any) {
    Object.assign(this, props);
  }
}
