/**
 * @param {import('knex')} knex
 */
exports.up = knex =>
  knex.schema.createTable('todos', table => {
    table.bigIncrements('id').unsigned();
    table.string('name').notNullable();
    table.string('user').notNullable().unique();
    table
      .enum('status', [
        'ACTIVE',
        'IN_PROGRESS',
        'DONE',
      ])
      .notNullable();
    table
      .dateTime('created_at')
      .notNullable()
      .defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    table
      .dateTime('updated_at')
      .notNullable()
      .defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
  });
/**
 * @param {import('knex')} knex
 */
exports.down = knex => knex.schema.dropTable('todo');
