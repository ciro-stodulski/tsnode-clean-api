import knex from 'knex';
import { DBConnection } from '..';
import { logger } from '../../../main/logger';

const knexconfig = require('../../../../knexfile.js');

export class KnexAdapter implements DBConnection {
  getConnection(): knex {
    return knex(knexconfig);
  }

  async isConnection(): Promise<void> {
    try {
      await knex(knexconfig).raw('select 1+1 as result');
      logger.info('Mysql: connection established');
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }
}
