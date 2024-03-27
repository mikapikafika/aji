exports.up = function (knex) {
  return knex.schema.createTable('Orders', function (table) {
    table.increments('OrderId').primary();
    table.dateTime('ApprovalDate');
    table.integer('OrderStatusId').references('OrderStatusId').inTable('OrderStatus').notNullable();
    table.string('UserName').notNullable();
    table.string('Email').notNullable();
    table.string('PhoneNumber', 20).notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('Orders');
};
