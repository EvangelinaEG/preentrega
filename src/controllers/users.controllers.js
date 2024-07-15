//import { UsersManagerMongo } from "../daos/usersManagerMongo"
import { userService } from "../service/index.js"

class UserController{
    constructor(){
        this.userService = userService
    }
    getUsers    = async (req,res) => {
        try{
            const users = await this.userService.getUsers()
            res.send(users) 
        }catch(error){
            console.log(error)
        }
    } 
    getUser     =  async (req, res) => {
        try{
            const { uid } = req.params
            const userFound = await this.userService.getUserBy({_id: uid})
            res.send({status: 'success', payload: userFound})
        }catch(error){
            console.log(error)
        }
    }
    createUser  = async (req, res) => {
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
            console.log(error)
        }
  }
    updateUser  = (req, res) => {
        res.send('update User')
    }
    deleteUser = (req, res) => {
        res.send('delete User')
    }

}

export default UserController