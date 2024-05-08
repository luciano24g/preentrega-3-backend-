import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const cartSchema = mongoose.Schema  ({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User", // Reemplaza "User" con el nombre de tu modelo de usuario si es diferente
        required: true
    },
    products: [
        {
            product: {
                type: Schema.Types.ObjectId,
                ref: "Product",
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

const CartModel = mongoose.model('Cart', cartSchema);

export default CartModel;