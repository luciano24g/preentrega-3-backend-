const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  tipo: String,
  nombre: String,
  descripcion: String,
  precio: Number,
  stock: Number,
  thumbnail: String
});

module.exports = mongoose.model('Product', productSchema);
