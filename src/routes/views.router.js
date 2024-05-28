import { Router } from 'express';
import ProductsManagerMongo from '../daos/productsMongo.manager.js';
import CartManagerMongo from '../daos/cartsMongo.manager.js'
import { UsersManagerMongo } from '../daos/usersManagerMongo.js'

const viewsrouter = Router()

viewsrouter.get('/login', (req, res) => {
    res.render('login')
})

viewsrouter.get('/register', (req, res) => {
    res.render('register')
})

viewsrouter.get('/', async (req, res) => {
    res.render('index')
})
viewsrouter.post('/carts', async (req, res)=>{
       
    const  socketServer  = req.socketServer 
    
    socketServer.on('connection', socket => {
    
        socket.on('cart', async data => {
            // guardamos los mensajes
                  
            const cartService = new CartManagerMongo()
            const cartFound = await cartService.getCarts()
            
           let cart = ''
            if( cartFound !== -1 ) {
               cart = cartFound;
            }else{
                 cart = await cartService.createCart()
                console.log(cart)
            }
                     
            const product = await cartService.addProduct(cart._id, data.pid)
            console.log(product)
            //products.push(data)
            // emitimos los mensajes
            if(product){
                const rta  = {"status" : "success", "msg": "producto agregado con exito"}
            }
            
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
    console.log("entreo en el view de get")
    const cartService = new CartManagerMongo()
    const cart = await cartService.getCarts()
    console.log(cart)
    res.send(cart)
   
})

viewsrouter.post('/:cid/products/:pid', async (req, res)=>{
    const cartService = new CartManagerMongo()
    const {cid, pid} = req.params

    const result = await cartService.addProduct(cid, pid)
    res.send(result)
})

 
viewsrouter.get('/products', async (req, res) => {
    const {limit, numPage, order, filter } = req.query
    const productService = new ProductsManagerMongo()

    const  { docs, page, hasPrevPage, hasNextPage, prevPage, nextPage } = await productService.getProducts({limit, numPage, order, filter})
     res.render('products', {
        products: docs,
        page, 
        hasNextPage,
        hasPrevPage,
        nextPage,
        prevPage,
        limit,
        contproducts: docs.length > 0,
        order: order == null? -1 : order,
        filter: filter == null? null : filter,
        user: req.session.user? req.session.user : false
    })

})


viewsrouter.post('/products', async (req, res) => {
   
    const productSocket = req.productSocket
    const  socketServer  = req.socketServer 
    const products = []
    let rta = ''
    const productService = new ProductsManagerMongo()
    const  { docs, page, hasPrevPage, hasNextPage, prevPage, nextPage } = await productService.getProducts(4,1, -1, null)
    socketServer.on('connection', socket => {
    
        socket.on('product', async data => {
            // guardamos los mensajes
            if(data.title === '' || data.description === '' || data.price === '' || data.code === '' || data.stock === '' || data.status === '' || data.category === ''){
                rta = {"status" : "error", "msg":'Todos los campos son obligatorios, corrobore'}
            }
            
            const productFound = await docs.findIndex(pro => pro.code === data.code)
           
            if( productFound !== -1 ) {
                rta  = {"status" : "error", "msg":'El producto ya existe'}
               
            }
           if(rta === ''){
            rta = await productService.createProduct(data)
           }
            
           
            //products.push(data)
            // emitimos los mensajes
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

viewsrouter.get('/users', async (req, res) => {
    const {numPage, limit} = req.query
   
    const userService = new UsersManagerMongo()
    const  { docs, page, hasPrevPage, hasNextPage, prevPage, nextPage } = await userService.getUsers({limit, numPage })
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

viewsrouter.get('/chat', (req, res) => {
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
