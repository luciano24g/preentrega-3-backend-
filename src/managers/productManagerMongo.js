// productManagerMongo.js

import Product from '../persistencia/Product.js';
import mongoosePaginate from 'mongoose-paginate-v2';

class ProductManagerMongo {
    constructor() {
        // Configurar paginate para Product
        Product.paginate = mongoosePaginate.paginate;
    }

    async getProducts({ limit = 10, page = 1, sort, query }) {
        try {
            const options = {
                page,
                limit,
                sort: sort ? { precio: sort === 'asc' ? 1 : -1 } : {}
            };

            const products = await Product.paginate(query, options);

            // Construir la respuesta paginada
            const response = {
                status: 'success',
                payload: products.docs,
                totalPages: products.totalPages,
                prevPage: products.prevPage,
                nextPage: products.nextPage,
                page: products.page,
                hasPrevPage: products.hasPrevPage,
                hasNextPage: products.hasNextPage,
                prevLink: products.hasPrevPage ? this.generatePageLink(limit, products.prevPage, sort, query) : null,
                nextLink: products.hasNextPage ? this.generatePageLink(limit, products.nextPage, sort, query) : null,
            };

            return response;
        } catch (error) {
            console.error('Error al obtener productos:', error.message);
            throw error;
        }
    }

    async getDistinctTipos() {
        try {
            const distinctTipos = await Product.distinct('tipo');
            return {
                status: 'success',
                payload: distinctTipos,
                message: 'Tipos distintos obtenidos correctamente'
            };
        } catch (error) {
            console.error('Error al obtener tipos distintos:', error.message);
            throw error;
        }
    }

    generatePageLink(limit, page, sort, query) {
        let link = `/api/products?limit=${limit}&page=${page}`;

        if (sort) {
            link += `&sort=${sort}`;
        }

        if (query && query.tipo) {
            link += `&tipo=${query.tipo}`;
        }

        return link;
    }

    async addProduct(productData) {
        try {
            const newProduct = new Product(productData);
            await newProduct.save();
            return {
                status: 'success',
                payload: newProduct,
                message: 'Producto agregado correctamente'
            };
        } catch (error) {
            console.error('Error al agregar producto:', error.message);
            throw error;
        }
    }

    async updateProduct(productId, updatedData) {
        try {
            const product = await Product.findByIdAndUpdate(productId, updatedData, { new: true });
            if (!product) throw new Error('Producto no encontrado');
            return {
                status: 'success',
                payload: product,
                message: 'Producto actualizado correctamente'
            };
        } catch (error) {
            console.error('Error al actualizar producto:', error.message);
            throw error;
        }
    }

    async deleteProduct(productId) {
        try {
            const product = await Product.findByIdAndDelete(productId);
            if (!product) throw new Error('Producto no encontrado');
            return {
                status: 'success',
                payload: product,
                message: 'Producto eliminado correctamente'
            };
        } catch (error) {
            console.error('Error al eliminar producto:', error.message);
            throw error;
        }
    }
}

export default ProductManagerMongo;
