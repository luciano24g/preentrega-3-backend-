const express = require('express');
const { engine } = require('express-handlebars');
const http = require('http');
const path = require('path');
const mongoose = require('./db'); // Asegúrate de tener este archivo de conexión
const viewsRouter = require('./routes/viewsRouter');
const { router: productsRouter } = require('./routes/productRouter'); // Modificado para solo router
const productManagerMongo = require('./dao/productManagerMongo');
const Message = require('./dao/models/Message'); // Importa el modelo de Message
const socketIo = require('socket.io');

const PORT = 8080;
const app = express();
const httpServer = http.createServer(app);

// Middleware para parsear el cuerpo de la solicitud en formato JSON
app.use(express.json());

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
  const productList = productManagerMongo.getProducts(); 

  socket.emit('actualizarLista', productList);

  socket.on('chatMessage', async (data) => {
    try {
        const newMessage = {
            user: data.user,
            message: data.message
        };

        // Guardar el mensaje en MongoDB
        await Message.create(newMessage);

        // Obtener todos los mensajes y enviarlos a todos los clientes
        const messages = await Message.find();
        io.emit('chatMessages-update', messages);

    } catch (error) {
        console.error('Error al procesar el mensaje de chat:', error.message);
    }
  });
});

// Iniciar el servidor HTTP
httpServer.listen(PORT, () => {
  console.log(`Servidor funcionando en el puerto: ${PORT}`);
});
