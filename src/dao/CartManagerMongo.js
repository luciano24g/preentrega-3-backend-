const CartModel = require('./models/Cart.js');
const mongoose = require('mongoose');

class CartManagerMongo {
    getCarts = async () => {
        try {
            const carts = await CartModel.find().select('_id products'); // Utiliza CartModel en lugar de Cart
            return carts;
        } catch (error) {
            console.error('Error al obtener carritos:', error.message);
            throw error;
        }
    }

    getCartByID = async (cid) => {
        try {
            const cart = await CartModel.findOne({ _id: cid });
            return cart;
        } catch (error) {
            console.error('Error al obtener carrito por ID:', error.message);
            throw error;
        }
    }
    async getCartByCartNumber(cartNumber) {
        try {
            const cart = await CartModel.findOne({ _id: cartNumber }).populate('products.product');
            return cart;
        } catch (error) {
            console.error('Error al obtener carrito por número:', error.message);
            throw error;
        }
    }

    createCart = async () => {
        try {
            const cart = await CartModel.create({ _id: new mongoose.Types.ObjectId() });
            return cart;
        } catch (error) {
            console.error('Error al crear el carrito:', error);
            throw new Error('Error al crear el carrito. Detalles en el registro del servidor.');
        }
    }
    
    async addProductInCart(cid, pid, quantity = 1) {
        try {
            // Verifica si el carrito existe
            const cart = await CartModel.findById(cid);
            if (!cart) {
                throw new Error('Carrito no encontrado');
            }

            // Añade el producto al carrito
            cart.products.push({
                product: pid,
                quantity: quantity
            });

            // Guarda el carrito actualizado en la base de datos
            await cart.save();

            // Devuelve el carrito actualizado
            return cart;
        } catch (error) {
            console.error('Error al agregar producto al carrito:', error.message);
            throw error;
        }
    }
}

module.exports = CartManagerMongo;
