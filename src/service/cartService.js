// cartService.js

import CartManagerMongo from '../managers/CartManagerMongo.js';

const cartManager = new CartManagerMongo();

export const getCarts = async () => {
    try {
        return await cartManager.getCarts();
    } catch (error) {
        throw error;
    }
};

export const getCartByID = async (cid) => {
    try {
        return await cartManager.getCartByID(cid);
    } catch (error) {
        throw error;
    }
};

export const createCart = async () => {
    try {
        return await cartManager.createCart();
    } catch (error) {
        throw error;
    }
};
export const updateCart = async (cid, updatedCartData) => {
    try {
        // Aquí implementa la lógica para actualizar el carrito usando el cartManager apropiado
        // Por ejemplo:
        const updatedCart = await cartManager.updateCart(cid, updatedCartData);
        return updatedCart;
    } catch (error) {
        throw error;
    }
};

export const addProductToCart = async (cid, pid, quantity) => {
    try {
        return await cartManager.addProductInCart(cid, pid, quantity);
    } catch (error) {
        throw error;
    }
};
