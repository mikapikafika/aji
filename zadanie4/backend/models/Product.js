const bookshelf = require('../bookshelf');
const Category = require('./Category');

const Product = bookshelf.model('Product', {
  tableName: 'Product',
  category: function () {
    return this.belongsTo(Category, 'CategoryId');
  },
});

module.exports = Product;
