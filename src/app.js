import express from 'express';
import { engine } from 'express-handlebars';
import http from 'http';
import dbConnection from './config/db.js';
import viewsRouter from './routes/viewsRouter.js';
import productRouter from './routes/productRouter.js';

import { Server as socketIo } from 'socket.io'; // Importa Server como socketIo

import session from 'express-session';
import sessionRouter from './routes/sessions.router.js';
import cartRouter from './routes/cartRouter.js';
import passport from 'passport';
import initializePassport from './config/passport.config.js';
import dotenv from 'dotenv'; // Importa el paquete dotenv
import winston from 'winston';
import swaggerUi from 'swagger-ui-express';
import config from './config/config.js'; // Importa la configuración
import { swaggerSpecs } from "./config/swagger.js";
import path from 'path'; // Importa la librería path
import { fileURLToPath } from 'url';

dotenv.config(); // Carga las variables de entorno desde el archivo .env

// Obtén la ruta del directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); // Utiliza la función dirname de la librería path para obtener el directorio actual

const app = express();
const httpServer = http.createServer(app);

app.use(express.json());

// Configuración de express-session
app.use(session(config.session));

// Inicialización de Passport
app.use(passport.initialize());
app.use(passport.session());
initializePassport(passport); // Pasa el objeto Passport como argumento

// Configuración de Handlebars
app.engine('.handlebars', engine({
  runtimeOptions: {
    allowProtoMethodsByDefault: true,
    allowProtoPropertiesByDefault: true,
  },
}));

// Configuración de las vistas y archivos estáticos
app.set('view engine', 'handlebars');
app.set("views", `${__dirname}/views`)

app.use(express.static(path.join(__dirname, 'public')));

// Agregar el enrutador de productos bajo '/api'
app.use('/api/products', productRouter);
app.use('/', viewsRouter);


// Utiliza el enrutador de sesiones
app.use('/api/sessions', sessionRouter);
app.use("/api/carts", cartRouter);

// Configuración de Swagger
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Configuración de Socket.IO
const io = new socketIo(httpServer); // Crea un nuevo servidor de socket con 'socketIo'
app.set('socketio', io);

// Configuración de Winston para el logger
const logger = process.env.NODE_ENV === 'production' ? winston.createLogger(config.logger.production) : winston.createLogger(config.logger.development);

// Manejador de eventos de Socket.IO
io.on('connection', (socket) => {
  logger.debug('New client connected');

  socket.on('chatMessage', async (data) => {
    try {
      const newMessage = {
        user: data.user,
        message: data.message,
      };

      // Guardar el mensaje en MongoDB
      await Message.create(newMessage);

      // Obtener todos los mensajes y enviarlos a todos los clientes
      const messages = await Message.find();
      io.emit('chatMessages-update', messages);

    } catch (error) {
      logger.error('Error al procesar el mensaje de chat:', error.message);
    }
  });
});

// Verificar si la conexión a MongoDB está activa antes de iniciar el servidor
dbConnection.once('open', () => {
  logger.info(`Conexión a MongoDB activa. Servidor funcionando en el puerto: ${config.server.port}`);
});

dbConnection.on('error', (error) => {
  logger.error('Error en conexión a MongoDB:', error.message);
});

// Iniciar el servidor HTTP
httpServer.listen(config.server.port, () => {
  logger.info(`Servidor funcionando en el puerto: ${config.server.port}`);
});
