import express from 'express';
import { engine } from 'express-handlebars';
import http from 'http';
import path, { dirname } from 'path'; // Importa 'dirname' de 'path'
import dbConnection from './db.js';
import viewsRouter from './routes/viewsRouter.js';
import productsRouter from './routes/productRouter.js';
import Message from './persistencia/Message.js';
import { Server as socketIo } from 'socket.io'; // Importa Server como socketIo
import messageRouter from './routes/messageRouter.js';
import session from 'express-session';
import sessionRouter from './routes/sessions.router.js';
import cartRouter from './routes/cartRouter.js';
import passport from 'passport';
import inicializePassport from './managers/passport.config.js';
import crypto from 'crypto';
import dotenv from 'dotenv'; // Importa el paquete dotenv
import { fileURLToPath } from 'url'; // Importa 'fileURLToPath'

dotenv.config(); // Carga las variables de entorno desde el archivo .env

const PORT = process.env.PORT || 8080; // Utiliza la variable de entorno para el puerto o un valor predeterminado

const app = express();
const httpServer = http.createServer(app);

app.use(express.json());

// Configuración de express-session con la nueva clave secreta
app.use(session({
  secret: crypto.randomBytes(32).toString('hex'),
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

// Inicialización de Passport
app.use(passport.initialize());
app.use(passport.session());
inicializePassport(passport); // Pasa el objeto Passport como argumento

// Configuración de Handlebars
app.engine('.handlebars', engine({
  runtimeOptions: {
    allowProtoMethodsByDefault: true,
    allowProtoPropertiesByDefault: true,
  },
}));

// Obtiene la ruta del directorio actual utilizando 'fileURLToPath' y 'dirname'
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Agregar el enrutador de productos bajo '/api'
app.use('/api/products', productsRouter);
app.use('/', viewsRouter);
app.use('/api/messages', messageRouter);

// Utiliza el enrutador de sesiones
app.use('/api/sessions', sessionRouter);

app.use("/api/carts", cartRouter);

// Configuración de Socket.IO
const io = new socketIo(httpServer); // Crea un nuevo servidor de socket con 'socketIo'
app.set('socketio', io);

io.on('connection', (socket) => {
  console.log('New client connected');

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

// Verificar si la conexión a MongoDB está activa antes de iniciar el servidor
dbConnection.once('open', () => {
  console.log(`Conexión a MongoDB activa. Servidor funcionando en el puerto: ${PORT}`);
});

dbConnection.on('error', (error) => {
  console.error('Error en conexión a MongoDB:', error.message);
});

// Iniciar el servidor HTTP
httpServer.listen(PORT, () => {
  console.log(`Servidor funcionando en el puerto: ${PORT}`);
});
