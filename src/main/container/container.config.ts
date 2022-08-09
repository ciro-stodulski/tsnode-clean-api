import { CacheClient } from '../../infra/repositories';
import { AmqpClient } from '../../infra/integrations';
import { KnexAdapter } from '../../infra/adapters';
import { env, logger } from '../../shared';

export class ContainerConfig {
  readonly db: KnexAdapter;

  readonly client_cache: CacheClient;

  readonly amqp_client: AmqpClient;

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

    logger.info('Container: load config with succeffully');
  }
}
