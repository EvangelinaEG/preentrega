import { Schema, model } from 'mongoose'

const messageSchema = new Schema({
    user: {
        type: String,
        unique: true, 
        required: true
    },
    message: String
})

const mesageModel = model('message', messageSchema)

export default {
    messageModel
}