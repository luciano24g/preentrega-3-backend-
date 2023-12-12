const express = require('express');
const { engine } = require('express-handlebars');
const http = require('http');
const path = require('path');
const viewRouter = require('./routes/productRouter.js');
const { Server } = require('socket.io');

const PORT = 8080;
let messages = [];
const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer);

// Configuración de Handlebars
app.engine('.handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views')); // Asegúrate de que la carpeta 'views' exista

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', viewRouter);

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });

  socket.on('message', (data) => {
    console.log(data);
  });

  socket.emit('evento_para_mi', 'evento solo para el que se conectó');
  socket.broadcast.emit('evento_no_para_mi', 'Hola, soy un nuevo participante');
  io.emit('evento_para_todos', 'Hay un nuevo participante, no olvidar las políticas...');

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

  // Lógica del cliente Socket.IO
  socket.on('chat-messages-update', (messages) => {
    io.emit('chat-messages-update', messages);
  });
});

// Iniciar el servidor HTTP
httpServer.listen(PORT, () => {
  console.log(`Servidor funcionando en el puerto: ${PORT}`);
});
