import pkg from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const { Schema, model, models } = pkg;

const userCollection = 'users';

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
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
    age: Number,
    password: String,
    cartId: {
        type: Schema.ObjectId,
        ref: 'carts'
    },
    role: {
        type: String,
        enum: ['user', 'user_premium', 'admin'],
        default: 'user'
    }
});

userSchema.plugin(mongoosePaginate);

const userModel = models[userCollection] || model(userCollection, userSchema);

export default userModel;
