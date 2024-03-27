  exports.up = function (knex) {
    return knex.schema.createTable('Product', function (table) {
      table.increments('ProductId').primary();
      table.string('Name').notNullable();
      table.text('Description');
      table.decimal('UnitPrice', 10, 2).notNullable();
      table.decimal('Weight', 10, 2).notNullable();
      table.integer('CategoryId').references('CategoryId').inTable('Category').notNullable();
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable('Product');
  };
  