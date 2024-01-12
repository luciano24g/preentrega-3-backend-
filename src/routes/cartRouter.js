const express = require('express');
const router = express.Router();
const CartManagerMongo = require('../dao/CartManagerMongo'); // Asegúrate de importar la clase correctamente

const cartManagerMongo = new CartManagerMongo();

router.get('/', async (req, res) => {
    try {
        const carts = await cartManagerMongo.getCarts();
        res.send({
            status: "success",
            carritos: carts
        });
    } catch (error) {
        console.error('Error al obtener carritos:', error.message);
        res.status(500).send('Error al obtener los carritos.');
    }
});

router.get('/:cid', async (req, res) => {
    const cid = req.params.cid;

    res.send({
        status: "success",
        msg: `Ruta GET ID CART con ID: ${cid}`
    });
});

router.post('/', async (req, res) => {
    try {
        const cart = await cartManagerMongo.createCart();
        res.send({
            status: "success",
            msg: cart
        });
    } catch (error) {
        console.error('Error al crear carrito:', error.message);
        res.status(500).send('Error al crear el carrito.');
    }
});

router.post('/:cid/product/:pid', async (req, res) => {
    try {
        const cid = req.params.cid;
        const pid = req.params.pid;
        const quantity = req.body.quantity;

        const cart = await cartManagerMongo.addProductInCart(cid, pid, quantity);

        res.send({
            status: "success",
            msg: cart
        });
    } catch (error) {
        console.error('Error al agregar producto al carrito:', error.message);
        res.status(500).send('Error al agregar el producto al carrito.');
    }
});

router.put('/:cid', async (req, res) => {
    const cid = req.params.cid;

    res.send({
        status: "success",
        msg: `Ruta PUT de CART con ID: ${cid}`
    });
});

router.delete('/:cid', async (req, res) => {
    const cid = req.params.cid;

    res.send({
        status: "success",
        msg: `Ruta DELETE de CART con ID: ${cid}`
    });
});

module.exports = router;
