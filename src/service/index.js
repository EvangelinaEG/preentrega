import CartRepositories from "../repositories/cart.repositories.js";
import ProductRepositories from "../repositories/product.repositories.js";
import UserRepositories from "../repositories/user.repositories.js";
import OrderRepositories from "../repositories/order.repositories.js";

import { ProductDao, UserDao, CartDao, OrderDao } from '../dao/factory.js';

export const userService = new UserRepositories(new UserDao());
export const productService = new ProductRepositories(new ProductDao());
export const cartService = new CartRepositories(new CartDao());
export const orderService = new OrderRepositories(new OrderDao());
