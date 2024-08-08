import { Router } from "express"
import productsRouter from './api/products.router.js'
import cartsRouter from './api/carts.router.js'
import viewsRouter from './views.router.js'
import usersRouter from './api/users.router.js'
import  sessionsRouter  from "./api/sessions.router.js"
import sendEmail from '../utils/sendEmail.js'; 

const router = Router()
//router.use('/', viewsRouter)
router.get('/login', (req, res) => {
    res.render('login')
})
router.get('/register', (req, res) => {
    res.render('register')
})

router.post("/resetPass", (req, res) => {
    try{
    const {email, reemail} = req.body
    if(email === reemail){
        let html = '</h6><a href="http://localhost:3000/restart" target="_blank">Clic aqui para Reestablecer clave</a>'
        sendEmail({userEmail: email, subject: "Reestablecer clave", html })
    }
    res.render("login")
    }catch(error){
        console.log(error)
    }
})

router.get("/restart", (req, res) => {
    try{
        res.render("restart")
    }
    catch(error){
        console.log(error)
    }
})

router.get("/sendEmail", (req, res) => {
    try{
        res.render("sendEmail")
    }
    catch(error){
        console.log(error)
    }
})
router.use('/api/products', productsRouter)
router.use('/api/sessions', sessionsRouter) 
router.use('/api/users', usersRouter)
router.use('/api/carts', cartsRouter)

router.use('/', productsRouter)
router.get('/loggerTest', async (req, res) => {
    req.logger.fatal("Fatal Error!");
    req.logger.error("Error!");
    req.logger.warning("Alerta!");
    req.logger.info("Info!");
    req.logger.debug("debug!");
    req.logger.http("http!");
    res.send('logs');
});


/* router.use((error, req, res, next) => {
    console.log(error)
    res.status(500).send('Error 500 en el server')
}) */



export default router

