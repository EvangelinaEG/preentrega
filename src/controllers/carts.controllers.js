import { cartService, productService } from "../service/index.js"

class cartController{
    constructor(){
        this.cartService = cartService
    }

    getcarts    = async (req,res, next) => {
        try{
            const docs  = await this.cartService.getCarts()
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
            next(error); 
        }
    } 
    getcart     =  async (req, res, next) => {
        try{
            const {cid } = req.params
            const cart = await this.cartService.getcartById({ cid })
            res.send(cart)
         
        }catch(error){
            next(error); 
        }
    }
    createcart  = async (req, res, next) => {
        try{
            const carts = await this.cartService.getCarts()
            let cart = {}
            if(carts.length === 0){
                cart = await this.cartService.createCart()
            }
            res.send(carts)
        }catch(error){
            next(error); 
        }
    }

    getcartById     =  async (req, res, next) => {
        try{
            const { uid } = req.params
            const cartFound = await this.cartService.getBy({_id: uid})
            res.send({status: 'success', payload: cartFound})
        }catch(error){
            next(error); 
        }
    }
    updatecart  = async (req, res, next) => {
     
        try{
            const {cid, pid} = req.params
          

                    const cartFound = await this.cartService.getCarts()
                
                
                   let cart = ''
                    if( cartFound === null ) {
                        cart = await this.cartService.createCart()
                     
                    }else{
                        cart = cartFound[0]._id;
                        
                    }
        
                             
                    const product = await this.cartService.addProductToCart(cart, pid)
                 
                    //products.push(data)
                    // emitimos los mensajes
                    let rta = ''
                    if(Object.values(product).length > 0){
                        rta  = {"status" : "success", "msg": "producto agregado con exito"}
                    }else{
                        rta  = {"status" : "success", "msg": "No se pudo agregar el producto"}
                    }
                
           // const result = await this.cartService.addProductToCart(cid, pid)
            res.send(rta)
        }catch(error){
            next(error); 
        }
    } 
    checkoutCart = async (req, res, next) => {
        try{
        const {cid} = req.params
        const docs  = await this.cartService.getCarts()
        if( docs.length === 0){
            CustomError.createError({
                name: 'Error al generar el ticket',
                casuse: generateCartError(docs),
                message: 'Error al generar el ticket',
                code: EError.INVALID_TYPES_ERROR
            })
        }
        
        let sum = 0
        let t = 0
        let purchase = []
        let canceled = []
        for (const product of Object.values(docs[0].products)) {
            const result = await productService.updateProduct(product.product);
            if (result) {
                purchase.push(product);
            } else {
                canceled.push(product);
            }
        }
        //console.log(purchase)
        //console.log(canceled)
        //console.log(docs[0].products)
        //sum = Object.values(docs[0].products).forEach(pro => sum + parseFloat(pro.product.price))
        //t = Object.values(docs[0].products).forEach(pro => t + parseInt(pro.quantity))
        Object.values(purchase).forEach(pro => sum += (parseFloat(pro.product.price) * parseInt(pro.quantity)))
        Object.values(purchase).forEach(pro => t += parseInt(pro.quantity))

        res.render('order', {
            cart: docs[0],
            products: purchase,
            countCart: purchase.length,
            counT: t,
            sumT: sum,
            mensaje:"Su compra fue completada",
            canceled: canceled,
            countCancel: canceled.length
        })
    }catch{
            next(error)
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
    deletecart = async (req, res, next) => {
        try{
            const {pid} = req.params
            const cartFound = await this.cartService.getCarts()
            let cart = ''
            if( cartFound === null ) {
                cart = await this.cartService.createCarts()
                
            }else{
                cart = cartFound[0]._id;
                
            }
            const result = await this.cartService.deleteProductFromCart(cart, pid)
  
            const docs  = await this.cartService.getCarts()
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
                    next(error); 
                }
            }

}

export default cartController