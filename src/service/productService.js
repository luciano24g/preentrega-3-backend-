// productService.js

import ProductManagerMongo from '../managers/productManagerMongo.js';

const productManager = new ProductManagerMongo();

export const getProducts = async ({ limit = 10, page = 1, sort, query }) => {
    try {
        return await productManager.getProducts({ limit, page, sort, query });
    } catch (error) {
        throw error;
    }
};

export const getDistinctTipos = async () => {
    try {
        return await productManager.getDistinctTipos();
    } catch (error) {
        throw error;
    }
};

export const addProduct = async (productData) => {
    try {
        return await productManager.addProduct(productData);
    } catch (error) {
        throw error;
    }
};

export const updateProduct = async (productId, updatedData) => {
    try {
        return await productManager.updateProduct(productId, updatedData);
    } catch (error) {
        throw error;
    }
};

export const deleteProduct = async (productId) => {
    try {
        return await productManager.deleteProduct(productId);
    } catch (error) {
        throw error;
    }
};
