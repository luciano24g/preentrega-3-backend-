const express = require('express');
const router = express.Router();
const ProductManagerMongo = require('../dao/ProductManagerMongo.js');
const productManagerMongo = new ProductManagerMongo();
const cartRouter = require('../public/js/cartRouter.js'); // Asegúrate de tener la ruta correcta

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



router.post('/cart/add', (req, res) => {
  try {
      const { productId, productName, quantity } = req.body;

      // Verificar si el producto ya está en el carrito
      const existingProduct = cartProducts.find(product => product.productId === productId);

      if (existingProduct) {
          existingProduct.quantity += quantity;
      } else {
          cartProducts.push({
              productId,
              productName,
              quantity
          });
      }

      res.json({ success: true, message: 'Producto agregado al carrito.' });

  } catch (error) {
      console.error('Error al agregar producto al carrito:', error.message);
      res.status(500).json({ success: false, message: 'Error al agregar producto al carrito.' });
  }
});


// Utiliza cartRouter

router.get('/cart', async (req, res) => {
  try {
    const userId = req.userId;  // Asume que ya tienes el ID del usuario en el objeto de solicitud

    const cart = await Cart.findOne({ userId }).populate('products.productId');  // Esto trae los detalles del producto

    res.render('cart', { cartProducts: cart.products });

  } catch (error) {
    console.error('Error al cargar la vista del carrito:', error.message);
    res.render('cart', { errorMessage: 'Error al cargar la vista del carrito.' });
  }
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
      const products = await productManagerMongo.getProductsByTipo(tipo);
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

// Ruta para obtener productos ordenados de forma ascendente
router.get('/products/sorted/asc/:page', async (req, res) => {
  try {
    const page = parseInt(req.params.page);
    const products = await productManagerMongo.getProductsSortedByPrice('asc', page);
    res.render('products', { products });
  } catch (error) {
    console.error('Error al cargar productos ordenados ascendentemente:', error.message);
    res.status(500).send('Error al cargar los productos.');
  }
});

// Ruta para obtener productos ordenados de forma descendente
router.get('/products/sorted/desc/:page', async (req, res) => {
  try {
    const page = parseInt(req.params.page);
    const products = await productManagerMongo.getProductsSortedByPrice('desc', page);
    res.render('products', { products });
  } catch (error) {
    console.error('Error al cargar productos ordenados descendentemente:', error.message);
    res.status(500).send('Error al cargar los productos.');
  }
});

// ... (Otras rutas que ya tenías o que quieras agregar)

module.exports = router;
