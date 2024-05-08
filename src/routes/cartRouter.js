import { Router } from 'express';
import * as CartController from '../controller/CartController.js';

const router = Router();

router.get('/', CartController.getCarts);
router.get('/:cid', CartController.getCartById);
router.post('/', CartController.addCart);
router.post('/product/:pid', CartController.addProductById);
router.delete('/:cid/product', CartController.deleteAllProductsFromCart);
router.delete('/:cid', CartController.deleteCart); // Ruta DELETE para eliminar un carrito
router.put('/:cid', CartController.updateCart);
router.put('/:cid/product/:pid', CartController.updateProductQuantity);
router.post('/:cid/purchase', CartController.purchase);

export default router;
