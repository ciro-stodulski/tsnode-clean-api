import bformat from 'bunyan-format';
import { init } from '@somosphi/logger';
import { env } from '../env';

const project_pack = require('../../../package');

const format_out = bformat({
  outputMode: env.logger_beautify ? 'short' : 'bunyan',
});

/* eslint-disable */
const { Logger, AxiosLogger } = init({
  PROJECT_NAME: project_pack.name,
  // @ts-ignore
  LOG_LEVEL: env.logger_level || 'info',
  STREAMS: [
    {
      stream: format_out,
    },
  ],
});

export const logger = Logger;
export const axiosLogger = AxiosLogger;
