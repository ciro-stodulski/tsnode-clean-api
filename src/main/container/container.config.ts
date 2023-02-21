import { CacheClient } from 'src/infra/repositories';
import { AmqpClient, GRPCClient, IGRPCClient } from 'src/infra/integrations';
import { KnexAdapter } from 'src/infra/adapters';
import { env, logger } from 'src/shared';

export class ContainerConfig {
  readonly db: KnexAdapter;

  readonly client_cache: CacheClient;

  readonly amqp_client: AmqpClient;

  readonly grpc_client: IGRPCClient;

  constructor() {
    this.db = new KnexAdapter();
    this.client_cache = new CacheClient();
    this.amqp_client = new AmqpClient({
      host: env.rabbit_mq_host,
      password: env.rabbit_mq_password,
      port: env.rabbit_mq_port,
      protocol: env.rabbit_mq_protocol,
      username: env.rabbit_mq_username,
      vhost: env.rabbit_mq_vhost,
    });
    this.grpc_client = new GRPCClient();

    logger.info('Container: load config with succeffully');
  }
}
