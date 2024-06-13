import { Schema, model }  from "mongoose"
import mongoosePaginate from 'mongoose-paginate-v2'

const userCollection = 'users'

const userSchema = new Schema({
    first_name: {
        type: String,
        index: true
    },
    last_name: String,
    email: {
        type: String,
        required: true, 
        unique: true
    },
    age:Number,
    password: String,
    cartId: {
        type: Schema.ObjectId,
        ref: 'carts'
    },
    role:{
        type: String,
        enum: ['user', 'user_premium', 'admin'],
        default: 'user'
    } 
})
// odm 

userSchema.plugin(mongoosePaginate)

const userModel = model(userCollection, userSchema)
export default userModel
