const bookshelf = require('../bookshelf');
const OrderStatus = require('./OrderStatus');

const Orders = bookshelf.model('Orders', {
  tableName: 'Orders',
  idAttribute: 'OrderId',
  orderStatus: function () {
    return this.belongsTo(OrderStatus, 'OrderStatusId');
  },
});

module.exports = Orders;
