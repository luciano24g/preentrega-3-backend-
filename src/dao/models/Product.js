const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const productSchema = new mongoose.Schema({
    tipo: {
        type: String,
        required: true  // Corregir el nombre de la propiedad
    },
    nombre: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true
    }
});

productSchema.plugin(mongoosePaginate);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
