const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  tipo: String,           // Asumiendo que "tipo" puede ser una cadena, puedes ajustarlo según tus necesidades
  nombre: String,         // Lo mismo para "nombre"
  descripcion: String,    // Lo mismo para "descripcion"
  precio: Number,         // Asumiendo que "precio" es un número
  stock: Number,          // Lo mismo para "stock"
  thumbnail: String       // Asumiendo que "thumbnail" es una cadena para la URL de la imagen
});

module.exports = mongoose.model('Product', productSchema);
