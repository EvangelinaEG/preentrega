import { Schema, model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2'

const productCollection = 'products'

const productSchema = new Schema({
    title: {
        type: String,
        index: true
    },
    description: String,
    price: Number,
    thumbnails: Array,
    code: String,
    stock: Number,
    status: Boolean,
    category: {
        type: String     
    }
})
productSchema.plugin(mongoosePaginate)

const productsModel = model(productCollection, productSchema)
export default productsModel