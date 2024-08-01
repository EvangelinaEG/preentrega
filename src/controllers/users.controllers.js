//import { UsersManagerMongo } from "../daos/usersManagerMongo"
import { userService } from "../service/index.js"

class UserController{
    constructor(){
        this.userService = userService
    }
    getUsers    = async (req,res, next) => {
        try{
            const users = await this.userService.getUsers()
            res.send(users) 
        }catch(error){
            next(error); 
        }
    } 
    getUser     =  async (req, res, next) => {
        
        try{
            const { uid } = req.params
            const userFound = await this.userService.getById({_id: uid})
            res.send({status: 'success', payload: userFound})
            
        }catch(error){
            next(error); 
        }
    }
    createUser  = async (req, res, next) => {
        try{
                
            const { first_name, last_name, email} = req.body
            if(!email) return res.send({status: 'error', error: 'faltan campos'})
            
            // persistencia en mongo -> atlas
            const newUser = new UserDao ({
                first_name,
                last_name,
                email
            })
            
            
            const result = await this.userService.createUser(newUser)
            // validar el result
            res.status(200).send({ status: 'success', payload: result })
        }catch(error){
            next(error); 
        }
    }
    updateUser  = async (req, res) => {
        try{
            if(!email) return res.send({status: 'error', error: 'faltan campos'})
            const result = await this.userService.updateUser(req.body)
            res.status(200).send({ status: 'success', payload: result })
        }catch(error){
            next(error); 
        }
    }
    
    deleteUser = (req, res) => {
        res.send('delete User')
    }

    autenticacion = async (req, res) => {
        try{
            res.render("autenticacion")
        }catch(error){
            console.log(error)
        }
        
    }

    autorizacion = async (req, res) => {
        try{
            res.render("autorizacion")
        }catch(error){
            console.log(error)
        }
       
    }

    logout = async (req, res) => {
        try{
            res.cookie('token', "", {
                maxAge: -1,
                httpOnly: true
            }).redirect("/login")
        }catch(error){
            console.log(error)
        }
    }

}

export default UserController