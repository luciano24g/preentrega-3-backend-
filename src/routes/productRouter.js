const express = require('express');
const ProductManager = require('../productManager');

const router = express.Router();
const productManager = new ProductManager();
// Middleware para analizar el cuerpo de solicitudes JSON
router.use(express.json());

// Rutas

router.get('/', (req, res, next) => {
  try {
    const limit = req.query.limit;
    const products = productManager.getProducts(limit);
    console.log('Products in productRouter:', products); // Agrega este console.log
    res.render('home', { products });
  } catch (error) {
    console.error('Error:', error);
    next(error);
  }
});

router.get('/:pid', (req, res, next) => {
  try {
    const productId = parseInt(req.params.pid);
    const product = productManager.getProductById(productId);

    if (product) {
      res.render('productDetail', { product }); // Renderiza la vista 'productDetail' con el producto específico
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    next(error);
  }
});

router.post('/', (req, res, next) => {
  try {
    const newProduct = req.body;
    const createdProduct = productManager.addProduct(newProduct);
    io.emit('actualizarLista', productManager.getProducts());
    res.status(201).json(createdProduct);
  
  } catch (error) {
    next(error);
  }
});

router.put('/:pid', (req, res, next) => {
  try {
    const productId = parseInt(req.params.pid);
    const updatedProduct = req.body;
    const product = productManager.updateProduct(productId, updatedProduct);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    next(error);
  }
});

router.delete('/:pid', (req, res, next) => {
  try {
    const productId = parseInt(req.params.pid);
    const deletedProduct = productManager.deleteProduct(productId);

    if (deletedProduct) {
      res.json(deletedProduct);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = { router, productManager };
