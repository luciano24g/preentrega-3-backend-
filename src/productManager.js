import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class ProductManager {
  constructor() {
    this.path = path.join(__dirname, '../productos.json');
    this.products = [];
    this.productIdCounter = 1;
    this.loadProducts();
  }

  loadProducts() {
    try {
      const data = fs.readFileSync(this.path, 'utf8');
      this.products = JSON.parse(data);
      if (this.products.length > 0) {
        this.productIdCounter = Math.max(...this.products.map(product => product.id)) + 1;
      }
    } catch (err) {
      console.error('Error al cargar productos:', err.message);
    }
  }

  saveProducts() {
    try {
      const data = JSON.stringify(this.products);
      fs.writeFileSync(this.path, data);
    } catch (err) {
      console.error('Error al guardar productos:', err.message);
    }
  }

  addProduct(productData) {
    if (
      !productData.title ||
      !productData.description ||
      !productData.price ||
      !productData.thumbnail ||
      !productData.code ||
      !productData.stock
    ) {
      console.error('Todos los campos son obligatorios.');
      return;
    }

    const codeExists = this.products.some(product => product.code === productData.code);
    if (codeExists) {
      console.error('El código del producto ya existe.');
      return;
    }

    const newProduct = {
      id: this.productIdCounter++,
      title: productData.title,
      description: productData.description,
      price: productData.price,
      thumbnail: productData.thumbnail,
      code: productData.code,
      stock: productData.stock,
    };

    this.products.push(newProduct);
    console.log('Producto agregado:', newProduct);
    this.saveProducts(); // Guarda los productos después de agregar uno nuevo
  }

  getProducts() {
    return this.products;
  }

  getProductById(productId) {
    const product = this.products.find(product => product.id === productId);
    if (product) {
      return product;
    } else {
      console.error('Producto no encontrado');
    }
  }

  updateProduct(productId, updatedData) {
    const productIndex = this.products.findIndex(product => product.id === productId);
    if (productIndex !== -1) {
      this.products[productIndex] = { ...this.products[productIndex], ...updatedData };
      this.saveProducts(); // Guarda los productos después de actualizar uno
    } else {
      console.error('Producto no encontrado');
    }
  }

  deleteProduct(productId) {
    const productIndex = this.products.findIndex(product => product.id === productId);
    if (productIndex !== -1) {
      this.products.splice(productIndex, 1);
      this.saveProducts(); // Guarda los productos después de eliminar uno
    } else {
      console.error('Producto no encontrado');
    }
  }
}

export default ProductManager;
