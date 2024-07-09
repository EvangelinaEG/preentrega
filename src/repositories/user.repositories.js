//import { logger } from '../middleware/logger'

class UserRepositories { 
    constructor(dao){
        this.dao = dao
    }

    async getUsers(limit, page){
        try {
            return await this.dao.get(limit, page)            
        } catch (error) {
            return error
        }
    }

    async getUser(email){
        try {
            return await this.dao.getBy(email)   
        } catch (error) {
            logger.error(error)
        }
    }
    
    async createUser(user){
        try {
            const newUser = new UserDto(user)
            return await this.dao.create(newUser)       
        } catch (error) {
            return error
        }
    }

    async updateUser(){}    
    async deleteUser(){}    
}

export default UserRepositories