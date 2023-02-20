import knex, { QueryBuilder, Transaction } from 'knex';
import { TableConfig } from 'src/infra/repositories';

export abstract class Repository<T> {
  protected abstract properties: string[];

  protected abstract database: knex;

  abstract config_table: TableConfig;

  protected transactionable(trx?: Transaction): QueryBuilder {
    if (trx) {
      return this.table.transacting(trx);
    }
    return this.table;
  }

  protected get table(): QueryBuilder {
    return this.database(this.config_table.name).columns(this.properties);
  }

  get transaction() {
    return this.database.transaction.bind(this.database);
  }

  async create(data: Record<string, any>, trx?: Transaction): Promise<string> {
    const [created_id] = await this.transactionable(trx).insert(data);
    return created_id.toString();
  }

  async all(trx?: Transaction): Promise<T[]> {
    return this.transactionable(trx);
  }

  async getById(id: string, trx?: Transaction): Promise<T | null> {
    return this.transactionable(trx).where('id', id).first();
  }

  async deleteById(id: string, trx?: Transaction): Promise<boolean> {
    const result = await this.transactionable(trx).where('id', id).delete();
    return result > 0;
  }

  async updateById(
    id: string,
    data: Record<string, any>,
    trx?: Transaction
  ): Promise<boolean> {
    const result = await this.transactionable(trx).where('id', id).update(data);
    return result > 0;
  }
}
