const { Schema, model } = require('mongoose')

const messageSchema = new Schema({
    user: {
        type: String,
        unique: true, 
        required: true
    },
    message: String
})

const mesageModel = model('message', messageSchema)

module.exports = {
    messageModel
}