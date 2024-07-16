import CartRepositories from "../repositories/cart.repositories.js";
import ProductRepositories from "../repositories/product.repositories.js";
import UserRepositories from "../repositories/user.repositories.js";
import ticketRepositories from "../repositories/ticket.repositories.js";

import { ProductDao, UserDao, CartDao, ticketDao } from '../dao/factory.js';

export const userService = new UserRepositories(new UserDao());
export const productService = new ProductRepositories(new ProductDao());
export const cartService = new CartRepositories(new CartDao());
export const ticketService = new ticketRepositories(new ticketDao());
