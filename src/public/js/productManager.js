const fs = require('fs');

class ProductManager {
  constructor() {
    this.filePath = 'products.json';
    this.products = this.loadProductsFromFile();
  }

  getProductsForView(limit) {
    const allProducts = this.getProducts(limit);
    return allProducts.map(product => ({
      title: product.title,
      price: product.price
    }));
  }

  loadProductsFromFile() {
    try {
      const data = fs.readFileSync(this.filePath, 'utf8');
      return JSON.parse(data);
    } catch (err) {
      console.error('Error loading products:', err.message);
      return [];
    }
  }

  saveProductsToFile() {
    try {
      const data = JSON.stringify(this.products);
      fs.writeFileSync(this.filePath, data);
    } catch (err) {
      console.error('Error saving products:', err.message);
    }
  }

  getProducts(limit) {
    if (limit) {
      return this.products.slice(0, limit);
    }
    return this.products;
  }

  getProductById(productId) {
    return this.products.find(product => product.id === productId);
  }

  addProduct(newProduct) {
    const productId = this.generateProductId();
    const product = { id: productId, ...newProduct };
    this.products.push(product);
    this.saveProductsToFile();
    return product;
  }

  updateProduct(productId, updatedProduct) {
    const index = this.products.findIndex(product => product.id === productId);
    if (index !== -1) {
      this.products[index] = { id: productId, ...updatedProduct };
      this.saveProductsToFile();
      return this.products[index];
    }
    return null;
  }

  deleteProduct(productId) {
    const index = this.products.findIndex(product => product.id === productId);
    if (index !== -1) {
      const deletedProduct = this.products.splice(index, 1);
      this.saveProductsToFile();
      return deletedProduct[0];
    }
    return null;
  }

  generateProductId() {
    const lastProductId = this.products.length > 0 ? this.products[this.products.length - 1].id : 0;
    return lastProductId + 1;
  }
}

module.exports = ProductManager;
