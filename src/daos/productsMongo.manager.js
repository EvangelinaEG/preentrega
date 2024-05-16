import productsModel from "./../models/products.model.js";

export default class ProductsManagerMongo{
    constructor(){
        this.productsModel = productsModel;
    }

    async createProduct(product){
        return await this.productsModel.create(product)
    }

    async getProductById(id){
        return await this.productsModel.findById({ _id: id })
    }

    async getProductByName(name){
        return await this.productsModel.find((product) => product.name === name)
    }

    async getProducts(){
        return await this.productsModel.find()
    }

    
    async  getProducts({limit = 10, numPage=1}) {
        const products =  await this.productsModel.paginate({}, {limit, page: numPage, sort: {price: -1}, lean: true })
        return products
    }
}