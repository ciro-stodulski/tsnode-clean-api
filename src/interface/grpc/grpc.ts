import { GRPCResponse, GRPCRequest, GRPCConfig } from '.';

export abstract class GrpcBase {
  abstract service_configs: GRPCConfig;

  abstract handle(request: GRPCRequest): Promise<GRPCResponse>;

  abstract exception(error: Error): Error;
}
