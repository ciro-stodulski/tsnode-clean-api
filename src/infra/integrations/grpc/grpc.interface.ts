import { GRPCClientOptions } from 'src/infra/integrations';

export interface IGRPCClient {
  createInstance<T>(options: GRPCClientOptions): T;
}
