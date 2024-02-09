import { Router } from 'express';
import * as CartController from '../controller/CartController.js';

const router = Router();

router.get('/', CartController.getCarts);
router.get('/:cid', CartController.getCartByID); // Cambia getCartById a getCartByID
router.post('/', CartController.createCart);
router.post('/:cid/product/:pid', CartController.addProductToCart);
router.put('/:cid', CartController.updateCart);
router.delete('/:cid', CartController.deleteCart);

export default router;
