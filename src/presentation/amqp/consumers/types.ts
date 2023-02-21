export type ConsumerErrorOptions = {
  should_ack?: boolean;
  should_requeue?: boolean;
};

export type ConsumerConfig = {
  queue: string;
  schema: any;
};
