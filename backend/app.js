const express = require('express');
const cors = require('cors')
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors())

app.use('/api/users', require('./controllers/userController'));
app.use('/api/products', require('./controllers/productController'));
app.use('/api/orders', require('./controllers/orderController'))

module.exports = app
