const express = require('express');
const router = express.Router();
const passport = require('passport'); // Agrega esta línea
const ProductManagerMongo = require('../dao/ProductManagerMongo.js');
const productManagerMongo = new ProductManagerMongo();
const CartManagerMongo = require('../dao/CartManagerMongo.js');
const cartManagerMongo = new CartManagerMongo();

// Middleware para verificar el acceso público
const publicAccess = (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    next();
}

// Middleware para verificar el acceso privado
const privateAccess = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/login');
    }
    next();
}

// Ruta principal
router.get('/', privateAccess, (req, res) => {
    res.render('home', { user: req.user });  
});

router.get('/logout', (req, res) => {
  // Destruir la sesión
  req.session.destroy((err) => {
      if (err) {
          console.error('Error al cerrar sesión:', err);
          res.status(500).send('Error al cerrar sesión.');
      } else {
          // Redirigir a la página de inicio de sesión u otra página
          res.redirect('/login');
      }
  });
});


router.get('/register', publicAccess, (req, res) => {
    res.render('register');
});

router.get('/login', publicAccess, (req, res) => {
    res.render('login');
});
router.get('/resetPassword', publicAccess , (req, res) => {
  res.render('resetPassword');
})


// Vista de chat
router.get('/chat', privateAccess, (req, res) => {
    res.render('chat');
});

router.get('/cart/:cartNumber', privateAccess, async (req, res) => {
  try {
      // Obtén el número de carrito desde los parámetros de la ruta
      const cartNumber = req.params.cartNumber;

      // Obtén el carrito utilizando el número de carrito y utiliza populate para cargar la información del producto
      const cart = await cartManagerMongo.getCartByCartNumber(cartNumber);

      console.log('Datos del carrito:', cart); // Agrega este log para verificar los datos

      if (!cart) {
          // Maneja la situación si el carrito no existe (puedes redirigir o mostrar un mensaje)
          return res.redirect('/products');
      }

      // Renderiza la vista 'cart' con el carrito específico
      res.render('cart', { cart });
  } catch (error) {
      console.error('Error al obtener datos del carrito:', error.message);
      res.status(500).send('Error al obtener datos del carrito.');
  }
});



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
