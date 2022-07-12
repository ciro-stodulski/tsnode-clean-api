export type AMQPPublishOptions = {
  content_type?: string | undefined;
  content_encoding?: string | undefined;
  priority?: number | undefined;
  delivery_mode: any | undefined;
};

export type AMQPPublishData = {
  exchange: string;
  routing_key: string;
  message: Record<string, any>;
  options?: AMQPPublishOptions;
};

export type RabbitMQConfig = {
  protocol: string;
  host: string;
  port: number;
  username: string;
  password: string;
  vhost: string;
};
