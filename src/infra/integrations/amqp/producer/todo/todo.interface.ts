export interface ITodoProducer {
  notification(name: string): Promise<void>;
}
