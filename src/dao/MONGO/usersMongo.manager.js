import  userModel  from "./models/users.model.js"

class UsersManagerMongo {
    constructor() {
      this.userModel = userModel;
    }

    getAll = async ({limit = 10, numPage=1}) => {

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

    delete = async (id) => {
      const user = await this.userModel.findByIdAndDelete(id);
      return user;
    }

    deleteAll = async () => {
      const twoDaysAgo = new Date();
      twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
  
      const result = await this.userModel.deleteMany({
          last_connection: { $lt: twoDaysAgo }
      });

      return result;
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
    updateRole = async (user, role) => {
    
      return await this.userModel.updateOne(
        { _id: user._id }, 
        { $set: { role: role } } 
      );
    
    }

    
  
  }

export default UsersManagerMongo