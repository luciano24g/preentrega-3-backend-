const express = require('express');
const router = express.Router();
const ProductManagerMongo = require('../dao/ProductManagerMongo.js');
const productManagerMongo = new ProductManagerMongo();

// Ruta principal
router.get('/', (req, res) => {
  res.render('home');
});

// Vista de productos
router.get('/', (req, res) => {
  res.render('login');  // Asegúrate de tener configurada esta vista en tu motor de plantillas
});

// Vista de chat
router.get('/chat', (req, res) => {
  res.render('chat');
});

// Vista del carrito
router.get('/cart', (req, res) => {
  res.render('cart');
});

// Vista de productos por tipo
router.get('/products/tipo/:tipo', async (req, res) => {
  try {
    const { tipo } = req.params;
    const { page, limit, sort, query } = req.query;
    const productsData = await productManagerMongo.getProductsByTypeAndPage(tipo, page, limit, sort);
    res.render('products', { products: productsData.docs });
  } catch (error) {
    console.error('Error al cargar productos por tipo:', error.message);
    res.status(500).send('Error al cargar los productos.');
  }
});

// Vista de productos paginados
router.get('/products/page/:page', async (req, res) => {
  try {
    const page = parseInt(req.params.page);
    const products = await productManagerMongo.getProductsByPage(page);
    res.render('products', { products });
  } catch (error) {
    console.error('Error al cargar productos paginados:', error.message);
    res.status(500).send('Error al cargar los productos.');
  }
});

// Vista de productos ordenados ascendente y descendente
router.get('/products/sorted/:order', async (req, res) => {
  try {
    const { order } = req.params;
    const { page, limit, tipo } = req.query;
    const sort = order === 'asc' ? 'asc' : 'desc';
    const productsData = await productManagerMongo.getProducts({ page, limit, sort, query: tipo });
    res.render('products', { products: productsData.docs });
  } catch (error) {
    console.error(`Error al cargar productos ordenados ${req.params.order}endente:`, error.message);
    res.status(500).send('Error al cargar los productos.');
  }
});

module.exports = router;
