import { cartManagerMongoInstance } from '../managers/CartManagerMongo.js';
import ProductModel from "../persistencia/Product.js";
import CartModel from "../persistencia/Cart.js"; // Importa CartModel
import { v4 as uuidv4 } from 'uuid';
import { ticketsModel } from "../persistencia/Ticket.js";






const cartManager = cartManagerMongoInstance;


export const getCarts = async (req, res) => {
    try {
        // Obtener todos los carritos de la base de datos
        const carts = await cartManager.get(); // Utiliza cartManager
        res.send(carts);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const getCartById = async (req, res) => {
    try {
        // Obtener el carrito por su ID
        const cartId = req.params.cid;
        const cart = await cartManager.findById(cartId); // Utiliza cartManager
        res.send(cart);
    } catch (error) {
        res.status(500).send(error.message);
    }
};


export const updateCart = async (req, res) => {
    try {
        const cartId = req.params.cid;
        const updatedProducts = req.body;
        const cart = await cartManager.findById(cartId); // Utiliza cartManager
        
        // Verificar si el carrito existe
        if (!cart) {
            return res.status(404).send("El carrito no existe");
        }

        // Actualizar los productos del carrito
        cart.products = updatedProducts;
        await cart.save();
        
        res.send("Carrito actualizado correctamente");
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const updateProductQuantity = async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const { quantity } = req.body;
        const cart = await cartManager.findById(cid); // Utiliza cartManager

        // Verificar si el carrito existe
        if (!cart) {
            return res.status(404).send("El carrito no existe");
        }

        // Encontrar el producto en el carrito y actualizar su cantidad
        const productIndex = cart.products.findIndex(product => product._id.toString() === pid);
        if (productIndex !== -1) {
            cart.products[productIndex].quantity = quantity;
            await cart.save();
            res.send("Cantidad del producto actualizada correctamente");
        } else {
            res.status(404).send("El producto no está en el carrito");
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};



export const addCart = async (req, res) => {
    try {
        // Crea un nuevo carrito en la base de datos
        const cartCreated = await cartManager.post(req.user); // Utiliza cartManager
        res.send({ cartId: cartCreated._id });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Agrega un producto al carrito por su ID
export const addProductById = async (req, res) => {
    try {
      // product
      const { pid } = req.params;
      const product = await productService.getProductById(pid)
      const owner = product.product.owner
      const quantity = req.body.quantity
      // user
      const cid = req.user.cart
      const user = req.user


      if (user.role === "admin") {
        return res.status(400).send(`El administrador no puede comprar un producto `)

      }


      if (owner === user.email) {
        return res.status(400).send(`No puedes comprar un producto que tu has publicado.`)
      }

      const result = await cartService.addProductById(cid, pid, quantity);
      res.status(200).send(`Tu producto se ha añadido al carrito correctamente. <br><a href="http://localhost:8080/cart">Click aqui para ir al carrito.</a> <br> <a href="http://localhost:8080/">Click aqui para seguir comprando</a>`);

    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

export const deleteCart = async (req, res) => {
    try {
        const cartId = req.params.cid;

        // Buscar y eliminar el carrito por su ID
        const deletedCart = await cartManager.delete(cartId); // Utiliza cartManager

        if (!deletedCart) {
            return res.status(404).send("El carrito no existe");
        }

        res.send("El carrito ha sido eliminado correctamente");
    } catch (error) {
        res.status(500).send(error.message);
    }
};


export const deleteAllProductsFromCart = async (req, res) => {
    try {
        const cartId = req.params.cid;
        // Encuentra el carrito por su ID
        const cart = await cartManager.findById(cartId); // Utiliza cartManager
        if (!cart) {
            return res.status(404).send("El carrito no existe");
        }

        // Elimina todos los productos del carrito
        cart.products = [];
        await cart.save();

        res.send("Todos los productos fueron eliminados del carrito correctamente");
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const purchase = async (req, res) => {
    try {
        const cartId = req.params.cid;
        let cart = await cartManager.findById(cartId);
        // Si el carrito no existe, crea uno nuevo
        if (!cart) {
            cart = await cartManager.post(req.user); // Crea un nuevo carrito para el usuario actual
        }
        
        // Verifica si se proporcionó productId y quantity en el cuerpo de la solicitud
        const { productId, quantity } = req.body;
        if (!productId || !quantity) {
            return res.status(400).send("ProductId y quantity son necesarios para agregar un producto al carrito");
        }

        // Agrega el producto al carrito
        cart.products.push({ id: productId, quantity: quantity });
        await cart.save();
        
        // Continúa con el procesamiento de la compra
        const ticketProducts = [];
        const rejectedProducts = [];
        for (let i = 0; i < cart.products.length; i++) {
            const cartProduct = cart.products[i];
            const productDB = await ProductModel.findById(cartProduct.id);
            // Comparar la cantidad de ese producto en el carrito con el stock del producto
            if (cartProduct.quantity <= productDB.stock) {
                ticketProducts.push(cartProduct);
            } else {
                rejectedProducts.push(cartProduct);
            }
        }
        console.log("ticketProducts", ticketProducts);
        console.log("rejectedProducts", rejectedProducts);
        const newTicket = {
            code: uuidv4(),
            purchase_datetime: new Date().toLocaleString(),
            amount: 500, // Precio ajustable según necesidades
            purchaser: req.user.email
        };
        const ticketCreated = await ticketsModel.create(newTicket); // Crear un nuevo ticket
        res.send(ticketCreated); // Enviar el ticket creado
    } catch (error) {
        res.status(500).send(error.message);
    }
};
