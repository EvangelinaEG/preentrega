import { userService } from "../service/index.js"
import { createhash, isValidPassword } from '../utils/bcrypt.js'
import { generateToken } from '../utils/jsonwebtoken.js';
import sendEmail from '../utils/sendEmail.js'; 
import jwt from 'jsonwebtoken';



class SessionsController{
    constructor(){
        this.userService = userService

    }
    
    currentUser = async (req, res) => {
        res.send('Acceso permitido')
    }


    register = async (req, res, next) => {
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
                password: createhash(password), // lo vamos a encriptar
                role: "admin"
            }
            
            const result = await this.userService.createUser(newUser)
            // datos de dentro del token
            const token = generateToken({
                id: result._id,
                email
            })
        
            res.send({status: 'success', result})
            
        } catch (error) {
            next(error); 
        }
    }

    resetPass = async (req, res, next) =>{
        try{
            res.render("reset")
        }catch{
            next(error)
        }
    }

    

    resetPassword = async (req, res, next) =>{
        try{
            const {email, reemail} = req.body
            
            if(email === reemail){

                if(email === reemail){
                    let html = '</h6><a href="http://localhost:3000/restart" target="_blank">Clic aqui para Reestablecer clave</a>'
                    sendEmail({userEmail: email, subject: "Reestablecer clave", html })
                }
                const userFound = await this.userService.getBy({email})
                
                if(!userFound) return res.status(400).send({status: 'error', error: 'El email es incorrecto'})
                
                    if(userFound){
                        const payload = {
                            id: userFound._id,
                            email,
                            role: userFound.role
                        }
                        
                        const token = jwt.sign(payload, process.env.PRIVATE_KEY, { expiresIn: '1h' });
                        res.cookie('restart_token', token,  {
                                maxAge: 3600000,
                                httpOnly: true
                            }).redirect("/sendEmail")
                    }else{
                        res.send("El email no coincide")
                    }
                
            }else{
                res.send("Las claves no coinciden")
            }

            
        }catch{
           console.log(error)
        }
    }


    restPassword = async (req, res, next) => {
        try {
            const { password, repassword } = req.body;
            
            if (password === '' || repassword === '') {
                return res.status(400).send({ status: 'error', error: 'Las contraseñas no pueden nulas' });
            }

            if (password !== repassword) {
                return res.status(400).send({ status: 'error', error: 'Las contraseñas no coinciden' });
            }
            
            const token = req.cookies.restart_token;
            if (!token) {

                return res.status(401).send({ status: 'error', error: 'Token no proporcionado' });
            }
            
            const decoded = jwt.verify(token, process.env.PRIVATE_KEY);
           
            const userFound = await this.userService.getBy({ email: decoded.email });
            
            const isValid = isValidPassword(password, { password: userFound.password });
            if (isValid) {
               
                return res.status(401).send({ status: 'error', error: 'Debe seleccionar una clave distinta' });
            }
            
            const updUser = {
                id: decoded.id,
                password: createhash(password) 
            };
            const result = await this.userService.updateUser(updUser);
           
            return res.status(200).send({ status: 'success', payload: result });
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                return res.redirect('/api/sessions/reset_password');
            } else if (error.name === 'JsonWebTokenError') {
                return res.status(401).send({ status: 'error', error: 'Token inválido' });
            } else {
                return next(error);
            }
        }
    };


    login = async  (req, res, next) => {
        try{
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

        userFound.last_connection = new Date();
        await userFound.save();

        const token = generateToken({
            id: userFound._id,
            email,
            role: userFound.role
        })
        
        
        res.cookie('token', token, {
                maxAge: 60*60*1000*24,
                httpOnly: true
            }).redirect("/api/products")
        }catch(error){
            next(error); 
        }
            
    }
    
    logout = async (req, res, next) => {
        try {
            
            const token = req.cookies.token;
            if (!token) return res.redirect("/login");
            
            const decoded = verifyToken(token); 
            const userId = decoded.id;
    
            const userFound = await this.userService.getById(userId);
            if (!userFound) return res.redirect("/login");
    
            userFound.last_connection = new Date();
            await userFound.save();
    
            res.cookie('token', "", {
                maxAge: -1,
                httpOnly: true
            }).redirect("/login");
            
        } catch (error) {
            next(error);
        }
    }
    

}

export default SessionsController