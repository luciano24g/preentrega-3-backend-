import ProductManagerMongo from '../managers/productManagerMongo.js';
import { cartManagerMongoInstance } from '../managers/CartManagerMongo.js';

export default class ViewController {
    constructor() {
        this.productManager = new ProductManagerMongo();
    }

    // Método para renderizar la página de inicio
    async getHome(req, res) {
        if (req.isAuthenticated()) {
            res.render('home', { user: req.user });
        } else {
            res.redirect('/login');
        }
    }

    // Método para cerrar sesión
    logout(req, res) {
        req.session.destroy((err) => {
            if (err) {
                console.error('Error al cerrar sesión:', err);
                res.status(500).send('Error al cerrar sesión.');
            } else {
                res.redirect('/login');
            }
        });
    }

    // Método para mostrar la página de registro
    getRegister(req, res) {
        res.render('register');
    }

    // Método para mostrar la página de inicio de sesión
    getLogin(req, res) {
        res.render('login');
    }

    // Método para mostrar la página de restablecimiento de contraseña
    getResetPassword(req, res) {
        res.render('resetPassword');
    }

    // Método para mostrar la página de chat
    getChat(req, res) {
        if (req.isAuthenticated()) {
            res.render('chat');
        } else {
            res.redirect('/login');
        }
    }

    // Método para mostrar el carrito del usuario
    async getCart(req, res) {
        try {
            const user = req.user;
            if (!user) {
                return res.status(401).send("Usuario no autenticado");
            }

            const cart = await cartManagerMongoInstance.getCartByUser(user._id);
            if (!cart) {
                return res.status(404).send("El usuario no tiene un carrito asociado");
            }

            res.render('cart', { cart });
        } catch (error) {
            console.error('Error al obtener el carrito del usuario:', error);
            res.status(500).send("Error al obtener el carrito del usuario");
        }
    }

    // Método para mostrar los productos disponibles
    async getProducts(req, res) {
        try {
            const { tipo, page = 1, limit = 10, sort } = req.query || {};

            let productsData;

            if (tipo && tipo !== 'all') {
                productsData = await this.productManager.getProducts({ tipo, page, limit, sort });
            } else {
                productsData = await this.productManager.getProducts({ limit, page, sort });
            }

            const predefinedTipos = ['gorra', 'remera', 'zapatillas', 'buzo'];

            res.render('products', {
                products: productsData.payload,
                currentPage: parseInt(page),
                totalPages: productsData.totalPages,
                tipos: predefinedTipos,
                selectedTipo: tipo,
            });
        } catch (error) {
            console.error('Error al cargar productos:', error.message);
            res.status(500).send('Error al cargar los productos.');
        }
    }
}
