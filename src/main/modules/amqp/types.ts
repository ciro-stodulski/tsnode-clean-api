export type RabbitMQConfig = {
  protocol: string;
  host: string;
  port: number;
  username: string;
  password: string;
  vhost: string;
};

export type ConsumerErrorOptions = {
  should_ack?: boolean;
  should_requeue?: boolean;
};
