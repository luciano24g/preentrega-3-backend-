const express = require('express');
const router = express.Router();
const ProductManagerMongo = require('../dao/ProductManagerMongo.js');
const productManagerMongo = new ProductManagerMongo();

// Ruta para renderizar la vista principal
router.get('/', (req, res) => {
  try {
    res.render('home');  // No se pasa el array de productos aquí
  } catch (error) {
    console.error('Error al cargar la vista principal:', error.message);
    res.status(500).send('Error al cargar la vista principal.');
  }
});

// Ruta para renderizar la vista del chat
router.get('/chat', (req, res) => {
  res.render('chat'); // Asegúrate de tener la vista 'chat' configurada correctamente.
});

// Ruta para renderizar la vista del carrito (cart)
router.get('/cart', (req, res) => {
  res.render('cart'); // Asegúrate de tener la vista 'cart' configurada correctamente.
});

// Ruta para mostrar todos los productos
router.get('/products', async (req, res) => {
  try {
    // Redireccionar a la primera página de productos paginados
    res.redirect('/products/page/1');
  } catch (error) {
    console.error('Error al cargar los productos:', error.message);
    res.status(500).send('Error al cargar los productos.');
  }
});

// Ruta para obtener productos por categoría
router.get('/products/tipo/:tipo', async (req, res) => {
  try {
      const tipo = req.params.tipo;
      const products = await productManagerMongo.getProductsByTipo(tipo); // Asume que tienes un método para filtrar por tipo en tu ProductManagerMongo
      res.render('products', { products });
  } catch (error) {
      console.error('Error al cargar productos por tipo:', error.message);
      res.status(500).send('Error al cargar los productos.');
  }
});

// Ruta para obtener productos paginados
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

// Ruta para obtener productos ordenados por precio con paginación
router.get('/products/order/:order/:page', async (req, res) => {
  try {
    const order = req.params.order; // Puede ser 'asc' o 'desc'
    const page = parseInt(req.params.page);
    const products = await productManagerMongo.getProductsSortedByPrice(order, page);
    res.render('products', { products });
  } catch (error) {
    console.error('Error al cargar productos ordenados:', error.message);
    res.status(500).send('Error al cargar los productos.');
  }
});

// ... (Otras rutas que ya tenías o que quieras agregar)

module.exports = router;
