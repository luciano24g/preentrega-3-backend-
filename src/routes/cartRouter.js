import { Router } from 'express';
import * as cartController from '../controller/CartController.js'; // Cambia CartController a cartController.js

const router = Router();

router.get('/', cartController.getCarts);
router.get('/:cid', cartController.getCartByID); // Cambia getCartById a getCartByID y CartController a cartController
router.post('/', cartController.createCart);
router.post('/:cid/product/:pid', cartController.addProductToCart);
router.put('/:cid', cartController.updateCart);
router.delete('/:cid', cartController.deleteCart);

export default router;
