import dotenv from 'dotenv';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';
import winston from 'winston';

dotenv.config(); // Carga las variables de entorno desde el archivo .env

// Obtén la ruta del directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = process.env.PORT || 8080; // Utiliza la variable de entorno para el puerto o un valor predeterminado

const config = {
  server: {
    port: PORT,
    viewsPath: path.join(__dirname, 'views'),
    publicPath: path.join(__dirname, 'public'),
  },
  session: {
    secret: crypto.randomBytes(32).toString('hex'),
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  },
  mongo: {
    url: process.env.MONGO,
  },
  logger: {
    development: {
      level: 'debug',
      transports: [new winston.transports.Console()],
    },
    production: {
      level: 'info',
      transports: [new winston.transports.File({ filename: 'errors.log', level: 'error' })],
    },
  },
};

export default config;
