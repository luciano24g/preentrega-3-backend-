import express from 'express';
import passport from 'passport';
import SessionController from '../controller/sessionController.js';

const router = express.Router();
const sessionController = new SessionController();

router.post('/register', passport.authenticate('register', { failureRedirect: '/api/sessions/failregister' }), sessionController.register);

router.get('/failregister', sessionController.failRegister);

router.post('/login', passport.authenticate('login', { failureRedirect: '/api/session/faillogin' }), sessionController.login);

router.get('/faillogin', sessionController.failLogin);

router.get('/github', passport.authenticate('github', { scope: ['user:email'] }), sessionController.github);

router.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/login' }), sessionController.githubCallback);

router.get('/logout', sessionController.logout);

router.post('/restartPassword', sessionController.restartPassword);

export default router;
