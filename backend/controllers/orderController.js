const router = require('express').Router();
const { addOrder, getOrderById, getOrderByUser, addToExistingOrder,updateOrderStatus, getOrders } = require('../models/orderModel');
const { verifyToken, checkAdmin } = require('../authentication/auth')


// Create
router.post('/', addOrder)

// router.post('/add/:id', addToExistingOrder)

router.patch('/status/:id', checkAdmin, updateOrderStatus);

// Read

router.get('/', getOrders)

router.get('/:id', checkAdmin, getOrderById)

router.get('/user/:id', checkAdmin, getOrderByUser)



module.exports = router;
