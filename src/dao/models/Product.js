const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const productSchema = new mongoose.Schema({
    tipo: {
        type: String,
        require: true
    },
    nombre: {
        type: String,
        require: true
    },
    precio: {
        type: Number,
        require: true
    },
    descripcion: {
        type: String,
        require: true
    },
    stock: {
        type: Number,
        require: true
    }
});

productSchema.plugin(mongoosePaginate);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
