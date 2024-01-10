const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const knex = require('knex');
const knexConfig = require('./knexfile');
const knexInstance = knex(knexConfig);

// Define the '/hello' route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.get('/test', async (req, res) => {
  try {
    // Fetch data from the OrderStatus table
    const orderStatusList = await knexInstance('OrderStatus').select('*');

    // Render the data on the page
    res.send(`<pre>${JSON.stringify(orderStatusList, null, 2)}</pre>`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});