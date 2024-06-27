import CartManagerMongo from "../daos/cartsMongo.manager.js";
import ProductsManagerMongo from "../daos/productsMongo.manager.js";
import { UsersManagerMongo } from "../daos/usersManagerMongo.js";

export const userService = new UsersManagerMongo()
export const productService = new ProductsManagerMongo()
export const cartService = new CartManagerMongo()

