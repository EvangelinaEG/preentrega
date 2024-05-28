// session -> login - register - logout
import {Router} from 'express'
import { UsersManagerMongo } from './../../daos/usersManagerMongo.js'
import { auth } from '../../middlewares/auth.middleware.js'
import { createhash, isValidPAssword }  from '../../utils/bcrypt.js'
import ProductsManagerMongo from './../../daos/productsMongo.manager.js';

import passport from 'passport'


export const sessionsRouter = Router()

const userService = new UsersManagerMongo()

sessionsRouter.post('/register', passport.authenticate('register', {failureRedirect: '/register'}), async (req, res) => {
    //res.send({status: 'success', message: 'User Registrado'})
    res.render('login')
})
sessionsRouter.post('/failregister', async (req, res) => {
    console.log('falló la estrategia')
    res.send({error: 'failed'})
})

sessionsRouter.post('/login', passport.authenticate('login', {failureRedirect: '/login'}),async (req, res) => {
    if(!req.user) return res.status(400).send({status: 'error', error: 'credenciales invalidas'})
    req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        
        email: req.user.email
    }
    //res.send({status: 'succes', payload: req.user})
    const {limit, numPage, order, filter } = req.query
    const productService = new ProductsManagerMongo()
    console.log(req.session.user)
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

sessionsRouter.post('/faillogin', (req, res) => {
    res.send({error: 'falló el login'})
})

sessionsRouter.get('/current', auth, (req, res) => {
    res.send('datos sensibles')
})


sessionsRouter.get('/logout', (req, res) => {
    req.session.destroy( err => {
        console.log("salio")
        if(err) return res.send({status: 'error', error: err})
        else return res.redirect('/login')
    })
})



