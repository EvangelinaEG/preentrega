import cartsModel from "./../models/carts.model.js"

class CartManagerMongo {
    constructor(){
        this.model = cartsModel
    }

    getCarts = async () => await this.model.find()
    getCart = async (cid) => {
        const cart = await this.model.findOne({_id : id})
        return cart
    }
    createCart = async () => {
        const cart = await this.model.create({products: []})
        return cart 
    }
    addProduct = async (cid, pid) => {
        const cart = await this.model.findOne({_id: cid})
        // cart.products array -> {prduct: 'kajshfkhsfd', quantity: 5}
       
        cart.products.push({ product: pid })
        const resp = await cartsModel.findByIdAndUpdate({_id: cid}, cart)
        return resp
    }
    deleteProduct = async (cid, pid) => {
        const cart = await this.model.findOne({_id: cid})
        // cart.products array -> {prduct: 'kajshfkhsfd', quantity: 5}
        
        

        const index = cart.products.findIndex(product => product.id !== parseInt(pid))
        cart.products.splice(index, 1)
        
        const resp = await cartsModel.findByIdAndUpdate({_id: cid}, cart)
    }
}

export default CartManagerMongo