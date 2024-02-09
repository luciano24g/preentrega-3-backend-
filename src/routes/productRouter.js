import { Router } from 'express';
import * as ProductController from '../controller/ProductController.js';

const router = Router();

router.get('/', ProductController.getProducts);
router.post('/', ProductController.createProduct);
router.post('/:cartId/add-product/:productId', ProductController.addProductToCart); // Asegúrate de que addProductToCart esté importado y definido correctamente en ProductController.js
router.put('/:pid', ProductController.updateProduct);
router.delete('/:id', ProductController.deleteProduct);

export default router;
