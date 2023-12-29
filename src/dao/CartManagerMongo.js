const Cart = require('./models/Cart.js'); 

class CartManagerMongo {
  
  // ... [otros métodos existentes] ...

  async addProductToCart(cartId, productId, quantity = 1) {
    try {
      const updatedCart = await Cart.findByIdAndUpdate(cartId, {
        $push: { 
          products: {
            productId,
            quantity
          } 
        }
      }, { new: true });

      if (!updatedCart) {
        throw new Error('Carrito no encontrado');
      }

      return updatedCart;
    } catch (error) {
      console.error('Error al agregar producto al carrito:', error.message);
      return null;
    }
  }
}

module.exports = CartManagerMongo;
