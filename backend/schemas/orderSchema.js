
const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
  customerId: { type: mongoose.Types.ObjectId, ref: 'User', },
  orderRow: [{ product: { type: mongoose.Types.ObjectId, ref: 'Product' }, quantity: { type: Number } }],
  orderStatus: { type: String }
}, { timestamps: true })

module.exports = mongoose.model('Order', orderSchema)
