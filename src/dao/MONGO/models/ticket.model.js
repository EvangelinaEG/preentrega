import {Schema, model} from 'mongoose'

const TicketSchema = new Schema({
    code: String, 
    purchase_datetime: {
        type: Date,
        default: Date.now 
    },
    amount: Number, //total de la compra
    purchaser: String //correo asociado al carrito
})

const ticketModel = model('ticket', TicketSchema)
export default ticketModel