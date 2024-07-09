import { CartDao, OrderDao, ProductDao, UserDao } from "../dao/factory.js"
import CartRepositories from "../repositories/cart.repositories.js"
import ProductRepositories from "../repositories/product.repositories.js"
import UserRepositories from "../repositories/user.repositories.js"
import OrderRepositories from "../repositories/order.repositories.js"

export const userService = new UserRepositories(UserDao())
export const productService = new ProductRepositories(ProductDao())
export const cartService = new CartRepositories(CartDao())
export const orderService = new OrderRepositories(OrderDao())

