const bookshelf = require('../bookshelf');
const Orders = require('./Orders');
const Product = require('./Product');

const OrderItems = bookshelf.model('OrderItems', {
  tableName: 'OrderItems',
  order: function () {
    return this.belongsTo(Orders, 'OrderId');
  },
  product: function () {
    return this.belongsTo(Product, 'ProductId');
  },
});

module.exports = OrderItems;
