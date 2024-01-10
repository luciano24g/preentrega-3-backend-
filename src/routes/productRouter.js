const express = require('express');
const mongoose = require('mongoose');
const objectId = new mongoose.Types.ObjectId();
const Product = require('../dao/models/Product.js');


const ProductManagerMongo = require('../dao/ProductManagerMongo');

const router = express.Router();
const productManager = new ProductManagerMongo();

// Middleware para analizar el cuerpo de solicitudes JSON
router.use(express.json());

// Rutas

router.get('/', async (req, res, next) => {
  try {
    const { limit = 10, page = 1, sort, tipo } = req.query;
    
    const query = tipo ? { tipo } : null;

    const result = await productManager.getProducts({ limit, page, sort, query });

    res.json(result);

  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const newProduct = req.body;
    const createdProduct = await productManager.addProduct(newProduct);
    res.status(201).json(createdProduct);
  } catch (error) {
    next(error);
  }
});

router.put('/:pid', async (req, res, next) => {
  try {
    const productId = parseInt(req.params.pid);
    const updatedProduct = req.body;
    const product = await productManager.updateProduct(productId, updatedProduct); // Asumiendo que updateProduct es un método asíncrono

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const productId = req.params.id;
    const result = await Product.findByIdAndDelete(productId);
    if (!result) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    next(error);
  }
});
module.exports = { router, productManager };
