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

      let queryOptions = {};
      if (query) {
        queryOptions = { tipo: query };
      }

      const products = await Product.paginate(queryOptions, options);

      return {
        status: 'success',
        payload: products.docs,
        totalPages: products.totalPages,
        prevPage: products.prevPage,
        nextPage: products.nextPage,
        page: products.page,
        hasPrevPage: products.hasPrevPage,
        hasNextPage: products.hasNextPage,
        prevLink: products.hasPrevPage ? `/api/products?limit=${limit}&page=${products.prevPage}${sort ? `&sort=${sort}` : ''}${query ? `&query=${query}` : ''}` : null,
        nextLink: products.hasNextPage ? `/api/products?limit=${limit}&page=${products.nextPage}${sort ? `&sort=${sort}` : ''}${query ? `&query=${query}` : ''}` : null,
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

  async getProductsByTypeAndPage(tipo, page = 1, limit = 10, order = 'asc') {
    try {
      const options = {
        page,
        limit,
        sort: { precio: order === 'asc' ? 1 : -1 }
      };
      const products = await Product.paginate({ tipo }, options);
      return products;
    } catch (error) {
      console.error('Error al obtener productos paginados por tipo y ordenados por precio:', error.message);
      return [];
    }
  }

  // Nuevo método agregado
  async getProductsByPage(page, limit = 10, sort, query) {
    return await this.getProducts({ page, limit, sort, query });
  }

  // ... [otros métodos existentes que no se modificaron]
}

module.exports = ProductManagerMongo;
