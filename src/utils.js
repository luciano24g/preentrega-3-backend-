import { hashSync, compareSync, genSaltSync } from 'bcrypt';

const createHash = (password) => hashSync(password, genSaltSync(10));
const validatePassword = (password, user) => compareSync(password, user.password);

export { createHash, validatePassword };
