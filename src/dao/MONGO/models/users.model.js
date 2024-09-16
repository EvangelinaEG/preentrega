import pkg from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const { Schema, model, models } = pkg;

const userCollection = 'users';

const userSchema = new Schema({
    fullName: {
        type: String,
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
    password: {
        type: String,
        required: true, 
    },
    cartId: {
        type: Schema.ObjectId,
        ref: 'carts'
    },
    role: {
        type: String,
        enum: ['user', 'premium', 'admin', 'public'],
        default: 'user'
    },
    documents: {
        type: [{
            name: String,
            reference: String
        }]
    },
    last_connection: Date
});

userSchema.plugin(mongoosePaginate);

const userModel = models[userCollection] || model(userCollection, userSchema);

export default userModel;
