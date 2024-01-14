exports.up = function (knex) {
    return knex.schema.createTable('Category', function (table) {
      table.increments('CategoryId').primary();
      table.string('Name').notNullable();
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable('Category');
  };