import { cartService } from "../service/index.js"

class cartController{
    constructor(){
        this.cartService = cartService
    }

    getcarts    = async (req,res) => {
        try{
            
            const carts = await cartService.getCarts()
            res.send(carts)
            
        }catch(error){
            console.log(error)
        }
    } 
    getcart     =  async (req, res) => {
        try{
            const {cid } = req.params
            const cart = await cartService.getCart({ cid })
            res.send(cart)
         
        }catch(error){
            console.log(error)
        }
    }
    createcart  = async (req, res) => {
        try{
            const carts = await cartService.getCarts()
            let cart = {}
            if(carts.length === 0){
                cart = await cartService.createCart()
            }
            res.send(carts)
        }catch(error){
            console.log(error)
        }
    }

    getcartById     =  async (req, res) => {
        try{
            const { uid } = req.params
            const cartFound = await this.cartService.getcartBy({_id: uid})
            res.send({status: 'success', payload: cartFound})
        }catch(error){
            console.log(error)
        }
    }
    updatecart  = async (req, res) => {
        try{
            const {cid, pid} = req.params
    
            const result = await cartService.addProduct(cid, pid)
            res.send(result)
        }catch(error){
            console.log(error)
        }
    } 
  /*   updatecart  = async (req, res) => {
        try{
            const { body } = req
            const result = await this.cartService.updatecart({ body });
            res.send({status: 'success', data: result})
        }catch(error){
            console.log(error)
        }
    } */
    deletecart = async (req, res) => {
        try{
            const {cid, pid} = req.params
            const result = await cartService.deleteProduct(cid, pid)
            res.send(result)
        }catch(error){
            console.log(error)
        }
    }

}

export default cartController