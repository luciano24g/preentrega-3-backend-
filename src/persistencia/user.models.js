import mongoose from 'mongoose';

const collection = "Users";

const schema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    age: Number,
    password: String,
    role: { type: String, enum: ['admin', 'user', 'premium'], default: 'user' },
    cart: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart' } // Referencia al carrito del usuario
});

const userModel = mongoose.model(collection, schema);

export default userModel;
