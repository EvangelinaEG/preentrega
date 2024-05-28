import  userModel  from "../models/users.model.js"

export class UsersManagerMongo {
    constructor() {
      this.userModel = userModel;
    }

    async getUsers({limit = 10, numPage=1}) {
        // const users =  await this.userModel.find().lean()
        const users =  await this.userModel.paginate({}, {limit, page: numPage, sort: {price: -1}, lean: true })
        return users
    }

    async getUserBy(filter){
      return this.userModel.findOne(filter)
    }
  
    async createUser(newUser) {
        return await this.userModel.create(newUser)
    }
  
    async getUserById(id) {
      return this.userModel.findById({ _id: id });
    }
  
    async getUserByEmail(email) {
      return this.users.find((user) => user.email === email);
    }  
  
  }

