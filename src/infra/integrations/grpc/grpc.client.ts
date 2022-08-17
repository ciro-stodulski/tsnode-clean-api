import { loadPackageDefinition, credentials } from '@grpc/grpc-js';
import { loadSync } from '@grpc/proto-loader';
import {
  ServiceClientConstructor,
  ServiceClient,
} from '@grpc/grpc-js/build/src/make-client';
import { IGRPCClient, GRPCClientOptions } from '..';

export class GRPCClient implements IGRPCClient {
  createInstance<T>(options: GRPCClientOptions): T {
    const { host, path, service, grpc_package } = options;
    const proto_object = loadSync(path, {
      keepCase: true,
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true,
    });
    const package_definition = loadPackageDefinition(proto_object) as any;

    // eslint-disable-next-line @typescript-eslint/naming-convention
    const Service = package_definition[grpc_package][
      service
    ] as ServiceClientConstructor;

    const instance = new Service(host, credentials.createInsecure()) as Record<
      string,
      any
    >;

    return this.buildServerClientProxy<T>(instance);
  }

  private buildServerClientProxy<T>(target_param: Record<string, any>): T {
    return new Proxy(target_param, {
      get(target: ServiceClient, key: string) {
        return function (...args: any[]) {
          const [arg] = args;

          return new Promise((resolve, reject) => {
            target[key](arg, (err: Error, response: object) => {
              err ? reject(err) : resolve(response);
            });
          });
        };
      },
    }) as T;
  }
}
