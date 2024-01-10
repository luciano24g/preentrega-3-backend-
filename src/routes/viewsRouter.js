const express = require('express');
const router = express.Router();
const ProductManagerMongo = require('../dao/ProductManagerMongo.js');
const productManagerMongo = new ProductManagerMongo();


 // Asegúrate de tener la ruta correcta

const Message = require('../dao/models/Message');

router.get('/', (req, res) => {
  res.render('home');
});


// Ruta para renderizar la vista principal
router.get('/products', async (req, res) => {
  try {
    const { page, limit, sort, query } = req.query; // Obtener los parámetros de consulta
    const productsData = await productManagerMongo.getProducts({ page, limit, sort, query });
    res.render('products', { products: productsData.payload });
  } catch (error) {
    console.error('Error al cargar los productos:', error.message);
    res.status(500).send('Error al cargar los productos.');
  }
});
// Ruta para renderizar la vista del chat
router.get('/chat', (req, res) => {
  res.render('chat'); // Asegúrate de tener la vista 'chat' configurada correctamente.
});



router.get('/cart', (req, res) => {
  // Como el carrito está manejado en el lado del cliente, simplemente renderizamos la vista del carrito
  res.render('cart');
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
    const { tipo } = req.params; // Obtener el tipo de producto desde los parámetros de la ruta
    const { page, limit, sort, query } = req.query; // Obtener los parámetros de consulta
    const productsData = await productManagerMongo.getProductsByTypeAndPage(tipo, page, limit, sort);
    res.render('products', { products: productsData.docs });
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

// Ruta para obtener productos ordenados por precio de forma ascendente
router.get('/products/sorted/asc', async (req, res) => {
  try {
    const { page, limit, tipo } = req.query; // Puedes incluir tipo si también quieres filtrar por tipo
    const productsData = await productManagerMongo.getProducts({ page, limit, sort: 'asc', query: tipo });
    res.render('products', { products: productsData.docs });
  } catch (error) {
    console.error('Error al cargar productos ordenados ascendentemente:', error.message);
    res.status(500).send('Error al cargar los productos.');
  }
});

// Ruta para obtener productos ordenados por precio de forma descendente
router.get('/products/sorted/desc', async (req, res) => {
  try {
    const { page, limit, tipo } = req.query; // Puedes incluir tipo si también quieres filtrar por tipo
    const productsData = await productManagerMongo.getProducts({ page, limit, sort: 'desc', query: tipo });
    res.render('products', { products: productsData.docs });
  } catch (error) {
    console.error('Error al cargar productos ordenados descendentemente:', error.message);
    res.status(500).send('Error al cargar los productos.');
  }
});

router.post('/sendMessage', async (req, res) => {
  try {
    const { user, message } = req.body;
    const newMessage = await messageManager.create({ user, message });
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});





module.exports = router;
