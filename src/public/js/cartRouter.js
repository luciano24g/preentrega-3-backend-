// routes/cartRouter.js

const express = require('express');
const router = express.Router();
const Cart = require('../../dao/models/Cart');

// Agregar producto al carrito
router.post('/add', async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, products: [] });
    }

    // Verifica si el producto ya está en el carrito
    const existingProduct = cart.products.find(p => p.productId.toString() === productId);
    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.products.push({ productId, quantity });
    }

    await cart.save();
    res.json({ success: true, message: 'Producto agregado al carrito.' });

  } catch (error) {
    console.error('Error al agregar producto al carrito:', error.message);
    res.status(500).json({ success: false, message: 'Error al agregar producto al carrito.' });
  }
});

module.exports = router;
