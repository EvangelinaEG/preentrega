import express from 'express'
import handlebars from 'express-handlebars'
import viewsRouter from './routes/views.router.js'
import productsRouter from './routes/api/products.router.js'
import  connectDB  from './config/index.js'
import  productsSocket from './utils/productsSocket.js'
import { __dirname } from './utils/utils.js'
// socket io
import { Server } from 'socket.io'
const app = express()
const PORT = process.env.PORT || 8080

const httpServer = app.listen(PORT, error => {
    if(error) console.log(error)
    console.log('Server escuchando en el puerto 8080')
})

// creamos el socket server
const io = new Server(httpServer)

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname+'/public'))

app.engine('hbs', handlebars.engine({
    extname: '.hbs'
}))
app.set('views', __dirname+'/views')
app.set('view engine', 'hbs')

// urbase/productos -> html con productos
// urbase/products
connectDB()

app.use('/', productsRouter)
app.use('/api/products', productsRouter)

// url-base/api/productos -> json

let messages = [] // simular un db mock 
// manager chat - productos 
// socketServer -> io 
io.on('connection', socket => {
    console.log('Cliente conectado')

    socket.on('message', data => {
        console.log('message data: ', data)
        // guardamos los mensajes
        messages.push(data)
        // emitimos los mensajes
        io.emit('messageLogs', messages)
    })
})


