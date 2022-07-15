import knex from 'knex';
import { DBConnection } from '..';

const knexconfig = require('../../../../knexfile.js');

export class Knex implements DBConnection {
  getConnection(): knex {
    return knex(knexconfig);
  }

  async isConnection(): Promise<void> {
    try {
      await knex(knexconfig).raw('select 1+1 as result');
      console.info('Mysql: connection established');
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
