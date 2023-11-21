import express from 'express';
import ProductManager from './ProductManager.js';

const app = express();
const port = 3000;

const productManager = new ProductManager(); // No necesitas pasar la ruta aquí, ya que se establece en el constructor

app.get('/products', async (req, res) => {
  try {
    const limit = req.query.limit;
    const products = productManager.getProducts(); // Cambié la función a getProducts
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/products/:pid', async (req, res) => {
  try {
    const productId = parseInt(req.params.pid);
    const product = productManager.getProductById(productId); // Cambié la función a getProductById

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
