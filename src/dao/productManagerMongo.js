const Product = require('../dao/models/Product.js');
const mongoosePaginate = require('mongoose-paginate-v2');

class ProductManagerMongo {
  constructor() {
    // Configurar paginate para Product
    Product.paginate = mongoosePaginate.paginate;
  }

  async getProducts({ limit = 10, page = 1, sort, query }) {
    try {
      let options = {
        page,
        limit,
        sort: {}
      };

      if (sort) {
        options.sort = { precio: sort === 'asc' ? 1 : -1 };
      }

      const products = await Product.paginate(query, options);

      return {
        status: 'success',
        payload: products.docs,
        totalPages: products.totalPages,
        prevPage: products.prevPage,
        nextPage: products.nextPage,
        page: products.page,
        hasPrevPage: products.hasPrevPage,
        hasNextPage: products.hasNextPage,
        prevLink: products.hasPrevPage ? `/api/products?limit=${limit}&page=${products.prevPage}${sort ? `&sort=${sort}` : ''}${query && query.tipo ? `&tipo=${query.tipo}` : ''}` : null,
        nextLink: products.hasNextPage ? `/api/products?limit=${limit}&page=${products.nextPage}${sort ? `&sort=${sort}` : ''}${query && query.tipo ? `&tipo=${query.tipo}` : ''}` : null,
      };

    } catch (error) {
      console.error('Error al obtener productos:', error.message);
      return {
        status: 'error',
        payload: [],
        message: 'Error al obtener productos'
      };
    }
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
      return {
        status: 'error',
        payload: null,
        message: 'Error al agregar producto'
      };
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
      return {
        status: 'error',
        payload: null,
        message: 'Error al actualizar producto'
      };
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
      return {
        status: 'error',
        payload: null,
        message: 'Error al eliminar producto'
      };
    }
  }
}


module.exports = ProductManagerMongo;
