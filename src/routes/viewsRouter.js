const express = require('express');
const path = require('path');
const router = express.Router();
const ProductManager = require('../productManager');
const productManager = new ProductManager();

// Ruta para renderizar la vista principal
router.get('/', (req, res) => {
  const limit = req.query.limit;
  const products = productManager.getProducts(limit);
  console.log('Products in viewsRouter:', products); // Agrega este console.log
  res.render('home', { products });
});

// Ruta para renderizar la vista de productos en tiempo real
router.get('/realTimeProducts', (req, res) => {
  res.render('realTimeProducts');
});

module.exports = router;