import { Router } from "express"
import productsRouter from './api/products.router.js'
import cartsRouter from './api/carts.router.js'
import viewsRouter from './views.router.js'
import usersRouter from './api/users.router.js'
import  sessionsRouter  from "./api/sessions.router.js"


const router = Router()
//router.use('/', viewsRouter)
router.get('/login', (req, res) => {
    res.render('login')
})
router.get('/register', (req, res) => {
    res.render('register')
})

router.use('/api/sessions', sessionsRouter) 
router.use('/users', usersRouter)
router.use('/carts', cartsRouter)
router.use('/', productsRouter)
router.get('/loggerTest', async (req, res) => {
    req.logger.warning("Alerta!");
    res.send('logs');
});


/* router.use((error, req, res, next) => {
    console.log(error)
    res.status(500).send('Error 500 en el server')
}) */



export default router

