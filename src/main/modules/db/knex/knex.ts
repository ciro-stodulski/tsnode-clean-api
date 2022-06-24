import knex from 'knex';
import { DBConnection } from '..';

const knexconfig = require('../../../../../knexfile.js');

export class Knex implements DBConnection {
  getConnection(): knex {
    return knex(knexconfig);
  }
}
