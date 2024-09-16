// session -> login - register - logout
import {Router} from 'express'
import { UsersManagerMongo } from '../../daos/usersManagerMongo.js'
import { auth, authorization } from '../../middlewares/auth.middleware.js'
import { createhash, isValidPAssword }  from '../../utils/bcrypt.js'
import ProductsManagerMongo from '../../daos/productsMongo.manager.js';
import { generateToken } from '../../utils/jsonwebtoken.js';
import passport from 'passport'
import { passportCall } from '../../middlewares/passportCall.middleware.js';



export const sessionsRouter = Router()

const userService = new UsersManagerMongo()

sessionsRouter.get('/github', passport.authenticate('github', {scope: 'user:email'}), async (req, res)=>{})


sessionsRouter.get('/githubcallback', passport.authenticate('github', {failureRedirect: '/login'}), (req,res) =>{
    req.session.user = req.user
    res.redirect('/products')
})

//sessionsRouter.post('/register', passport.authenticate('register', {failureRedirect: '/register'}), async (req, res) => {
    sessionsRouter.post('/register', async (req, res) => {
    const { first_name, last_name, password, email} = req.body
    if(!password && !email) return req.status(401).send({status: 'error', message: 'Debe ingresar todas las credenciales'})
        const userFound = await userService.getUserBy({email})

    if(userFound) return res.status(401).send({status: 'error', message: 'El usuario con ese email ya existe'})

    const newUser = {
        first_name,
        last_name,
        email,
        password: createhash(password)
    }

    const result = await userService.createUser(newUser)

    const token = generateToken({
        email,
        id: result._id
    })


    res
    .cookie('token', token, {
        maxAge: 60*60*1000*24,
        httpOnly: true
    }) 
    .send({status: 'success', message: 'User Registrado'})
    /*  const token = generateToken({
        id: result._id,
        email
    })   */

    //res.redirect('login')
})


sessionsRouter.post('/failregister', async (req, res) => {
    
    res.send({error: 'failed'})
})

//sessionsRouter.post('/login', passport.authenticate('login', {failureRedirect: '/login'}), async (req, res) => {
/* sessionsRouter.post('/login', async (req, res) => {
    const {email, password} = req.body
    if(!password || !email) return res.status(401).send({status: 'error', error: 'Debe ingresar todos los datos'})
        const userFound = await userService.getUser({email})
    if(!isValidPAssword({password: userFound.password}, password)) return res.status(401).send({status: 'error', error: 'credenciales invalidas'})
    /* req.session.user = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        
        email: req.body.email
    } 
    const token = generateToken({
        email,
        id: userFound._id,
        role: userFound.role
    })
    res
    .cookie('token', token, {
        maxAge: 60*60*1000*24,
        httpOnly: true
    })
    .send({status: 'success', message: 'usuario logueado'})

    //res.redirect('current')

   /*  const token = generateToken({
        id: req.user.id,
        email: req.user.email
    }) */
    //res.send({status: 'succes', payload: req.user})
   /*  const {limit, numPage, order, filter } = req.query
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
})*/

sessionsRouter.post('/login', async (req, res) => {
    const {email, password} = req.body

    // validar si vienen los datos
    if(!email || !password) return res.status(401).send({status: 'error', error: 'se debe completar todos los datos'})

    const userFound = await userService.getUserBy({email})

    if(!userFound) return res.status(400).send({status: 'error', error: 'usuario no encontrado'})

    //const isValid = isValidPAssword(password, { password: userFound.password }) // return bool true/false
    
    //if(!isValidPAssword(password, { password: userFound.password })) return res.status(401).send({status: 'error', error: 'Pasword incorrecto'})
    if(!isValidPAssword(userFound, password)) return res.status(401).send({status: 'error', error: 'credenciales invalidas'})

    // req.session.user = {
    //     email,
    //     admin: userFound.role === 'admin'
    // }

    // console.log(req.session.user)
    const token = generateToken({
        id: userFound._id,
        email,
        role: userFound.role 
    })


    res.cookie('token', token, {
            maxAge: 60*60*1000*24,
            httpOnly: true
        }).send({status: 'success'})
})

sessionsRouter.post('/faillogin', (req, res) => {
    res.send({error: 'falló el login'})
})

/* sessionsRouter.get('/current', passportCall('jwt') , authorization('user'),  async (req, res) => {
    console.log(req.user)
    res.send('datos sensibles')
}) */



sessionsRouter.get('/logout', (req, res) => {
    req.session.destroy( err => {
        if(err) return res.send({status: 'error', error: err})
        else  res.redirect('../../login')
    })
})



