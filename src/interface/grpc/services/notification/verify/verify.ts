import { GrpcBase, GRPCResponse, GRPCConfig } from '../../..';
import { IListTodoUseCase } from '../../../../../core/use-cases';

export class VerifyGrpc implements GrpcBase {
  service_configs: GRPCConfig = {
    implementation: 'Verify',
    proto_param: 'notification.proto',
    grpc_package: 'proto_notification',
    service: 'NotificationService',
  };

  constructor(private list_todo_use_case: IListTodoUseCase) {}

  async handle(): Promise<GRPCResponse<any>> {
    const todos = await this.list_todo_use_case.list();

    return {
      data: {
        event: {
          name: 'Grpc integration with succeffully',
          describe: JSON.stringify(todos),
        },
      },
    };
  }

  exception(error: Error): Error {
    return error;
  }
}
