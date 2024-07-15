import pkg from 'mongoose';

const { Schema, model, models } = pkg;

const cartCollection = 'carts';

const CartSchema = new Schema({
    products: {
        type: [{
            product: {
                type: Schema.Types.ObjectId,
                ref: 'products'
            },
            quantity: Number
        }]
    }
});

CartSchema.pre('find', function() {
    this.populate('products.product');
});

const cartsModel = models[cartCollection] || model(cartCollection, CartSchema);

export default cartsModel;
