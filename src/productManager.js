import { loadProductsFromFile, saveProductsToFile } from './fileHandler.mjs';

class ProductManager {
  constructor() {
    this.products = loadProductsFromFile('products.json');
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
    saveProductsToFile('products.json', this.products);
    return product;
  }

  updateProduct(productId, updatedProduct) {
    const index = this.products.findIndex(product => product.id === productId);
    if (index !== -1) {
      this.products[index] = { id: productId, ...updatedProduct };
      saveProductsToFile('products.json', this.products);
      return this.products[index];
    }
    return null;
  }

  deleteProduct(productId) {
    const index = this.products.findIndex(product => product.id === productId);
    if (index !== -1) {
      const deletedProduct = this.products.splice(index, 1);
      saveProductsToFile('products.json', this.products);
      return deletedProduct[0];
    }
    return null;
  }

  generateProductId() {
    const lastProductId = this.products.length > 0 ? this.products[this.products.length - 1].id : 0;
    return lastProductId + 1;
  }
}

export default ProductManager;
