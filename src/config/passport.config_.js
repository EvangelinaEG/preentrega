import passport from 'passport'
import local from 'passport-local'
import { UsersManagerMongo } from '../daos/usersManagerMongo.js'
import { createhash, isValidPAssword } from '../utils/bcrypt.js'
import GithubStrategy from 'passport-github2'
import {Strategy, ExtractJwt} from 'passport-jwt'
import { PRIVATE_KEY } from '../utils/jsonwebtoken.js'

//const LocalStrategy = local.Strategy
const JWTStrategy = Strategy
const JWTExtract = ExtractJwt

/* const cookieExtractor = req => {
    let token = null
    if(req && req.cookie) token = req.token['token']
    return token
} */
const userService = new UsersManagerMongo()

/* export const initializePassport = () => {
    passport.use('jwt', new JWTStrategy({
        jwtFromRequest : JWTExtract.fromExtractors([cookieExtractor]),
        secretOrKey: PRIVATE_KEY
    }, async (jwt_payload, done) => {
        try{
            return done(null, jwt_payload)
        }catch(error){
            return done(error)
        }
    })) */

    /* passport.use('github', new GithubStrategy({
        clientID:'Iv23lirV47QLz4G3LPSu',
        clientSecret: '31ac728131e4d0f15492633bb3b147d525cf7cca',
        callbackURL:'http://localhost:8080/api/sessions/githubcallback'
    }, async (accessToken, refreshToken, profile, done) =>{
        try{
            let user  = await userService.getUserBy({email: profile._json.email})
            // no existe el usuario en nuestra base de datos
            if(!user){
                let newUser = {
                    first_name: profile._json.name,
                    last_name: profile._json.name,
                    email: profile._json.email,
                    password: ''
                }
                let result = await userService.createUser(newUser) 
                done(null, result)
            }else{
                done(null, user)
            }

        }catch(error){
            return done(error)
        }
    } )) */
    // middleware -> estrategia -> local -> username(email), password
    /*  passport.use('register', new LocalStrategy({
        passReqToCallback: true, // req -> body -> passaport -> obj Req
        usernameField: 'email'
    }, async( req, username, password, done ) => {
          const { first_name, last_name } = req.body
            try {
                // verificar si existe el usuario
                let userFound = await userService.getUserBy({email: username})
                if(userFound) {
                    console.log('el usuario ya existe')
                    
                    return done(null, false)
                }
                // crear el uusario 
                let newUser = {
                    first_name,
                    last_name,
                    email: username,
                    password: createhash(password)
                }
                let result = await userService.createUser(newUser) // _id
                return done(null, result)
            } catch (error) {
                return done('error al registrar el usuario '+error)   
            }
    }))


    passport.use('login', new LocalStrategy({
        usernameField: 'email'
    }, async(username, password, done)=>{
        try {
            const user = await userService.getUserBy({email: username})
            if(!user) {
                console.log('usuario no encontrado')
                
                return done(null, false)
            }
            if(!isValidPAssword(password, {password: user.password})) return done(null, false)
            return done(null, user) // req.user // password 
        } catch (error) {
            return done(error)
        }
    }))  */

   /*  passport.serializeUser((user, done)=>{
        done(null, user._id)
    }) // _id-> session

    passport.deserializeUser(async(id, done)=>{
        try {
            let user = await userService.getUserBy({_id: id})
            done(null, user)
        } catch (error) {
            done(error)
        }
    }) */ // session -> user


// const userService = new UsersManagerMongo()

export const initializePassport = () => {
    // jwt
    // función creada por nosotros para leer las cookie
    const cookieExtractor = req => {
        let token = null
        if (req && req.cookies) {
            token = req.cookies['token']
        }
        
        return token
    }

    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: JWTExtract.fromExtractors([cookieExtractor]),
        secretOrKey: PRIVATE_KEY
    }, async (jwt_payload, done) => {
        try {
            // Buscar el usuario en la base de datos usando jwt_payload
            const user = await UsersManagerMongo.findById(jwt_payload.id);
    
            if (!user) {
                return done(null, false, { message: 'Usuario no encontrado' });
            }
    
            // Si el usuario se encuentra, devolverlo
            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }));
}




