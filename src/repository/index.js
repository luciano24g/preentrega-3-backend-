import { CartRepository } from "./cartRepository.js";
import { cartManagerMongoInstance } from '../managers/CartManagerMongo.js';
import ProductManager from "../managers/productManagerMongo.js";
import { ProductRepository } from "./productRepository.js";
import UserManager from "../managers/userManager.js";
import { UserRepository } from "./userRepository.js";
import { TicketRepository } from "./ticketRepository.js";

// Carts Service
const cartService = new CartRepository(cartManagerMongoInstance);

// Product Service
const productService = new ProductRepository(new ProductManager());

// User Service
const userService = new UserRepository(new UserManager());

// Ticket Service
const ticketService = new TicketRepository();

export { cartService, productService, userService, ticketService };
