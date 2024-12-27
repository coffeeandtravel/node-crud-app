
# CRUD App - MongoDB, ExpressJS, NodeJS

This is a simple CRUD (Create, Read, Update, Delete) application built using **MongoDB**, **ExpressJS**, and **NodeJS**. It uses RESTful APIs for interaction. The app allows users to manage product data with typical CRUD operations.

## Setup Instructions

1. **Clone the Repository**:
   Clone this repository to your local machine:
   ```bash
   git clone <repository-url>
   cd <project-folder>
   ```

2. **Install Dependencies**:
   Install required npm packages:
   ```bash
   npm install
   ```

3. **Environment Variables**:
   Set up your environment variables:
   - Create a `.env` file in the root directory.
   - Add your MongoDB connection string:
   ```bash
   MONGO_URI=<your-mongodb-uri>
   ```

4. **Start the Server**:
   Run the following command to start the server:
   ```bash
   npm start
   ```
   The server will now be running on `http://localhost:3000`.

---

## Project Structure

The project is organized into the following structure:

```
- controllers/
    - product.controllers.js
- models/
    - model.product.js
- routes/
    - route.js
- index.js
```

### 1. **index.js** (Entry Point)
The `index.js` file is the entry point for the application. It sets up the Express server and connects to MongoDB.

```js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const productRoutes = require('./routes/route');

dotenv.config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // Parse JSON bodies

// Routes
app.use('/api/products', productRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('Error connecting to MongoDB:', err));

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
```

### 2. **routes/route.js**
This file defines the routes for the CRUD operations, such as getting, creating, updating, and deleting products. It uses Express's router to handle the routes and link them to the corresponding controller functions.

```js
const express = require('express');
const router = express.Router();
const { getProducts, getProduct, createProduct, updateProduct, deleteProduct } = require('../controllers/product.controllers.js');

// Define GET, POST, PUT, DELETE routes
router.get('/', getProducts); // Get all products
router.get('/:id', getProduct); // Get a product by ID
router.post('/', createProduct); // Create a new product
router.put('/:id', updateProduct); // Update a product by ID
router.delete('/:id', deleteProduct); // Delete a product by ID

module.exports = router;
```

### 3. **models/model.product.js**
This file defines the **Product** model using Mongoose. Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js that provides a schema-based solution to model your data.

```js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
```

- **name**: The name of the product.
- **price**: The price of the product.
- **description**: A brief description of the product.
- **category**: The category the product belongs to.

### 4. **controllers/product.controllers.js**
This file contains the controller functions for handling the logic of each CRUD operation. The controller functions interact with the **Product** model and return responses.

#### `getProducts`:
Fetches all products from the database.

```js
const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
```

#### `getProduct`:
Fetches a single product based on its ID.

```js
const getProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
```

#### `createProduct`:
Creates a new product in the database.

```js
const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
```

#### `updateProduct`:
Updates an existing product by its ID.

```js
const updateProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByIdAndUpdate(id, req.body);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    const updatedProduct = await Product.findById(id);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
```

#### `deleteProduct`:
Deletes a product by its ID.

```js
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
```

---

## Testing the API

Once the app is running, you can test the API using tools like **Postman** or **cURL**.

1. **GET /api/products**: Fetch all products.
2. **GET /api/products/:id**: Fetch a product by its ID.
3. **POST /api/products**: Create a new product. Provide the necessary product details in the request body.
4. **PUT /api/products/:id**: Update an existing product by its ID.
5. **DELETE /api/products/:id**: Delete a product by its ID.

---

## Conclusion

This CRUD app demonstrates how to create, read, update, and delete products in a MongoDB database using ExpressJS and NodeJS. The app is structured in a modular way, separating routes, controllers, and models to keep the codebase organized and maintainable.
