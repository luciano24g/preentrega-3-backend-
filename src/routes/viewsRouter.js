import express from 'express';
import ViewController from '../controller/viewController.js';

const router = express.Router();
const viewController = new ViewController();

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

// Rutas de acceso público
router.get('/register', publicAccess, viewController.getRegister);
router.get('/login', publicAccess, viewController.getLogin);
router.get('/resetPassword', publicAccess, viewController.getResetPassword);

// Rutas de acceso privado
router.get('/', privateAccess, viewController.getHome);
router.get('/logout', privateAccess, viewController.logout); // Corregir aquí
router.get('/chat', privateAccess, viewController.getChat);
router.get('/cart', privateAccess, viewController.getCart);
router.get('/products', privateAccess, viewController.getProducts.bind(viewController));

export default router;
