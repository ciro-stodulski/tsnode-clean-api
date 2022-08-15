import Joi from 'joi';
import fs from 'fs';
import path from 'path';
import * as protoLoader from '@grpc/proto-loader';
import { PackageDefinition } from '@grpc/grpc-js/build/src/make-client';
import * as grpc from '@grpc/grpc-js';

import { GrpcBase, GRPCConfig, GRPCError } from '../../../interface/grpc';
import { ValidationError } from '../../../shared';

export type LoadedRPC = {
  proto: string;
  package_definition: PackageDefinition;
  methods: any;
  service: string;
  grpc_package: string;
};

export class GrpcConfigModule {
  protected server: grpc.Server;

  private proto_dir = '../../../interface/grpc/services';

  protected services: GrpcBase[];

  registerServices(loaded_protos: LoadedRPC[]): void {
    loaded_protos.forEach(
      ({ package_definition, service, methods, grpc_package }) => {
        const proto = grpc.loadPackageDefinition(package_definition) as any;

        this.server.addService(proto[grpc_package][service].service, methods);
      }
    );
  }

  registerLoadedProtos(): LoadedRPC[] {
    const protos_paths = this.loadProtosPath();
    const loaded_protos: LoadedRPC[] = [];

    this.services.forEach((service: GrpcBase) => {
      const { schema, implementation, proto_param } = service.service_configs;

      const service_config = service.service_configs || [];

      const config = { ...service_config, schema, implementation };

      const proto_path = protos_paths.find(protos_path => {
        return protos_path.includes(proto_param);
      })!;

      const founded_protos = this.findProto(proto_param, loaded_protos);

      if (founded_protos) {
        founded_protos.methods[implementation] = this.buildHandle(service);
      }

      if (!loaded_protos.length || !founded_protos) {
        const module: LoadedRPC = this.buildProto(config, service, proto_path);
        loaded_protos.push(module);
      }
    });

    return loaded_protos;
  }

  private loadProtosPath(): string[] {
    const current_url = path.join(__dirname, this.proto_dir);

    const root_folders = fs
      .readdirSync(current_url)
      .filter(folder => folder !== 'index.ts')
      .filter(folder => folder !== 'index.js');

    return root_folders.flatMap(folder => {
      const folder_path = path.join(current_url, folder);
      const file_path = fs
        .readdirSync(folder_path)
        .find(file => file.includes('.proto'));

      return path.join(folder_path, file_path || '/');
    });
  }

  private buildProto(
    config: GRPCConfig,
    instance: GrpcBase,
    proto_path: string
  ): LoadedRPC {
    const { proto_param, service, implementation } = config;

    return {
      service,
      proto: proto_param,
      methods: {
        [implementation]: this.buildHandle(instance),
      },
      package_definition: protoLoader.loadSync(proto_path!, {
        keepCase: true,
      }),
      grpc_package: config.grpc_package,
    };
  }

  private buildHandle(instance: GrpcBase): Function {
    return async (call: any, callback: Function) => {
      try {
        const validated_data = instance.service_configs.schema
          ? this.requestValidator(call.request, instance.service_configs.schema)
          : call.request;

        const result = await instance.handle({ request: validated_data });

        return callback(null, result.data);
      } catch (err) {
        const error = instance.exception(err);
        if (error instanceof GRPCError) {
          const { status_code, code, message } = error;
          return callback(
            {
              code: status_code,
              message: JSON.stringify({
                code,
                message,
              }),
            },
            null
          );
        }

        return callback(error);
      }
    };
  }

  private requestValidator(data?: any, schema?: Joi.Schema): any {
    if (!schema) return undefined;
    const validation = schema.validate(data, {
      abortEarly: false,
      stripUnknown: true,
      allowUnknown: true,
    });

    if (validation.error) {
      throw new ValidationError(validation.error.details);
    }

    return validation.value;
  }

  private findProto(
    proto: string,
    loaded_protos: LoadedRPC[]
  ): LoadedRPC | undefined {
    const loaded_proto_index = loaded_protos.findIndex(
      loaded_proto => loaded_proto.proto === proto
    );

    if (loaded_proto_index !== -1) {
      return loaded_protos[loaded_proto_index];
    }

    return undefined;
  }
}
