import Joi from 'joi';

export type GRPCConfig = {
  proto_param: string;
  implementation: string;
  grpc_package: string,
  schema?: Joi.Schema;
  service: string;
};

export type GRPCResponse<T = any> = {
  data?: T;
};

export type GRPCRequest<T = any> = {
  request: T;
};
