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

    async getBy(code) {
        return await this.productsModel.findOne({ code: code }).lean(); // Utiliza findOne para encontrar un único documento
    }

    async updateStock(pid) {
        
        const product = await this.productsModel.findOne({ _id: pid })

        if (!product) {
            throw new Error('Producto no encontrado')
        }

        const stock = parseInt(product.stock, 10);
        let result = false
        if ( typeof product.stock === 'number' && product.stock > 0) {
           
            product.stock -= 1;
            result = await this.productsModel.updateOne(
                { _id: pid },
                { stock: product.stock }
            );
        }
         
        return result? result.modifiedCount : result;
    }
     
    async getAll({ limit = 4, numPage = 1, order = -1, filter = null } = {}) {
        let result = {};
        
        if (filter === '' || filter === null) {
            result = await this.productsModel.paginate({}, { limit, page: numPage, sort: { price: parseInt(order) }, lean: true });
        } else {
            result = await this.productsModel.paginate({ category: filter }, { limit, page: numPage, sort: { price: 'asc' }, lean: true });
        }
    
        return result.docs; // Devuelve solo el arreglo de documentos
    }
    
}

export default ProductsManagerMongo