class CartRepositories {

    constructor(dao){
        this.cartDao = dao
    }

    async getCarts(){
        try {
            let res = await this.cartDao.getAll()
            console.log(res)
            return res
        } catch (error) {
            return new Error(error)
        }
    } 

    async getCart(cid){
        try {
            const cart = await this.cartDao.get(cid)  
            console.log(cart)
            return cart         
        } catch (error) {
            return new Error(error)
        }
    } 

    async createCart(userEmail){
        try {
            return await this.cartDao.create(userEmail)            
        } catch (error) {
            return new Error(error)
        }
    } 

    async addProductToCart(cid, product){
        try {
            return await this.cartDao.add(cid, product)
        } catch (error) {
            return new Error(error)
        }
    }

    async deleteProductFromCart(cid, pid){
        try {
            return await this.cartDao.delete(cid, pid)
        } catch (error) {
            return new Error(error)
        }
    }

    async deleteCart(cid){
        try {
            return await this.cartDao.delete(cid)
        } catch (error) {
            return new Error(error)
        }
    }
   
    checkoutCart = async (req, res) => {
        const {cid} = req.params
        console.log(cid)
        res.json({
            status: 'success',
            message: 'Purchase completed successfully',
        })
    }

} 

export default CartRepositories