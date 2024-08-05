
class ProductRepositories { 
    constructor(dao){
        this.dao = dao
    }

    async getProducts(objConfig){
        
        try {
            objConfig.limit = objConfig.limit &&  parseInt(objConfig.limit)
            objConfig.page  = objConfig.page  && parseInt(objConfig.page)
            objConfig.sort  = objConfig.sort  && parseInt(objConfig.sort)
            return await this.dao.getAll(objConfig)            
        } catch (error) {
            return error
        }
    }

    async getProduct(pid){
        try {
            return await this.dao.getById(pid)
        } catch (error) {
            return error
        }
    }
    
    async createProduct(newProduct){
       
        try {            
            return await this.dao.create(newProduct)                         
        } catch (error) {
            return error
        }
    }

    async updateProduct(pid){
        try {
            const result = await this.dao.updateStock(pid._id)
            return result
        } catch (error) {
            return error
        }
       
    } 

    async deleteProduct(pid){
        try {
            return await this.dao.removeProduct(pid)
        } catch (error) {
            return error
        }
    }    
}

export default ProductRepositories