//import UserDto from "../dto/user.dto.js"
//import  UsersManagerMongo  from "../dao/MONGO/usersMongo.manager.js"


class UserRepositories { 
    constructor(dao){
        this.dao =  dao
    }

    async getUsers(limit, page){
        try {
            return await  this.dao.get(limit, page)            
        } catch (error) {
            return error
        }
    }
    
    async getBy(email){
        try {
            return await  this.dao.getUserByEmail(email)   
        } catch (error) {
            console.log(error)
        }
    }

    async getById(id){
        try {
            return await  this.dao.getBy(id)   
        } catch (error) {
            console.log(error)
        }
    }
    
    async createUser(user){
        try {
            const newUser = new UserDto(user)
            return await  this.dao.create(newUser)       
        } catch (error) {
            return error
        }
    }
    

    async updateUser(user){
        try {
            const updUser = new UserDto(user)
            return await  this.dao.update(updUser)       
        } catch (error) {
            return error
        }
    }    
    async deleteUser(){}    
}

export default UserRepositories