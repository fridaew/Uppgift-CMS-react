const router = require('express').Router();
const { addProduct, getProducts, getProductById, updateProduct, deleteProduct } = require('../models/productModel');
const { verifyToken, checkAdmin} = require('../authentication/auth')



// Create
router.post('/', checkAdmin ,addProduct);

// Read
router.get('/', getProducts);
router.get('/:id', getProductById);

// Update
router.put('/:id', checkAdmin, updateProduct);

// Delete
router.delete('/:id', checkAdmin, deleteProduct);


module.exports = router;