const express = require('express');
const router = express.Router();
const CartManagerMongo = require('../dao/CartManagerMongo.js');

const cartManagerMongo = new CartManagerMongo(); 

router.get('/', async (req,res)=>{

    const carts = await cartManagerMongo.getCarts();

    res.send({
        status:"succes",
        carritos: carts
    })
})

router.get('/:cid', async (req, res) => {
    const cid = req.params.cid;

    res.send({
        status: "success",
        msg: `Ruta GET ID CART con ID: ${cid}`
    });
});

router.post('/', async (req, res) => {
    try {
        await cartManagerMongo.createCart();
        res.json({
            status: "success",
            message: "Carrito creado con éxito",
            cartId: cart._id
        });
    } catch (error) {
        console.error('Error al crear el carrito:', error);
        res.status(500).json({
            status: "error",
            message: "Error al crear el carrito. Detalles en el registro del servidor."
        });
    }
});


router.post('/:cid/product/:pid', async (req, res) => {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const quantity = req.body.quantity;

    try {
        const cart = await cartManagerMongo.addProductInCart(cid, pid, quantity);
        res.status(200).json({
            status: "success",
            message: "Producto agregado al carrito con éxito",
            cart: cart
        });
    } catch (error) {
        console.error('Error al agregar producto al carrito:', error.message);
        res.status(500).json({
            status: "error",
            message: "Error al agregar producto al carrito. Detalles en el registro del servidor."
        });
    }
});



router.put('/:cid', async (req,res)=>{
    const cid = req.params.cid;
    res.send({
        status:"succes",
        msg:`Ruta PUT de CART con ID: ${cid}`
    })
})
router.delete('/:cid', async (req,res)=>{
    const cid = req.params.cid;
    res.send({
        status:"succes",
        msg:`Ruta DELETE de CART con ID: ${cid}`
    })
})

module.exports = router;
