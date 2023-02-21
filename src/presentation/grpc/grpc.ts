import { GRPCResponse, GRPCRequest, GRPCConfig } from 'src/presentation/grpc';

export interface GrpcBase {
  service_configs: GRPCConfig;

  handle(request: GRPCRequest): Promise<GRPCResponse>;

  exception(error: Error): Error;
}
