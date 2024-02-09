// uploadProducts.js
const dbConnection = require('../../db.js');  // Ajusta la ruta según la ubicación real



const Product = require('./Product.js');  // Asegúrate de que la ruta sea correcta
const mongoose = require('mongoose');  // No es necesario si ya tienes la conexión

async function uploadProducts() {
    try {
        // Leer el archivo JSON
        const data = await fs.readFile('./products.json', 'utf8');
        const products = JSON.parse(data);

        // Insertar productos en la base de datos
        await Product.insertMany(products);

        console.log('Productos agregados con éxito desde el archivo JSON');
    } catch (error) {
        console.error('Error al agregar productos:', error.message);
    } finally {
        // Cerrar la conexión después de completar la operación
        await mongoose.disconnect();
        console.log('Desconectado de MongoDB');
    }
}

// Ejecutar la función para cargar productos
uploadProducts()
    .then(() => {
        console.log('Proceso completado');
    })
    .catch(error => {
        console.error('Error durante el proceso:', error.message);
    });
