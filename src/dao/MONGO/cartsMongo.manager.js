import cartsModel from "./models/carts.model.js"

class CartManagerMongo {
    constructor(){
        this.model = cartsModel
    }

    getAll = async () => await this.model.find().lean()
    get = async (cid) => {
        const cart = await this.model.findOne({_id : id})
        return cart
    }
    create = async () => {
        const cart = await this.model.create({products: []})
        return cart._id 
    }
    add = async (cid, pid) => {
        const cart = await this.model.findOne({_id: cid})
        console.log(cid)
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
    delete = async (cid, pid) => {
        const cart = await this.model.findOne({_id: cid})
        // cart.products array -> {prduct: 'kajshfkhsfd', quantity: 5}
        
        

        const index = cart.products.findIndex(product => product.id !== parseInt(pid))
        cart.products.splice(index, 1)
        
        const resp = await cartsModel.findByIdAndUpdate({_id: cid}, cart)
    }
}

export default CartManagerMongo