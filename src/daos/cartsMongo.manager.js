import cartsModel from "./../models/carts.model.js"

class CartManagerMongo {
    constructor(){
        this.model = cartsModel
    }

    getCarts = async () => await this.model.find().lean()
    getCart = async (cid) => {
        const cart = await this.model.findOne({_id : id})
        return cart
    }
    createCart = async () => {
        const cart = await this.model.create({products: []})
        return cart._id 
    }
    addProduct = async (cid, pid) => {
        const cart = await this.model.findOne({_id: cid})
        // cart.products array -> {prduct: 'kajshfkhsfd', quantity: 5}
        const index = cart.products.findIndex(pro => pro.product.toString() === pid)
        
         if(index === -1){
            cart.products.push({ product: pid, quantity: 1 })   
        }else{
            cart.products[index].quantity += 1
        }
        
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