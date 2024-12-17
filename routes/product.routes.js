const express = require('express');
const router = express.Router();

const Product = require('../models/model.product.js');
const { getProducts, getProduct, createProduct, updateProduct, deleteProduct } = require('../controllers/product.controllers.js');

//GET
router.get('/', getProducts);
router.get('/:id', getProduct);

//POST
router.post('/', createProduct);

//PUT
router.put('/:id', updateProduct);

//DELETE
router.delete('/:id', deleteProduct);

module.exports = router;