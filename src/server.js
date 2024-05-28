import express from 'express'
import productsRouter from './routes/api/products.router.js'
import cartsRouter from './routes/api/carts.router.js'
import viewsRouter from './routes/views.router.js'
import { __dirname } from './utils.js'
import usersRouter from './routes/api/users.router.js'

// motor de plantilla
import handlebars from 'express-handlebars'
import productsSocket from './utils/productsSocket.js'
// socket io
import { Server as ServerIO } from 'socket.io'
import { Server as ServerHttp } from 'http'
import connectDb from './config/index.js'
import cookieParser from 'cookie-parser'
import { sessionsRouter } from './routes/api/sessions.router.js'
import session from 'express-session'
import MongoStore  from 'connect-mongo'




import FileStore from 'session-file-store'

const fileStorage = FileStore(session)




// passport 
import passport from 'passport'
import { initializePassport } from './config/passport.config.js'
const app = express()
const httpServer = new ServerHttp(app)
const io = new ServerIO(httpServer)

const PORT = process.env.PORT || 8080
app.use(session({
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://vanyu77:Joluvimo777@baseseva.hebhslk.mongodb.net/?retryWrites=true&w=majority&appName=BasesEva',
        mongoOptions: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        },
        ttl:15
    }),
    secret: 's3cr3t@',
    resave: true,
    saveUninitialized: true
})
)

initializePassport()
app.use(passport.initialize())
app.use(passport.session())

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname+'/public'))
app.use(cookieParser('S3CR3T@'))
connectDb()

// express usa este motor de plantillas
app.engine('hbs', handlebars.engine({
    extname: '.hbs'
}))
// seteamos la dirección de mis vistas (plantlillas)
app.set('views', __dirname+'/views')
app.set('view engine', 'hbs')

//middleware
app.use(productsSocket(io))

app.use('/', viewsRouter)


app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.use('/api/sessions', sessionsRouter)

app.use((error, req, res, next) => {
    console.log(error)
    res.status(500).send('Error 500 en el server')
})

// Guardar en una cont
httpServer.listen(PORT, error => {
    if(error) console.log(error)
    console.log('Server escuchando en el puerto 8080')
})



let messages = [] // simular un db mock 
// manager chat - productos 
// socketServer -> io 
io.on('connection', socket => {
    console.log('Cliente conectado')

    socket.on('product', data => {
        console.log('message data: ', data)
        // guardamos los mensajes
        messages.push(data)
        // emitimos los mensajes
        io.emit('messageLogs', messages)
    })
})


