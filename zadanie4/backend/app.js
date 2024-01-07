const express = require('express');
const bodyParser = require('body-parser');
const knex = require('knex')({
  client: 'mysql',
  connection: {
    host: 'localhost',
    user: 'root', // Zmień na swojego użytkownika MySQL
    password: 'password', // Zmień na swoje hasło MySQL
    database: 'zadanie4', // Zmień na nazwę swojej bazy danych
  },
});
const bookshelf = require('bookshelf')(knex);

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Definiowanie modelu i trasy
const Item = bookshelf.model('Item', {
  tableName: 'items',
});

app.get('/api/items', async (req, res) => {
  try {
    const items = await Item.fetchAll();
    res.json(items.toJSON());
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
