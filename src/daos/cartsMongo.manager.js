import { cartsModel } from "../models/carts.model";

export class CartsManagerMongo{
    constructor(){
        this.cartModel = cartModel;
    }

    async createProductCart(cid, pid){
        const cart = await cartsModel.findById({ _id : id })
        const index = cart.products.findIndex(products => pid === products.product)
        if(index === -1){
            cart.products[index].quantity++;
        }else{
            this.producs.create(product);
        }
        return await this.cartModel.create(cart);
    }

    async getCartById(id){
        return await this.cartModel.find({ _id : id}); 
    }

    async getCartByName(name){
        return await this.cartModel.find((cart) => cart.name === name);
    }

    async getCarts(){
        return await this.cartsModel;
    }
}