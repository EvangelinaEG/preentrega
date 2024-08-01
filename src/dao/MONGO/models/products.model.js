import pkg from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const { Schema, model, models } = pkg;

const productCollection = 'products';

const productSchema = new Schema({
    title: {
        type: String,
        index: true
    },
    description: String,
    price: String,
    thumbnails: Array,
    code: String,
    stock: {
        type: Number,
        index: true
    },
    status: Boolean,
    owner: String,
    category: {
        type: String,
        index: true
    }
});

productSchema.plugin(mongoosePaginate);

const productsModel = models[productCollection] || model(productCollection, productSchema);

export default productsModel;
