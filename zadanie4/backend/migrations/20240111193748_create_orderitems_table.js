exports.up = function (knex) {
    return knex.schema.createTable('OrderItems', function (table) {
      table.increments('OrderItemId').primary();
      table.integer('OrderId').references('OrderId').inTable('Orders').notNullable();
      table.integer('ProductId').references('ProductId').inTable('Product').notNullable();
      table.integer('Quantity').notNullable();
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable('OrderItems');
  };
  