import { userService } from "../service/index.js"
import { createhash, isValidPassword } from '../utils/bcrypt.js'
import { generateToken } from '../utils/jsonwebtoken.js';

class SessionsController{
    constructor(){
        this.userService = userService
    }

    currentUser = async (req, res) => {
        console.log(req.body)
    }

    register = async (req, res) => {
        try {
            const { first_name, last_name, email, password } = req.body
            
            // validar si vienen los datos
            if(!email || !password) return res.status(401).send({status: 'error', error: 'se debe completar todos los datos'})
        
            //validar si existe el usuario
            const userExist = await this.userService.getBy({email})
            if(userExist) return res.status(401).send({status: 'error', error: 'el usuario ya existe'})
        
            const newUser = {
                first_name,
                last_name, 
                email, 
                password: createhash(password) // lo vamos a encriptar
            }
        
            const result = await this.userService.createUser(newUser)
            // datos de dentro del token
            const token = generateToken({
                id: result._id,
                email
            })
        
            res.send({status: 'success', token})
            
        } catch (error) {
            console.log(error)
        }
    }

    login = async  (req, res) => {
        const {email, password} = req.body
    
        // validar si vienen los datos
        if(!email || !password) return res.status(401).send({status: 'error', error: 'se debe completar todos los datos'})
    
       const userFound = await this.userService.getBy({email})
       
        if(!userFound) return res.status(400).send({status: 'error', error: 'usuario no encontrado'})
           
         const isValid = isValidPassword(password, { password: userFound.password }) // return bool true/false
        
        if(!isValid) return res.status(401).send({status: 'error', error: 'Pasword incorrecto'})
    
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
            }).redirect("/products")
            
    }
    
    logout = async (req, res) => {
        try{
            req.session.destroy( err => {
                if(err) return res.send({status: 'error', error: err})
                else return res.redirect('/login')
            })
        }catch(error){
            console.log(error)
        }
    }

}

export default SessionsController