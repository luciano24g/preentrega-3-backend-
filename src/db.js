// src/db.js
const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://admin:admin@cluster0.53fbynl.mongodb.net/ecommerce';

mongoose.connect(MONGODB_URI)
    .then(() => console.log('Conexión a MongoDB exitosa'))
    .catch(error => console.error('Error al conectar a MongoDB:', error));

module.exports = mongoose.connection;  // Exporta la conexión
