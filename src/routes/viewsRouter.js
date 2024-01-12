const express = require('express');
const router = express.Router();
const ProductManagerMongo = require('../dao/ProductManagerMongo.js');
const productManagerMongo = new ProductManagerMongo();

// Middleware para verificar el acceso público
const publicAccess = (req, res, next) => {
    if (req.session.user) {
        return res.redirect('/');
    }
    next();
}

// Middleware para verificar el acceso privado
const privateAccess = (req, res, next) => {
  if (!req.session.user) {
      return res.redirect('/login');
  }
  next();
}

// Ruta principal
router.get('/', privateAccess, (req, res) => {
    res.render('home', { user: req.session.user });  // Asegúrate de tener configurada esta vista en tu motor de plantillas
});

router.get('/register', publicAccess, (req, res) => {
    res.render('register');
});

router.get('/login', publicAccess, (req, res) => {
    res.render('login');
});

// Vista de chat
router.get('/chat', privateAccess, (req, res) => {
    res.render('chat');
});

// Vista del carrito
router.get('/cart', privateAccess, (req, res) => {
    res.render('cart');
});

// viewsRouter.js
router.get('/products', privateAccess, async (req, res) => {
  try {
    const { tipo, page = 1, limit = 10, sort } = req.query || {};
    console.log('Tipo:', tipo);
    console.log('Page:', page);
    console.log('Limit:', limit);
    console.log('Sort:', sort);

    let productsData;

    if (tipo && tipo !== 'all') {
      // Si hay un tipo especificado, obtener productos solo de ese tipo
      productsData = await productManagerMongo.getProducts({ tipo, page, limit, sort });
    } else {
      // Si no hay tipo o es 'all', obtener todos los productos
      productsData = await productManagerMongo.getProducts({ limit, page, sort });
    }

    // Tipos predefinidos que deseas mostrar en el filtro
    const predefinedTipos = ['gorra', 'remera', 'zapatillas', 'buzo'];

    res.render('products', {
      products: productsData.payload,
      currentPage: parseInt(page),
      totalPages: productsData.totalPages,
      tipos: predefinedTipos,
      selectedTipo: tipo, // Pasa el tipo seleccionado para resaltarlo en la plantilla si es necesario
    });
  } catch (error) {
    console.error('Error al cargar productos:', error.message);
    res.status(500).send('Error al cargar los productos.');
  }
});


module.exports = router;
