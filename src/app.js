const express = require('express');
const { engine } = require('express-handlebars');
const http = require('http');
const path = require('path');
const viewsRouter = require('./routes/viewsRouter');
const productsRouter = require('./routes/productRouter');
const socketIo = require('socket.io');

const PORT = 8080;
let messages = [];
const app = express();
const httpServer = http.createServer(app);

// Configuración de Handlebars
app.engine('.handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'src/public'), { 'Content-Type': 'text/javascript' }));



// Agrega el enrutador de productos bajo '/api'
app.use('/api', productsRouter);

// Agrega el enrutador de vistas bajo '/'
app.use('/', viewsRouter);

// Configuración de Socket.IO
const io = socketIo(httpServer);
app.set('socketio', io);

io.on('connection', (socket) => {
  console.log('New client connected');
  const productManager = require('./public/js/productManager.js');
  const productList = productManager.getProducts();
  socket.emit('actualizarLista', productList);

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });

  // Emitir mensaje al cliente conectado
  socket.emit('connected-message', 'Cliente conectado');

  // Lógica para enviar la lista de productos al cliente
  socket.emit('products-update', getProductList());

  socket.on('message', (data) => {
    console.log(data);
  });

  socket.on('input-message', (data) => {
    io.emit('input-message', data);
  });

  socket.on('chat-message', (data) => {
    const newMessage = {
      socketId: socket.id,
      message: data,
    };
    messages = [...messages, newMessage];
    io.emit('chat-messages-update', messages);
  });

  socket.on('solicitarLista', () => {
    // Obtén la lista de productos actualizada
    const productosActualizados = productManager.getProducts();
    
    // Emite la lista actualizada al cliente
    socket.emit('actualizarLista', productosActualizados);
  });
  

  // Lógica del cliente Socket.IO para actualizar productos
  socket.on('update-products', () => {
    // Enviar la lista actualizada de productos a todos los clientes
    io.emit('products-update', getProductList());
  });
});


// Iniciar el servidor HTTP
httpServer.listen(PORT, () => {
  console.log(`Servidor funcionando en el puerto: ${PORT}`);
});
