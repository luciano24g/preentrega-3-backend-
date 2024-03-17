// CartController.js

import * as CartService from '../service/cartService.js';
import TicketService from '../service/ticketService.js'; // Importa el servicio de tickets

export const getCarts = async (req, res, next) => {
    try {
        const carts = await CartService.getCarts();
        res.status(200).json({ status: "success", carts });
    } catch (error) {
        console.error('Error al obtener carritos:', error.message);
        res.status(500).json({ status: "error", message: "Error al obtener carritos" });
    }
};

export const getCartByID = async (req, res, next) => {
    const cid = req.params.cid;
    try {
        const cart = await CartService.getCartByID(cid);
        res.status(200).json({ status: "success", cart });
    } catch (error) {
        console.error(`Error al obtener carrito con ID ${cid}:`, error.message);
        res.status(500).json({ status: "error", message: `Error al obtener carrito con ID ${cid}` });
    }
};

export const createCart = async (req, res, next) => {
    try {
        const newCart = await CartService.createCart();
        res.status(201).json({ status: "success", message: "Carrito creado con éxito", cartId: newCart._id });
    } catch (error) {
        console.error('Error al crear el carrito:', error.message);
        res.status(500).json({ status: "error", message: "Error al crear el carrito" });
    }
};

export const addProductToCart = async (req, res, next) => {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const quantity = req.body.quantity;

    try {
        const cart = await CartService.addProductToCart(cid, pid, quantity);
        res.status(200).json({ status: "success", message: "Producto agregado al carrito con éxito", cart });
    } catch (error) {
        console.error('Error al agregar producto al carrito:', error.message);
        res.status(500).json({ status: "error", message: "Error al agregar producto al carrito" });
    }
};

export const updateCart = async (req, res, next) => {
    const cid = req.params.cid;
    const updatedCartData = req.body; // Datos actualizados del carrito

    try {
        const updatedCart = await CartService.updateCart(cid, updatedCartData);
        res.status(200).json({ status: "success", message: "Carrito actualizado con éxito", cart: updatedCart });
    } catch (error) {
        console.error(`Error al actualizar el carrito con ID ${cid}:`, error.message);
        res.status(500).json({ status: "error", message: `Error al actualizar el carrito con ID ${cid}` });
    }
};

export const deleteCart = async (req, res, next) => {
    const cid = req.params.cid; // Obtén el ID del carrito de la solicitud

    try {
        // Llama a una función en el servicio para eliminar el carrito por su ID
        await CartService.deleteCart(cid);
        res.status(200).json({ status: "success", message: "Carrito eliminado con éxito" });
    } catch (error) {
        console.error(`Error al eliminar el carrito con ID ${cid}:`, error.message);
        res.status(500).json({ status: "error", message: `Error al eliminar el carrito con ID ${cid}` });
    }
};

// Generar ticket de compra
export const generatePurchaseTicket = async (req, res, next) => {
    const cid = req.params.cid;
    const purchaser = req.user.email; // O cualquier método para obtener el usuario que realiza la compra
    try {
        const cart = await CartService.getCartByID(cid);
        if (!cart) {
            return res.status(404).json({ status: "error", message: `Carrito con ID ${cid} no encontrado` });
        }

        // Generar ticket de compra
        const ticket = await TicketService.generateTicket(cart, purchaser);
        res.status(200).json({ status: "success", message: "Ticket de compra generado con éxito", ticket });
    } catch (error) {
        console.error(`Error al generar ticket de compra para el carrito con ID ${cid}:`, error.message);
        res.status(500).json({ status: "error", message: `Error al generar ticket de compra para el carrito con ID ${cid}` });
    }
};

