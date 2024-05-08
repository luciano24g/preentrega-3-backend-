// productRouter.js

import express from 'express';
import * as ProductController from '../controller/ProductController.js';

const router = express.Router();

router.get('/', ProductController.getProducts);
router.get('/:id', ProductController.getProductById);
router.post('/', ProductController.createProduct);
router.put('/:id', ProductController.updateProduct);
router.delete('/:id', ProductController.deleteProduct);

export default router;
