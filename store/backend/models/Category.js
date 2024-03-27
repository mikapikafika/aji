const bookshelf = require('../bookshelf');

const Category = bookshelf.model('Category', {
  tableName: 'Category',
});

module.exports = Category;
