import {Schema, model} from 'mongoose'

const OrderSchema = new Schema({
    code: String, // se autogenera y es unico
    purchase_datetime: date, // fecha y hora que se realizo la compra
    amount: Number, //total de la compra
    purchaser: String //correo asociado al carrito
})

const orderModel = model('order', OrderSchema)
export default orderModel