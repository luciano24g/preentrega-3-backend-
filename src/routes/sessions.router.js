const { Router } = require("express");
const userModel = require("../dao/models/user.models.js");
const CartManagerMongo = require("../dao/CartManagerMongo.js");

const router = Router();





router.post("/register", async (req,res)=>{
    const { first_name, last_name, email, age, password } = req.body;
 
    const exists = await userModel.findOne({email});
 
    if(exists){
     return res.status(400)
     .send({
         status:"error",
         error:"El usuario ya existe"
     })
    }
    const user = {
         first_name,
         last_name,
         email,
         age,
         password
     }
 
     let result = await userModel.create(user);
     res.send({
         status:"success",
         message:"Usuario registrado"
     })
 })
 router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email, password });

    if (!user) {
        return res.status(400).send({
            status: "error",
            error: "Datos incorrectos"
        });
    }

    // Eliminar las líneas relacionadas con el carrito
    // const cartManager = new CartManagerMongo();
    // const cart = await cartManager.createCart();
    // user.cart = cart._id;
    // await user.save();

    // Asociar el cartId con el usuario en la sesión
    req.session.user = {
        full_name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        age: user.age,
        // cartId: cart._id  // Eliminar esta línea
    };

    // Verificar si req.session.user está definido antes de acceder a cartId
    if (req.session.user) {
        // Enviar el cartId en la respuesta al cliente
        // res.cookie('cartId', cart._id); // Eliminar esta línea
        res.send({
            status: "success",
            payload: { ...req.session.user },
            message: "Mi primer Login!!"
        });
    } else {
        // Manejar la situación donde req.session.user o cartId son undefined
        res.status(500).send({
            status: "error",
            error: "No se pudo obtener la información del usuario."
        });
    }
});


 
 router.get('/logout', (req, res) => {
    // Destruir la sesión
    req.session.destroy((err) => {
        if (err) {
            console.error('Error al cerrar sesión:', err);
            res.status(500).send('Error al cerrar sesión.');
        } else {
            // Redirigir a la página de inicio de sesión u otra página
            res.redirect('/login');
        }
    });
});

module.exports = router;
