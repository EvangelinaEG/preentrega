import { Router } from 'express';
import ProductsManagerMongo from '../daos/productsMongo.manager.js';


const viewsrouter = Router()

viewsrouter.get('/', async (req, res) => {
    res.render('index',{  })
})
 
viewsrouter.get('/products', async (req, res) => {
    const {numPage, limit} = req.query
   
    const productService = new ProductsManagerMongo()
    const  { docs, page, hasPrevPage, hasNextPage, prevPage, nextPage } = await productService.getProducts({limit, numPage })
     

    res.render('products', {
        products: docs,
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
            console.log(data)
    
            messages.push({id: socket.id, messge: data})
            
            socketServer.emit('messages_server', messages)
        })
    })

   
})


export default viewsrouter
