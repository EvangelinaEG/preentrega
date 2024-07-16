import { productService } from "../service/index.js"

class ProductController{
    constructor(){
        this.productService = productService
    }

    getproducts    = async (req,res) => {
        try{
            const {limit, numPage, order, filter } = req.query

            
            const  { docs, page, hasPrevPage, hasNextPage, prevPage, nextPage } = await productService.getProducts({limit, numPage, order, filter})

            res.render('products', {
               products: docs,
               page, 
               hasNextPage,
               hasPrevPage,
               nextPage,
               prevPage,
               limit: limit === null || limit === "" || typeof limit === "undefined" ? 4 : limit,
               contproducts: docs.length > 0,
               order: order === null || typeof order === "undefined"? -1 : order,
               filter: filter === null || filter === "" || typeof filter === "undefined"? null : filter,
               
           })
        }catch(error){
            console.log(error)
        }
    } 
    getproduct     =  async (req, res) => {
        try{
            const { uid } = req.params
            const productFound = await this.productService.getProduct({_id: uid})
            res.send({status: 'success', payload: productFound})
        }catch(error){
            console.log(error)
        }
    }
    createproduct  = async (req, res) => {
        try{
            const  socketServer  = req.socketServer 
            const messages = []
            socketServer.on('connection', socket => {
                alert('Cliente conectado post')
            
            })
            const result = await this.productService.createProduct(body)
            res.send({status: 'success', data: result})
        }catch(error){
            console.log(error)
        }
  }

  getProductById     =  async (req, res) => {
    try{
        const { pid } = req.params
        const productFound = await this.productService.getBy(pid)
        res.send({status: 'success', payload: productFound})
    }catch(error){
        console.log(error)
    }
}
updateproduct  = async (req, res) => {
    try{
        const  socketServer  = req.socketServer 
        const messages = []
        socketServer.on('connection', socket => {
            alert('Cliente conectado post')
        
        })
        const result = await this.productService.create(body)
        res.send({status: 'success', data: result})
    }catch(error){
        console.log(error)
    }
} 
  /*   updateproduct  = async (req, res) => {
        try{
            const { body } = req
            const result = await this.productService.updateProduct({ body });
            res.send({status: 'success', data: result})
        }catch(error){
            console.log(error)
        }
    } */
    deleteproduct = async (req, res) => {
        try{
            const result = await this.productService.delete({ _id: pid });
            res.send({status: 'success', data: result})
        }catch(error){
            console.log(error)
        }
    }

}

export default ProductController