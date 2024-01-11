const bookshelf = require('../bookshelf');
const Category = require('./Category');

const Product = bookshelf.model('Product', {
  tableName: 'Product',
  idAttribute: 'ProductId',
  category: function () {
    return this.belongsTo(Category, 'CategoryId');
  },
});

module.exports = Product;
