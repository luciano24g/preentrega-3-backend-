// dao/models/Product.js

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  stock: Number,
  thumbnail: String
});

module.exports = mongoose.model('Product', productSchema);
