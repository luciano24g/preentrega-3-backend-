const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  products: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, // Esto referencia al modelo Product
    quantity: Number
  }],
  // Puedes añadir más campos según lo que necesites para tu carrito
  // Por ejemplo, un campo para el usuario que posee el carrito, fecha de creación, etc.
});

module.exports = mongoose.model('Cart', cartSchema);
