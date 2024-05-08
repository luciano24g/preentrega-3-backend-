import { hashSync, compareSync, genSaltSync } from 'bcrypt';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

// Obtén la ruta del directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const createHash = (password) => hashSync(password, genSaltSync(10));
const validatePassword = (password, user) => compareSync(password, user.password);

export { __dirname, createHash, validatePassword };
