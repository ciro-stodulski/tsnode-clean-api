import * as grpc from '@grpc/grpc-js';
import wrapServerWithRefelection from 'grpc-node-server-reflection';

import { Module, GrpcConfigModule } from 'src/main/modules';
import { VerifyGrpc } from 'src/presentation/grpc';
import { env, logger } from 'src/shared';
import { Container } from 'src/main/container';

export class GrpcModule extends GrpcConfigModule implements Module {
  constructor(container: Container) {
    super();
    this.services = [new VerifyGrpc(container.list_todo_use_case)];
  }

  start(): void {
    try {
      const loaded_protos = this.registerLoadedProtos();

      this.server = wrapServerWithRefelection(new grpc.Server({}));

      this.registerServices(loaded_protos);

      this.server.bindAsync(
        env.grpc_host,
        grpc.ServerCredentials.createInsecure(),
        () => {
          logger.info(`Grpc: server is running on ${env.grpc_host}`);
          this.server.start();
        }
      );
    } catch (error) {
      logger.error(`GRPC: error in starting server ${error}`);

      throw error;
    }
  }

  close(): void {
    this.server.forceShutdown();
  }
}
