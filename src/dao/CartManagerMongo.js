const Cart = require('./models/Cart.js');
const Product = require('./models/Product.js');

class CartManagerMongo {
    getCarts = async () => {
        const carts = await Cart.find();
        return carts;
    }

    getCartByID = async (cid) => {
        const cart = await Cart.find({ _id: cid });
        return cart;
    }

    createCart = async () => {
        const cart = await Cart.create();
        return cart;
    }

    addProductInCart = async (cid, pid, quantity = 1) => {
        const cart = await Cart.findOne({ _id: cid });
        if (!cart) {
            return {
                status: "error",
                msg: `El carrito con el id ${cid} no existe`
            }
        }

        const product = await Product.findOne({ _id: pid });
        if (!product) {
            return {
                status: "error",
                msg: `El producto con el id ${pid} no existe`
            }
        }

        let productsInCart = cart.products; // Corregir a "cart.products" en lugar de "cart.product"

        const indexProduct = productsInCart.findIndex((product) => product.product == pid);

        if (indexProduct == -1) {
            const newProduct = {
                product: pid,
                quantity: quantity
            }
            cart.products.push(newProduct);
        } else {
            cart.products[indexProduct].quantity += quantity;
        }

        await cart.save();

        return cart;
    }
}

module.exports = CartManagerMongo;
