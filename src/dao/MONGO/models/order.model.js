import {Schema, model} from 'mongoose'

const OrderSchema = new Schema({
    code: String, 
    purchase_datetime: {
        type: Date,
        default: Date.now 
    },
    amount: Number, //total de la compra
    purchaser: String //correo asociado al carrito
})

const orderModel = model('order', OrderSchema)
export default orderModel