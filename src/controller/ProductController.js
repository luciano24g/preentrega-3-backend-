// ProductController.js
import ProductManager from "../managers/productManagerMongo.js";

const productManager = new ProductManager();

export const getProducts = async (req, res) => {
    try {
        const { page, limit, sort, query } = req.query;
        const products = await productManager.getProducts({ page, limit, sort, query }); // Corrección aquí
        res.status(200).json(products);
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).json({ status: "error", message: "Error al obtener productos" });
    }
};
export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await productManager.getById(id);
        res.status(200).json(product);
    } catch (error) {
        console.error('Error al obtener el producto:', error);
        res.status(500).json({ status: "error", message: "Error al obtener el producto" });
    }
};

export const createProduct = async (req, res) => {
    try {
        const productData = req.body;
        const newProduct = await productManager.add(productData);
        res.status(201).json(newProduct);
    } catch (error) {
        console.error('Error al crear el producto:', error);
        res.status(500).json({ status: "error", message: "Error al crear el producto" });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        const updatedProduct = await productManager.update(id, updatedData);
        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error(`Error al actualizar el producto: ${error}`);
        res.status(500).json({ status: "error", message: `Error al actualizar el producto: ${error}` });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        await productManager.delete(id);
        res.status(200).json({ message: "Producto eliminado con éxito" });
    } catch (error) {
        console.error(`Error al eliminar el producto: ${error}`);
        res.status(500).json({ status: "error", message: `Error al eliminar el producto: ${error}` });
    }
};
