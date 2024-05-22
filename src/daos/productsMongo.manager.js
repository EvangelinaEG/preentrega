import productsModel from "./../models/products.model.js";

export default class ProductsManagerMongo{
    constructor(){
        this.productsModel = productsModel;
    }

    async createProduct(product){
        return await this.productsModel.create(product)
    }

    async getProductById(id) {
        return this.productsModel.findById({ _id: id });
    }

    async getProductByName(name){
        return await this.productsModel.find((product) => product.name === name)
    }

     
    async  getProducts({limit = 4, numPage=1, order = -1, filter = null}) {
        let products = []
        if(filter === null){
            products =  await this.productsModel.paginate({}, {limit, page: numPage, sort: { price: parseInt(order) }, lean: true })
        }else{
            products =  await this.productsModel.paginate({category: filter}, {limit, page: numPage, sort: {price: 'asc'}, lean: true })
        }
        return products
    }
}