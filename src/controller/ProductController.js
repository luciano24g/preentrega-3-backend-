// productController.js

import * as ProductService from '../service/productService.js';

export const getProducts = async (req, res, next) => {
    const { limit, page, sort, query } = req.query;
    try {
        const products = await ProductService.getProducts({ limit, page, sort, query });
        res.status(200).json({ status: "success", products });
    } catch (error) {
        console.error('Error al obtener productos:', error.message);
        res.status(500).json({ status: "error", message: "Error al obtener productos" });
    }
};

export const getDistinctTipos = async (req, res, next) => {
    try {
        const tipos = await ProductService.getDistinctTipos();
        res.status(200).json({ status: "success", tipos });
    } catch (error) {
        console.error('Error al obtener tipos de productos:', error.message);
        res.status(500).json({ status: "error", message: "Error al obtener tipos de productos" });
    }
};

export const createProduct = async (req, res, next) => {
    const productData = req.body;
    try {
        const newProduct = await ProductService.addProduct(productData);
        res.status(201).json({ status: "success", message: "Producto creado con éxito", newProduct });
    } catch (error) {
        console.error('Error al crear producto:', error.message);
        res.status(500).json({ status: "error", message: "Error al crear producto" });
    }
};

export const updateProduct = async (req, res, next) => {
    const productId = req.params.pid;
    const updatedData = req.body;
    try {
        const updatedProduct = await ProductService.updateProduct(productId, updatedData);
        res.status(200).json({ status: "success", message: "Producto actualizado con éxito", updatedProduct });
    } catch (error) {
        console.error(`Error al actualizar producto con ID ${productId}:`, error.message);
        res.status(500).json({ status: "error", message: `Error al actualizar producto con ID ${productId}` });
    }
};

export const deleteProduct = async (req, res, next) => {
    const productId = req.params.id;
    try {
        await ProductService.deleteProduct(productId);
        res.status(200).json({ status: "success", message: "Producto eliminado con éxito" });
    } catch (error) {
        console.error(`Error al eliminar producto con ID ${productId}:`, error.message);
        res.status(500).json({ status: "error", message: `Error al eliminar producto con ID ${productId}` });
    }
};

// Definición de la función addProductToCart
export const addProductToCart = async (req, res, next) => {
    // Código para agregar un producto al carrito
};


