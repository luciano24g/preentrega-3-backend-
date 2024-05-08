import UserModel from '../persistencia/user.models.js';
import { createHash } from '../utils.js';

export default class SessionController {
    async register(req, res) {
        // Enviar respuesta de éxito
        res.send({ status: 'success', message: 'Usuario registrado' });
    }

    async failRegister(req, res) {
        console.log('Fallo el registro');
        res.send({ error: 'Fallo en el registro' });
    }

    async login(req, res) {
        // Si llega aquí, significa que la autenticación fue exitosa
        req.session.user = {
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            age: req.user.age,
            email: req.user.email,
        };
        
        // Respondemos con éxito y enviamos los datos del usuario
        res.send({ status: 'success', payload: req.user });
    }

    failLogin(req, res) {
        res.status(401).send({ error: 'Fallo en el inicio de sesión' });
    }

    async github(req, res) {}

    async githubCallback(req, res) {
        req.session.user = req.user;
        res.redirect('/');
    }

    async logout(req, res) {
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).send({
                    status: 'error',
                    error: 'No se pudo cerrar la sesión',
                });
            }
            res.redirect('/login');
        });
    }

    

    async restartPassword(req, res) {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send({
                status: 'error',
                message: 'Datos incorrectos',
            });
        }
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).send({
                status: 'error',
                message: 'El usuario no existe',
            });
        }
        const newHashPassword = createHash(password);

        await UserModel.updateOne({ _id: user._id }, { $set: { password: newHashPassword } });
        res.send({
            status: 'success',
            message: 'Contraseña restaurada',
        });
    }
}
