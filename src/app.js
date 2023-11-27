import express from 'express';
import bodyParser from 'body-parser';
import productsRouter from './productsRouter.js';
import cartsRouter from './cartsRouter.js';

const app = express();
const port = 8080;

app.use(bodyParser.json()); // Middleware para manejar datos JSON

// Rutas para el manejo de productos
app.use('/api/products', productsRouter);

// Rutas para el manejo de carritos
app.use('/api/carts', cartsRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
