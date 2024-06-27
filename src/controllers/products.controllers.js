import { productService } from "../service/index.js"

class ProductController{
    constructor(){
        this.productService = productService
    }

    getproducts    = async (req,res) => {
        try{
            const products = await this.productService.getProducts()
            res.send({status: 'success', products})
        }catch(error){
            console.log(error)
        }
    } 
    getproduct     =  async (req, res) => {
        try{
            const { uid } = req.params
            const productFound = await this.productService.getproductBy({_id: uid})
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
        const productFound = await this.productService.getProductById(pid)
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
        const result = await this.productService.createProduct(body)
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
            const result = await this.productService.deleteProduct({ _id: pid });
            res.send({status: 'success', data: result})
        }catch(error){
            console.log(error)
        }
    }

}

export default ProductController