import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const cartSchema = new Schema({
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

const Cart = model("Cart", cartSchema);
export default Cart;
