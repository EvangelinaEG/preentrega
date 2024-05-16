import { Schema, model } from 'mongoose';

const productsSchema = new Schema({
    title: String,
    description: String,
    price: Number,
    code: String,
    stock: Number,
    status: Boolean,
    category: String
})

const productsModel = model('products', productsSchema)

export default productsModel
