const bookshelf = require('../bookshelf');
const OrderStatus = require('./OrderStatus');

const Orders = bookshelf.model('Orders', {
  tableName: 'Orders',
  orderStatus: function () {
    return this.belongsTo(OrderStatus, 'OrderStatusId');
  },
});

module.exports = Orders;
