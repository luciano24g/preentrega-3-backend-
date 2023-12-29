const Product = require('../dao/models/Product');  // Asegúrate de que la ruta sea correcta según tu estructura

class ProductManagerMongo {
  
  // Obtener todos los productos
  async getAllProducts() {
    try {
      const products = await Product.find();
      return products;
    } catch (error) {
      console.error('Error al obtener productos:', error.message);
      return [];
    }
  }

  // Obtener productos por ID
  async getProductById(id) {
    try {
      const product = await Product.findById(id);
      return product;
    } catch (error) {
      console.error('Error al obtener producto por ID:', error.message);
      return null;
    }
  }

  // Método para filtrar productos por categoría
  async getProductsByCategory(category) {
    try {
      const products = await Product.find({ category: category });
      return products;
    } catch (error) {
      console.error('Error al obtener productos por categoría:', error.message);
      return [];
    }
  }

  // Método para paginar productos
  async getProductsByPage(page = 1, limit = 10) {
    try {
      const skip = (page - 1) * limit;
      const products = await Product.find().skip(skip).limit(limit);
      return products;
    } catch (error) {
      console.error('Error al obtener productos paginados:', error.message);
      return [];
    }
  }

  // Método para ordenar productos por precio
  async getProductsSortedByPrice(order = 'asc') {
    try {
      const products = await Product.find().sort({ price: order });
      return products;
    } catch (error) {
      console.error('Error al obtener productos ordenados por precio:', error.message);
      return [];
    }
  }
}

module.exports = ProductManagerMongo;
