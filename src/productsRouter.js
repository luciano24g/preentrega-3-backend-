import express from 'express';
import ProductManager from './productManager.js';

const router = express.Router();
const productManager = new ProductManager();

router.get('/', (req, res, next) => {
  try {
    const limit = req.query.limit;
    const products = productManager.getProducts(limit);
    res.json(products);
  } catch (error) {
    next(error);
  }
});

router.get('/:pid', (req, res, next) => {
  try {
    const productId = parseInt(req.params.pid);
    const product = productManager.getProductById(productId);

    if (product) {
      res.json(product);
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

export default router;
