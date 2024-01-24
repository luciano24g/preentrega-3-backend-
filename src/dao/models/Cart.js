const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",  // Usar "Product" en lugar de "products"
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                default: 1
            }
        }
    ]
});

cartSchema.pre("find", function(){
    this.populate("products.product");
});

const CartModel = mongoose.model("Cart", cartSchema);  // Cambiar el nombre del modelo a "Cart"
module.exports = CartModel;
