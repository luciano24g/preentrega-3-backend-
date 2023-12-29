const Cart = require('../models/cart');  // Asegúrate de que la ruta sea correcta según tu estructura

class CartManagerMongo {
  
  // Obtener todos los carritos
  async getAllCarts() {
    try {
      const carts = await Cart.find();
      return carts;
    } catch (error) {
      console.error('Error al obtener carritos:', error.message);
      return [];
    }
  }

  // Obtener un carrito por ID
  async getCartById(id) {
    try {
      const cart = await Cart.findById(id);
      return cart;
    } catch (error) {
      console.error('Error al obtener el carrito por ID:', error.message);
      return null;
    }
  }

  // Crear un nuevo carrito
  async createCart(data) {
    try {
      const newCart = new Cart(data);
      await newCart.save();
      return newCart;
    } catch (error) {
      console.error('Error al crear el carrito:', error.message);
      return null;
    }
  }

  // Actualizar un carrito existente por ID
  async updateCart(id, data) {
    try {
      const updatedCart = await Cart.findByIdAndUpdate(id, data, { new: true });
      if (!updatedCart) {
        throw new Error('Carrito no encontrado');
      }
      return updatedCart;
    } catch (error) {
      console.error('Error al actualizar el carrito:', error.message);
      return null;
    }
  }

  // Eliminar un carrito por ID
  async deleteCart(id) {
    try {
      const deletedCart = await Cart.findByIdAndDelete(id);
      if (!deletedCart) {
        throw new Error('Carrito no encontrado');
      }
      return deletedCart;
    } catch (error) {
      console.error('Error al eliminar el carrito:', error.message);
      return null;
    }
  }
}

module.exports = CartManagerMongo;
