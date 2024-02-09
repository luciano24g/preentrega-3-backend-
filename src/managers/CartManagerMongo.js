// cartManagerMongo.js

import CartModel from '../persistencia/Cart.js';
import mongoose from 'mongoose';

class CartManagerMongo {
    async getCarts() {
        try {
            return await CartModel.find().select('_id products');
        } catch (error) {
            throw error;
        }
    }

    async getCartByID(cid) {
        try {
            return await CartModel.findOne({ _id: cid });
        } catch (error) {
            throw error;
        }
    }

    async createCart() {
        try {
            return await CartModel.create({ _id: new mongoose.Types.ObjectId() });
        } catch (error) {
            throw new Error('Error al crear el carrito');
        }
    }

    async addProductInCart(cid, pid, quantity = 1) {
        try {
            const cart = await CartModel.findById(cid);
            if (!cart) {
                throw new Error('Carrito no encontrado');
            }
            cart.products.push({ product: pid, quantity });
            await cart.save();
            return cart;
        } catch (error) {
            throw error;
        }
    }
}

export default CartManagerMongo;
