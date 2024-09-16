//import UserDto from "../dto/user.dto.js"
//import  UsersManagerMongo  from "../dao/MONGO/usersMongo.manager.js"


class UserRepositories { 
    constructor(dao){
        this.dao =  dao
    }

    async getUsers(limit, page){
        try {
            return await  this.dao.getAll(limit, page)            
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
            //const newUser = new this.dao(user)
            return await  this.dao.create(user)       
        } catch (error) {
            return error
        }
    }
    

    async updateUser(user){
        try {
            
            const result = await this.dao.update(user)
          
            return result;
        } catch (error) {
            console.error("Error actualizando el usuario:", error)
            throw new Error("Error actualizando el usuario: " + error.message);
        }
    }    
    async updateRole(uid, rol) {
        try {
            const role = rol;
            // Obtener el usuario por su uid
            let user = await this.dao.getBy(uid);
            
            if (!user) {
                throw new Error("Usuario no encontrado");
            }
            
            // Actualizar el rol del usuario a "premium"
            const result = await this.dao.updateRole(user, role);
            
            return result;
        } catch (error) {
            console.error("Error actualizando el usuario:", error);
            throw new Error("Error actualizando el usuario: " + error.message);
        }
    }
      
    async deleteUser(uid, rol){
        try {
            
            const role = rol;
            // Obtener el usuario por su uid
            let user = await this.dao.getBy(uid._id);
            
            if (!user) {
                throw new Error("Usuario no encontrado");
            }
            
            const result = await this.dao.delete(uid._id);
            
            return result;
        } catch (error) {
            console.error("Error eliminando el usuario:", error);
            throw new Error("Error eliminando el usuario: " + error.message);
        }
    }    
    async deleteAll(){
        try {
            let result = await this.dao.deleteAll();
            return result;
        } catch (error) {
            console.error("Error eliminando el usuario:", error);
            throw new Error("Error eliminando el usuario: " + error.message);
        }
    } 
}

export default UserRepositories