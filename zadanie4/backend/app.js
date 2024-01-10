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


const HttpStatus = require('http-status-codes');
const bodyParser = require('body-parser');
app.use(bodyParser.json());



// PATHS

// PRODUCT
// Fetch all products
app.get('/products', async (req, res) => {
  try {
    const products = await knexInstance('Product').select('*');
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).send('Internal Server Error');
  }
});

// Fetch a specific product by ID
app.get('/products/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const product = await knexInstance('Product').where({ ProductId: id }).first();
    if (product) {
      res.json(product);
    } else {
      res.status(HttpStatus.StatusCodes.NOT_FOUND).send('Product Not Found');
    }
  } catch (error) {
    console.error(error);
    res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).send('Internal Server Error');
  }
});

// Add a new product - not tested yet
app.post('/products', async (req, res) => {
  const { Name, Description, UnitPrice, Weight, CategoryId } = req.body;
  try {
    const [ProductId] = await knexInstance('Product').insert({
      Name,
      Description,
      UnitPrice,
      Weight,
      CategoryId,
    });
    res.status(HttpStatus.StatusCodes.CREATED).json({ ProductId });
  } catch (error) {
    console.error(error);
    res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).send('Internal Server Error');
  }
});

// Update a product - not tested yet
app.put('/products/:id', async (req, res) => {
  const { id } = req.params;
  const { Name, Description, UnitPrice, Weight, CategoryId } = req.body;
  try {
    const count = await knexInstance('Product').where({ ProductId: id }).update({
      Name,
      Description,
      UnitPrice,
      Weight,
      CategoryId,
    });
    // counting to see if it's updated - idk if this is necessary
    if (count > 0) {
      res.status(HttpStatus.StatusCodes.OK).send('Product updated');
    } else {
      res.status(HttpStatus.StatusCodes.NOT_FOUND).send('Product Not Found');
    }
  }catch (error) {
      console.error(error);
      res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).send('Internal Server Error');
    }
});


// CATEGORY
// Fetch all categories
app.get('/categories', async (req, res) => {
  try {
    const categories = await knexInstance('Category').select('*');
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).send('Internal Server Error');
  }
});


// ORDERS
// Fetch all orders
app.get('/orders', async (req, res) => {
  try {
    const orders = await knexInstance('Orders').select('*');
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).send('Internal Server Error');
  }
});

// Add a new order - not tested yet
app.post('/orders', async (req, res) => {
  const { ApprovalDate, OrderStatusId, UserName, Email, PhoneNumber } = req.body;
  try {
    const [OrderId] = await knexInstance('Orders').insert({
      ApprovalDate,
      OrderStatusId,
      UserName,
      Email,
      PhoneNumber,
    });
    res.status(HttpStatus.StatusCodes.CREATED).json({ OrderId });
  } catch (error) {
    console.error(error);
    res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).send('Internal Server Error');
  }
});

// Update order status - not tested yet
app.patch('/orders/:id', async (req, res) => {
  const { id } = req.params;
  const { OrderStatusId } = req.body;
  try {
    const count = await knexInstance('Orders').where({ OrderId: id }).update({
      OrderStatusId,
    });
    if (count > 0) {
      res.status(HttpStatus.StatusCodes.OK).send('Order status updated');
    } else {
      res.status(HttpStatus.StatusCodes.NOT_FOUND).send('Order Not Found');
    }
  } catch (error) {
    console.error(error);
    res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).send('Internal Server Error');
  }
});

// Fetch a specific order by status - not tested yet
app.get('/orders/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const orders = await knexInstance('Orders').where({ OrderStatusId: id }).select('*');
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).send('Internal Server Error');
  }
}); 


// ORDER STATUS
// Fetch all order statuses
app.get('/orderstatus', async (req, res) => {
  try {
    const orderstatus = await knexInstance('OrderStatus').select('*');
    res.json(orderstatus);
  } catch (error) {
    console.error(error);
    res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).send('Internal Server Error');
  }
});


    