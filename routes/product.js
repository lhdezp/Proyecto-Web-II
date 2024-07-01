
const express = require('express');
const router = express.Router();

const { getAllProducts, getProduct, createProduct, updateProduct, deleteProduct } = require("../controllers/product.js");

const {validateJWT} = require('../middlewares/validateJWT.js');

// Get all products
router.get('/', getAllProducts);

// Get a single product by name
router.get('/:name', getProduct);

// Create a new product
router.post('/', validateJWT, createProduct);

// Update an existing product by name
router.put('/:name', validateJWT, updateProduct);

// Delete a product by name
router.delete('/:name', validateJWT, deleteProduct);

module.exports = router;
