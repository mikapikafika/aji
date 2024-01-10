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
    res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).send('Internal server error');
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
      res.status(HttpStatus.StatusCodes.NOT_FOUND).send('Product not found');
    }
  } catch (error) {
    console.error(error);
    res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).send('Internal server error');
  }
});

// Add a new product - not tested yet
app.post('/products', async (req, res) => {
  const { Name, Description, UnitPrice, Weight, CategoryId } = req.body;

  // Validate input
  if (!Name || !Description || UnitPrice <= 0 || Weight <= 0) {
    return res.status(HttpStatus.StatusCodes.BAD_REQUEST).json({
      error: "Can't add product. Name and description can't be empty, and unit price and weight must be greater than 0.",
    });
  }

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
    res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).send('Internal server error');
  }
});

// Update a product - not tested yet
app.put('/products/:id', async (req, res) => {
  const { id } = req.params;
  const { Name, Description, UnitPrice, Weight, CategoryId } = req.body;

  // Validate input
  if (!Name || !Description || UnitPrice <= 0 || Weight <= 0) {
    return res.status(HttpStatus.StatusCodes.BAD_REQUEST).json({
      error: "Can't update product. Name and description can't be empty, and unit price and weight must be greater than 0.",
    });
  }

  try {
    // Validate if product exists
    const product = await knexInstance('Product').where({ ProductId: id }).first();
    if (!product) {
      return res.status(HttpStatus.StatusCodes.NOT_FOUND).json({
        error: "Can't update product. Make sure the specified exists.",
      });
    }

    const count = await knexInstance('Product').where({ ProductId: id }).update({
      Name,
      Description,
      UnitPrice,
      Weight,
      CategoryId,
    });
    // counting to see if it's updated - idk if this is necessary, but knex returns 1 if updated and 0 if not
    if (count > 0) {
      res.status(HttpStatus.StatusCodes.OK).json({ message: "Product successfully updated." });
    } else {
      res.status(HttpStatus.StatusCodes.NOT_FOUND).json({ error: "Product not found. Make sure the specified ID is correct." });
    }
  }catch (error) {
      console.error(error);
      res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).send('Internal server error.');
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
    res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).send('Internal server error');
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
    res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).send('Internal server error');
  }
});

// Add a new order - not tested yet
app.post('/orders', async (req, res) => {
  const { ApprovalDate, OrderStatusId, UserName, Email, PhoneNumber } = req.body;

  // Validate input
  if (!UserName || !Email || !PhoneNumber) {
    return res.status(HttpStatus.StatusCodes.BAD_REQUEST).json({
      error: "Can't add order. Username, email, and phone number can't be empty.",
    });
  }

  // Validate phone number - digits only
  if (!/^\d+$/.test(PhoneNumber)) {
    return res.status(HttpStatus.StatusCodes.BAD_REQUEST).json({
      error: "Can't add order. Phone number should contain only digits.",
    });
  }

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
    res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).send('Internal server error');
  }
});

// Update order status - not tested yet
app.patch('/orders/:id', async (req, res) => {
  const { id } = req.params;
  const { OrderStatusId } = req.body;

  try {
    const order = await knexInstance('Orders').where({ OrderId: id }).first();
    // Validate if order exists
    if (!order) {
      return res.status(HttpStatus.StatusCodes.NOT_FOUND).json({
        error: "Can't update order. Make sure the order exists.",
      });
    }

    // Validate if order is not cancelled
    if (order.OrderStatusId === 3) {
      return res.status(HttpStatus.StatusCodes.BAD_REQUEST).json({
        error: "Can't update order. Order is already cancelled.",
      });
    }

    // Validate if the order status is not previously set
    if (order.OrderStatusId > OrderStatusId) {
      return res.status(HttpStatus.StatusCodes.BAD_REQUEST).json({
        error: "Can't update order. Order status can't be changed to a previous status.",
      });
    }

    const count = await knexInstance('Orders').where({ OrderId: id }).update({
      OrderStatusId,
    });

    if (count > 0) {
      res.status(HttpStatus.StatusCodes.OK).send('Order status updated');
    } else {
      res.status(HttpStatus.StatusCodes.NOT_FOUND).send('Order not found');
    }
  } catch (error) {
    console.error(error);
    res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).send('Internal server error');
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
    res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).send('Internal server error');
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
    res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).send('Internal server error');
  }
});


    