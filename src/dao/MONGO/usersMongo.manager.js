import  userModel  from "./models/users.model.js"

class UsersManagerMongo {
    constructor() {
      this.userModel = userModel;
    }

    getAll = async ({limit = 10, numPage=1}) => {
        // const users =  await this.userModel.find().lean()
        const users =  await this.userModel.paginate({}, {limit, page: numPage, sort: {price: -1}, lean: true })
        return users
    }

    get = async (filter) => {
      return await this.userModel.findOne(filter)
    }
  
    create = async (newUser) => {
        const user = await this.userModel.create(newUser)
        return user
    }
  
    getBy = async (id) => {
      return await this.userModel.findById({ _id: id })
    } 
  
    getUserByEmail = async (email) => {
      return await this.userModel.findOne({email:email.email})
    }  

    update = async (updUser) => {
    
      return await this.userModel.updateOne(
        { _id: updUser.id }, 
        { $set: { password: updUser.password } } 
      );
    
    }
    updateRole = async (user) => {
    
      return await this.userModel.updateOne(
        { _id: user._id }, 
        { $set: { role: "premium" } } 
      );
    
    }

    updateRole = async (user) => {
      
      const currentUser = await this.userModel.findOne({ _id: user._id });
  
      if (!currentUser) {
        throw new Error("Usuario no encontrado");
      }
    
      const newRole = currentUser.role === "admin" ? "premium" : 
                      currentUser.role === "premium" ? "admin" : 
                      currentUser.role; 
                      console.log(newRole)
      return await this.userModel.updateOne(
        { _id: user._id }, 
        { $set: { role: newRole } }
      );
    };
  
  }

export default UsersManagerMongo