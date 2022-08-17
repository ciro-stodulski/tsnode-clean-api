import { GRPCClientOptions } from "..";

export interface IGRPCClient {
  createInstance<T>(options: GRPCClientOptions): T;
}
