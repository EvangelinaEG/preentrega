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
        return await this.userModel.create(newUser)
    }
  
    getBy = async (id) => {
      return await this.userModel.findById({ _id: id })
    } 
  
    getUserByEmail = async (email) => {
      return await this.userModel.findOne({email:email.email})
    }  
  
  }

export default UsersManagerMongo