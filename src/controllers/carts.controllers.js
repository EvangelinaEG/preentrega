import { cartService } from "../service/index.js"

class cartController{
    constructor(){
        this.cartService = cartService
    }

    getcarts    = async (req,res) => {
        try{
            const docs  = await cartService.getCarts()
            let sum = 0
            let t = 0
            //console.log(docs[0].products)
            //sum = Object.values(docs[0].products).forEach(pro => sum + parseFloat(pro.product.price))
            //t = Object.values(docs[0].products).forEach(pro => t + parseInt(pro.quantity))
            Object.values(docs[0].products).forEach(pro => sum += (parseFloat(pro.product.price) * parseInt(pro.quantity)))
            Object.values(docs[0].products).forEach(pro => t += parseInt(pro.quantity))

            res.render('cart', {
                cart: docs[0],
                products: Object.values(docs[0].products),
                countCart: Object.values(docs[0]).length - 1,
                counT: t,
                sumT: sum,
                
            })
            
        }catch(error){
            console.log(error)
        }
    } 
    getcart     =  async (req, res) => {
        try{
            const {cid } = req.params
            const cart = await cartService.getcartById({ cid })
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
            const cartFound = await this.cartService.getBy({_id: uid})
            res.send({status: 'success', payload: cartFound})
        }catch(error){
            console.log(error)
        }
    }
    updatecart  = async (req, res) => {
        try{
            const {cid, pid} = req.params
    
            const result = await cartService.add(cid, pid)
            res.send(result)
        }catch(error){
            console.log(error)
        }
    } 
    checkoutCart = async (req, res) => {
        const {cid} = req.params
        const docs  = await cartService.getCarts()
        let sum = 0
        let t = 0
        //console.log(docs[0].products)
        //sum = Object.values(docs[0].products).forEach(pro => sum + parseFloat(pro.product.price))
        //t = Object.values(docs[0].products).forEach(pro => t + parseInt(pro.quantity))
        Object.values(docs[0].products).forEach(pro => sum += (parseFloat(pro.product.price) * parseInt(pro.quantity)))
        Object.values(docs[0].products).forEach(pro => t += parseInt(pro.quantity))

        res.render('order', {
            cart: docs[0],
            products: Object.values(docs[0].products),
            countCart: Object.values(docs[0]).length - 1,
            counT: t,
            sumT: sum,
            mensaje:"Su compra fue completada"
        })
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
            const {pid} = req.params
            const cartFound = await cartService.getCarts()
            let cart = ''
            if( cartFound === null ) {
                cart = await cartService.createCarts()
                
            }else{
                cart = cartFound[0]._id;
                
            }
            const result = await cartService.deleteProductFromCart(cart, pid)
  
            const docs  = await cartService.getCarts()
            let sum = 0
            let t = 0
            //console.log(docs[0].products)
            //sum = Object.values(docs[0].products).forEach(pro => sum + parseFloat(pro.product.price))
            //t = Object.values(docs[0].products).forEach(pro => t + parseInt(pro.quantity))
            Object.values(docs[0].products).forEach(pro => sum += (parseFloat(pro.product.price) * parseInt(pro.quantity)))
            Object.values(docs[0].products).forEach(pro => t += parseInt(pro.quantity))

            res.render('cart', {
                cart: docs[0],
                products: Object.values(docs[0].products),
                countCart: Object.values(docs[0]).length,
                counT: t,
                sumT: sum,
            /*     */
            })
                }catch(error){
                    console.log(error)
                }
            }

}

export default cartController