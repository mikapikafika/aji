exports.up = function (knex) {
    return knex.schema.createTable('OrderStatus', function (table) {
      table.integer('OrderStatusId').primary();
      table.string('Name').notNullable();
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable('OrderStatus');
  };
  