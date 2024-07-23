// session -> login - register - logout
import { Router} from 'express'
//import { UsersManagerMongo } from '../../dao/MONGO/usersMongo.manager.js'
//import { auth } from '../middlewares/auth.middleware.js'
//import { createhash, isValidPassword }  from '../../utils/bcrypt.js'
import passport from 'passport'

import { passportCall } from '../../utils/passportCall.js'
import { atuhorization } from '../../utils/authorizationJwt.js'
import SessionsController from '../../controllers/sessions.controllers.js'

const sessionsRouter = Router()
const {
    login,
    register,
    logout,
    currentUser,
    autorizacion,
    autenticacion
} = new SessionsController()

sessionsRouter.get('/github', passport.authenticate('github', {scope: 'user:email'}), async (req, res)=>{})
sessionsRouter.get('/githubcallback', passport.authenticate('github', {failureRedirect: '/login'}), (req,res) =>{
    req.session.user = req.user
    res.redirect('/products')
})
sessionsRouter.post('/register', register)
sessionsRouter.post('/login', login)

 //sessionssessionsRouter.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
sessionsRouter.get('/logout', logout)



sessionsRouter.get('/current', passportCall('jwt'), atuhorization('user','admin'), currentUser)

export default sessionsRouter