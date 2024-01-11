const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const HttpStatus = require('http-status-codes');
const bodyParser = require('body-parser');
const cors = require('cors');
const bookshelf = require('./bookshelf'); 
const Product = require('./models/Product');
const Category = require('./models/Category');
const Orders = require('./models/Orders');
const OrderStatus = require('./models/OrderStatus');
const OrderItems = require('./models/OrderItems');


app.use(bodyParser.json());
app.use(cors());

// Define the '/hello' route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});



// Fetch all products
app.get('/products', async (req, res) => {
  try {
    const products = await Product.fetchAll();
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
    const product = await Product.where({ ProductId: id }).fetch();
    if (product) {
      res.json(product.toJSON());
    } else {
      res.status(HttpStatus.StatusCodes.NOT_FOUND).send('Product not found');
    }
  } catch (error) {
    console.error(error);
    res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).send('Internal server error');
  }
});


app.post('/products', async (req, res) => {
  const { Name, Description, UnitPrice, Weight, CategoryId } = req.body;

  if (!Name || !Description || UnitPrice <= 0 || Weight <= 0) {
    return res.status(HttpStatus.StatusCodes.BAD_REQUEST).json({
      error: "Can't add product. Name and description can't be empty, and unit price and weight must be greater than 0.",
    });
  }

  try {
    const product = await Product.forge({
      Name,
      Description,
      UnitPrice,
      Weight,
      CategoryId,
    }).save();

    res.status(HttpStatus.StatusCodes.CREATED).json({ ProductId: product.get('ProductId') });
  } catch (error) {
    console.error(error);
    res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).send('Internal server error');
  }
});

app.put('/products/:id', async (req, res) => {
  const { id } = req.params;
  const { Name, Description, UnitPrice, Weight, CategoryId } = req.body;

  if (!Name || !Description || UnitPrice <= 0 || Weight <= 0) {
    return res.status(HttpStatus.StatusCodes.BAD_REQUEST).json({
      error: "Can't update product. Name and description can't be empty, and unit price and weight must be greater than 0.",
    });
  }

  try {
    const product = await Product.where({ ProductId: id }).fetch();

    if (!product) {
      return res.status(HttpStatus.StatusCodes.NOT_FOUND).json({
        error: "Can't update product. Make sure the specified product exists.",
      });
    }

    // Update the product attributes
    await product.save({
      Name,
      Description,
      UnitPrice,
      Weight,
      CategoryId,
    }, { method: 'update', patch: true, require: false });

    res.status(HttpStatus.StatusCodes.OK).json({ message: "Product successfully updated." });
  } catch (error) {
    console.error(error);
    res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).send('Internal server error.');
  }
});


// Fetch all categories
app.get('/categories', async (req, res) => {
  try {
    const categories = await Category.fetchAll();
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).send('Internal server error');
  }
});

// Fetch all orders
app.get('/orders', async (req, res) => {
  try {
    const orders = await Orders.fetchAll();
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).send('Internal server error');
  }
});


app.post('/orders', async (req, res) => {
  const { ApprovalDate, OrderStatusId, UserName, Email, PhoneNumber, Items } = req.body;

  if (!UserName || !Email || !PhoneNumber || !Array.isArray(Items) || Items.length === 0) {
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
    const order = await Orders.forge({
      ApprovalDate,
      OrderStatusId,
      UserName,
      Email,
      PhoneNumber,
    }).save();

    for (let i = 0; i < Items.length; i++) {
      const product = await Product.forge({ ProductId: Items[i].ProductId }).fetch();

      if (!product) {
        return res.status(HttpStatus.StatusCodes.BAD_REQUEST).json({
          error: `Can't add order. Product with specified ID doesn't exist.`,
        });
      }

      // Validate if product's quantity is greater than 0 and a number
      if (!Number.isInteger(Items[i].Quantity) || Items[i].Quantity <= 0) {
        return res.status(HttpStatus.StatusCodes.BAD_REQUEST).json({
          error: `Can't add order. Quantity for product must be an integer and greater than 0.`,
        });
      }

      // Add products to the order
      await OrderItems.forge({
        OrderId: order.get('OrderId'),
        ProductId: Items[i].ProductId,
        Quantity: Items[i].Quantity,
      }).save();
    }

    res.status(HttpStatus.StatusCodes.CREATED).json({ OrderId: order.get('OrderId') });
  } catch (error) {
    console.error(error);
    res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).send('Internal server error');
  }
});


app.patch('/orders/:id', async (req, res) => {
  const { id } = req.params;
  const { OrderStatusId } = req.body;

  try {
    const order = await Orders.forge({ OrderId: id }).fetch();

    if (!order) {
      return res.status(HttpStatus.StatusCodes.NOT_FOUND).json({
        error: "Can't update order. Make sure the order exists.",
      });
    }

    if (order.get('OrderStatusId') === 3) {
      return res.status(HttpStatus.StatusCodes.BAD_REQUEST).json({
        error: "Can't update order. Order is already cancelled.",
      });
    }

    if (order.get('OrderStatusId') > OrderStatusId) {
      return res.status(HttpStatus.StatusCodes.BAD_REQUEST).json({
        error: "Can't update order. Order status can't be changed to a previous status.",
      });
    }

    await order.save({ OrderStatusId }, { method: 'update', patch: true, require: false });

    res.status(HttpStatus.StatusCodes.OK).send('Order status updated');
  } catch (error) {
    console.error(error);
    res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).send('Internal server error');
  }
});

app.get('/orders/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Orders.where({ OrderId: id }).fetch();
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).send('Internal server error');
  }
});

app.get('/orders/status/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const orders = await Orders.where({ OrderStatusId: id }).fetchAll();
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).send('Internal server error');
  }
});


app.get('/status', async (req, res) => {
  try {
    const orderStatus = await OrderStatus.fetchAll();
    res.json(orderStatus);
  } catch (error) {
    console.error(error);
    res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).send('Internal server error');
  }
});


    