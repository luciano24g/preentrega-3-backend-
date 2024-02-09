import { Router } from 'express';
import * as MessageController from '../controller/MessageController.js';

const router = Router();

router.get('/', MessageController.getAllMessages);
router.get('/:id', MessageController.getMessageById);
router.post('/', MessageController.createMessage);
router.put('/:id', MessageController.updateMessage);
router.delete('/:id', MessageController.deleteMessage);

export default router;
