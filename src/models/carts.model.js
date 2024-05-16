import { Schema, model } from 'mongoose';

const cartsSchema = new Schema({
    id_product: {
        type: String,
        unique: true,
        required: true
    },
    products: Array,
})

const cartsModel = model('carts', cartsSchema)

export default cartsModel