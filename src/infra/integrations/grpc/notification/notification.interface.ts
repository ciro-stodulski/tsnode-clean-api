export interface INotificationProto {
  verify(msg: string): Promise<void>;
}
