import express from 'express'
import { __dirname } from './utils.js'
import handlebars from 'express-handlebars'
import productsSocket from './utils/productsSocket.js'
import { Server as ServerIO } from 'socket.io'
import { Server as ServerHttp } from 'http'
import connectDb from './config/index.js'
import cookieParser from 'cookie-parser'
//import sessionsRouter from './routes/api/sessions.router.js'
import session from 'express-session'
import SessionRouter from './routes/session.js'
import FileStore from 'session-file-store'
import passport from 'passport'
import { initializePassport} from './config/passport.config.js'

import { format } from 'path'
import { objectConfig } from './config/index.js'
import routerApp from './routes/index.js'

const fileStorage = FileStore(session)
const app = express()
const httpServer = new ServerHttp(app)
const io = new ServerIO(httpServer)
const sessionRouterClass = new SessionRouter()
const {port} = objectConfig

initializePassport()  
app.use(passport.initialize())
/* app.use(passport.session()) */
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname+'/public'))
app.use(cookieParser('S3CR3T@'))
connectDb()
app.engine('hbs', handlebars.engine({
    extname: '.hbs'
}))
app.set('views', __dirname+'/views')
app.set('view engine', 'hbs')

//middleware
app.use(productsSocket(io))

app.use(routerApp)

// Guardar en una cont
httpServer.listen(port, error => {
    if(error) console.log(error)
    console.log('Server escuchando en el puerto '+ port)
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


