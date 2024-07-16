import { Router } from 'express';
import ProductsManagerMongo from '../dao/MONGO/productsMongo.manager.js';
import CartManagerMongo from '../dao/MONGO/cartsMongo.manager.js'
import  UsersManagerMongo  from '../dao/MONGO/usersMongo.manager.js'
import { passportCall } from '../utils/passportCall.js'
import { atuhorization } from '../utils/authorizationJwt.js'

const viewsrouter = Router()

viewsrouter.get('/', async (req, res) => {
    res.redirect('login')
})

viewsrouter.get('/logout', async (req, res) => {
    res.redirect('api/sessions/logout')
})

viewsrouter.get('/autorizacion', async (req, res) => {
    res.render('autorizacion')
})

viewsrouter.get('/autenticacion', async (req, res) => {
    res.render('autenticacion')
})


viewsrouter.post('/carts', passportCall('jwt'), atuhorization('admin'),async (req, res)=>{     
    const  socketServer  = req.socketServer 
    socketServer.on('connection', socket => {
        socket.on('cart', async data => {
            // guardamos los mensajes
                  
            const cartService = new CartManagerMongo()
            const cartFound = await cartService.getAll()
        
        
           let cart = ''
            if( cartFound === null ) {
                cart = await cartService.createCart()
             
            }else{
                cart = cartFound[0]._id;
                
            }

                     
            const product = await cartService.add(cart, data.pid)
         
            //products.push(data)
            // emitimos los mensajes
            let rta = ''
            if(Object.values(product).length > 0){
                rta  = {"status" : "success", "msg": "producto agregado con exito"}
            }else{
                rta  = {"status" : "success", "msg": "No se pudo agregar el producto"}
            }
            console.log(rta)
            socketServer.emit('messageLogs', rta)
        })
    })
    /* const cartService = new CartManagerMongo()
    const carts = await cartService.getCarts()
    let cart = {}
    if(carts.length === 0){
        cart = await cartService.createCart()
    }
    res.send(cart) */
})

viewsrouter.get('/carts', async (req, res)=>{
   /*  console.log("entreo en el view de get")
    const cartService = new CartManagerMongo()
    const cart = await cartService.getCarts()
    console.log(cart)
    res.send(cart) */

    const cartService = new CartManagerMongo()

    const docs  = await cartService.getAll()
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
   
})

viewsrouter.get("/carts/delete/:pid", passportCall('jwt'), atuhorization('admin'),async (req, res) => {
    const {pid} = req.params
    const cartService = new CartManagerMongo()
    const cartFound = await cartService.getAll()
    let cart = ''
    if( cartFound === null ) {
        cart = await cartService.create()
        
    }else{
        cart = cartFound[0]._id;
        
    }
    const result = await cartService.delete(cart, pid)
  
    const docs  = await cartService.getAll()
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
})

viewsrouter.post('/:cid/products/:pid', passportCall('jwt'), atuhorization('admin'),async (req, res)=>{

    const cartService = new CartManagerMongo()
    const {cid, pid} = req.params

    const result = await cartService.add(cid, pid)
    res.send(result)
})

 
viewsrouter.get('/products', async (req, res) => {
    
    const {limit, numPage, order, filter } = req.query

    const productService = new ProductsManagerMongo()
    const productSocket = req.productSocket
    const  socketServer  = req.socketServer 
    const products = []
    let rta = ''
    
    //console.log(req.body)
    socketServer.on('connection', socket => {
    
        socket.on('product', async data => {
            // guardamos los mensajes
            if(data.title === '' || data.description === '' || data.price === '' || data.code === '' || data.stock === '' || data.status === '' || data.category === ''){
                rta = {"status" : "error", "msg":'Todos los campos son obligatorios, corrobore'}
            }
            console.log(docs)
            
            const productFound = await docs.findIndex(pro => pro.code === data.code)
           
            if( productFound !== -1 ) {
                rta  = {"status" : "error", "msg":'El producto ya existe'}
               
            }
           if(rta === ''){
            rta = await productService.create(data)
           }
 
            if(rta._id){
                rta  = {"status" : "success", "msg":'Producto agregado con exito'}
            }
            
            socketServer.emit('messageLogs', rta )
        })
    })

    const  { docs, page, hasPrevPage, hasNextPage, prevPage, nextPage } = await productService.getAll({limit, numPage, order, filter})

     res.render('products', {
        products: docs,
        page, 
        hasNextPage,
        hasPrevPage,
        nextPage,
        prevPage,
        limit: limit === null || limit === "" || typeof limit === "undefined" ? 4 : limit,
        contproducts: docs.length > 0,
        order: order === null || typeof order === "undefined"? -1 : order,
        filter: filter === null || filter === "" || typeof filter === "undefined"? null : filter,
        
    })

})


viewsrouter.post('/products', passportCall('jwt'), atuhorization('admin'), async (req, res) => {
   
    const productSocket = req.productSocket
    const  socketServer  = req.socketServer 
    const products = []
    let rta = ''
    const productService = new ProductsManagerMongo()
    const  { docs, page, hasPrevPage, hasNextPage, prevPage, nextPage } = await productService.getAll(4,1, -1, null)
    socketServer.on('connection', socket => {
    
        socket.on('product', async data => {
            // guardamos los mensajes
            if(data.title === '' || data.description === '' || data.price === '' || data.code === '' || data.stock === '' || data.status === '' || data.category === ''){
                rta = {"status" : "error", "msg":'Todos los campos son obligatorios, corrobore'}
            }
            console.log(docs)
            
            const productFound = await docs.findIndex(pro => pro.code === data.code)
           
            if( productFound !== -1 ) {
                rta  = {"status" : "error", "msg":'El producto ya existe'}
               
            }
           if(rta === ''){
            rta = await productService.create(data)
           }
 
            if(rta._id){
                rta  = {"status" : "success", "msg":'Producto agregado con exito'}
            }
            
            socketServer.emit('messageLogs', rta )
        })
    })
   
    res.render('products', {
            products: docs,
            countproducts: docs.length,
            page, 
            hasNextPage,
            hasPrevPage,
            nextPage,
            prevPage,
            rta
    })
})

viewsrouter.get('/users', passportCall('jwt'), atuhorization('user'), async (req, res) => {
    const {numPage, limit} = req.query
   
    const userService = new UsersManagerMongo()
    const  { docs, page, hasPrevPage, hasNextPage, prevPage, nextPage } = await userService.getAll({limit, numPage })
    // console.log(resp)

    res.render('users', {
        users: docs,
        page, 
        hasNextPage,
        hasPrevPage,
        nextPage,
        prevPage
    })
})

viewsrouter.get('/chat',passportCall('jwt'), atuhorization('user'), (req, res) => {
    const { socketServer } = req

    socketServer.on('connection', socket => {
        console.log('nuevo cliete conectado')
    
        // socket.on('message', data => {
        //     console.log(data)
        // })
    
        // socket.emit('socket_individual', 'Este mensaje lo debe ecibir este los socket')
    
        // socket.broadcast.emit('para_todos_menos_el_actual', 'este evento lo verán todos los socket conectados menos el actual.')
    
        // socketServer.emit('eventos_para_todo', 'Este mensjae lo reciben todos los socket incluido el actual')
    
        const messages = []
    
        // enviar mensajes viejos
    
        socket.on('mensaje_cliente', data => {
         
    
            messages.push({id: socket.id, messge: data})
            
            socketServer.emit('messages_server', messages)
        })
    })

   
})


export default viewsrouter
