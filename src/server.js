import express from 'express'
import { __dirname } from './utils.js'
import handlebars from 'express-handlebars'
import { productsSocket } from './utils/productsSocket.js'
import { Server as ServerIO } from 'socket.io'
import { Server as ServerHttp } from 'http'
import passport from 'passport'
import cookieParser from 'cookie-parser'
import { initializePassport } from './config/passport.config.js'
import { connectDB, objectConfig } from './config/index.js'
import routerApp from './routes/index.js'
//import { sendMessage } from './utils/sendMessage.js'
import handleErrors from './middlewares/errors/index.js'
//importaciones de swagger
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUiExpress from 'swagger-ui-express'
import cors from 'cors'
import { addDevLogger } from './utils/devLogger.js'
import { addProdLogger } from './utils/prodLogger.js'
// passport 

const app = express()
const httpServer = new ServerHttp(app)
const io = new ServerIO(httpServer)
const { port } = objectConfig

const swaggerOptions = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: 'Documentacion de app de Eccomerce',
            description: 'Api para documentar procesos del Eccomerce'
        }
    },
    apis: [`${__dirname}/docs/**/*.yaml`]
}   
const especs = swaggerJSDoc(swaggerOptions)
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname+'/public'))
app.use(cookieParser())
app.use(cors())

app.use(productsSocket(io))

initializePassport()  
app.use(passport.initialize())

// express usa este motor de plantillas
app.engine('hbs', handlebars.engine({
    extname: '.hbs',
    helpers: {
        eq: (a, b) => a === b
    }
}))
app.set('views', __dirname+'/views')
app.set('view engine', 'hbs')
app.use('/apidocs', swaggerUiExpress.serve, swaggerUiExpress.setup(especs))
app.use(addDevLogger)
app.use(addProdLogger)
app.use(routerApp)
app.use(handleErrors)
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname+'/public'))
app.use((err, req, res, next) => {
    req.logger.error(`${err.message} - ${req.method} en ${req.url} - ${new Date().toLocaleString()}`);
    res.status(500).send('Internal Server Error');
});


// Guardar en una cont
httpServer.listen(port, error => {
    if(error) console.log(error)
    console.log('Server escuchando en el puerto ' + port)
})

//sendMessage(io)
