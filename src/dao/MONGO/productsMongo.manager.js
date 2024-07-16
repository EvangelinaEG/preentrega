import productsModel from "./models/products.model.js";
 class ProductsManagerMongo{
    constructor(){
        this.productsModel = productsModel;
    }

    async create(product){
        return await this.productsModel.create(product)
    }

    async get(filter) {
        return this.productsModel.findById({ _id: filter });
    }

     async getBy(name){
        return await this.productsModel.find((product) => product.name === name)
    } 

     
    async getAll({limit = 4, numPage=1, order = -1, filter = null}) {
    
        let products = []
        
        if(filter === '' || filter === null){
            products =  await this.productsModel.paginate({}, {limit, page: numPage, sort: { price: parseInt(order) }, lean: true })
        }else{
            products =  await this.productsModel.paginate({category: filter}, {limit, page: numPage, sort: {price: 'asc'}, lean: true })
        }
        return products
    }
}

export default ProductsManagerMongo