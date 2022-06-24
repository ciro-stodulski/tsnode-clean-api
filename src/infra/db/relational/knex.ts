import knex from 'knex';
import { DBConnection } from '..';

const knexconfig = require('../../../../knexfile.js');

export class Knex implements DBConnection {
  getConnection(): knex {
    return knex(knexconfig);
  }

  isConnection(): void {
    knex(knexconfig)
      .raw('select 1+1 as result')
      .then(() => {
        console.info('Database connection established');
      })
      .catch((error: any) => {
        console.error(error);
      });
  }
}
