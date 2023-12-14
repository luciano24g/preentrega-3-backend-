// routes/viewsRouter.js
const express = require('express');
const path = require('path');
const router = express.Router();

// Ruta para renderizar la vista principal
router.get('/', (req, res) => {
  res.render('home');
});

// Ruta para renderizar la vista de productos en tiempo real
router.get('/realTimeProducts', (req, res) => {
  res.render('realTimeProducts');
});

module.exports = router;
