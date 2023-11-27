import express from 'express';
import CartManager from './cartManager.js';

const router = express.Router();
const cartManager = new CartManager();

router.post('/', (req, res, next) => {
  try {
    const newCart = req.body;
    const createdCart = cartManager.createCart(newCart);
    res.status(201).json(createdCart);
  } catch (error) {
    next(error);
  }
});

router.get('/:cid', (req, res, next) => {
  try {
    const cartId = parseInt(req.params.cid);
    const cart = cartManager.getCartById(cartId);

    if (cart) {
      res.json(cart);
    } else {
      res.status(404).json({ error: 'Cart not found' });
    }
  } catch (error) {
    next(error);
  }
});

router.post('/:cid/product/:pid', (req, res, next) => {
  try {
    const cartId = parseInt(req.params.cid);
    const productId = parseInt(req.params.pid);
    const quantity = req.body.quantity;

    const updatedCart = cartManager.addProductToCart(cartId, productId, quantity);

    if (updatedCart) {
      res.json(updatedCart);
    } else {
      res.status(404).json({ error: 'Cart not found' });
    }
  } catch (error) {
    next(error);
  }
});

export default router;
