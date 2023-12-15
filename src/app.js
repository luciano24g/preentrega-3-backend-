const express = require('express');
const { engine } = require('express-handlebars');
const http = require('http');
const path = require('path');
const viewsRouter = require('./routes/viewsRouter');
const { router: productsRouter, productManager } = require('./routes/productRouter');
const socketIo = require('socket.io');

const PORT = 8080;
let messages = [];
const app = express();
const httpServer = http.createServer(app);

// Configuración de Handlebars
app.engine('.handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Agrega el enrutador de productos bajo '/api'
app.use('/api', productsRouter);
app.use('/', viewsRouter);
// Configuración de Socket.IO
const io = socketIo(httpServer);
app.set('socketio', io);

io.on('connection', (socket) => {
  console.log('New client connected');
  const productList = productManager.getProducts();
  socket.emit('actualizarLista', productList);

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });

  // Lógica del cliente Socket.IO para actualizar productos
  socket.on('update-products', () => {
    // Enviar la lista actualizada de productos a todos los clientes
    const updatedProductList = productManager.getProducts();
    io.emit('products-update', updatedProductList);
  });
});
// Ruta POST
app.post('/productRouter', (req, res) => {
  // Obtén 'io' del app
  const io = req.app.get('socketio');

  const updatedProductList = productManager.getProducts();
  io.emit('products-update', updatedProductList);

  res.status(200).send('Solicitud procesada con éxito');
});

// Iniciar el servidor HTTP
httpServer.listen(PORT, () => {
  console.log(`Servidor funcionando en el puerto: ${PORT}`);
});
