const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  name:         { type: String, required: true },
  description:  { type: String, required: true },
  price:        { type: Number, required: true },
  imageURL:     { type: String, required: true },
  tags:         { type: [String] },
  rating:       { type: Number },
  review:       { type: String }
})

module.exports = mongoose.model('Product', productSchema);