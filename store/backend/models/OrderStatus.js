const bookshelf = require('../bookshelf');

const OrderStatus = bookshelf.model('OrderStatus', {
  tableName: 'OrderStatus',
});

module.exports = OrderStatus;
