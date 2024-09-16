import { CustomError } from "../service/errors/customerErrors.js"
import { EError } from "../service/errors/enum.js"
import { generateProductError } from "../service/errors/info.js"
import { productService, userService } from "../service/index.js"
import jwt from 'jsonwebtoken';
class ProductController{
    constructor(){
        this.userService = userService
        this.productService = productService
    }

    getproducts = async (req, res, next) => {
        try {
            const { limit, numPage, order, filter } = req.query;

            const products = await productService.getProducts({ limit, numPage, order, filter });
         
            return {
                payload: products, 
                page: numPage || 1,
                hasPrevPage: false, 
                hasNextPage: false, 
                prevPage: null,
                nextPage: null  
            };
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
    
    
    products = async (req, res, next) => {
      
        try {
            req.query.limit = req.query.limit ?? 4; 
            req.query.numPage = req.query.numPage ?? 1; 
            req.query.order = req.query.order ?? 1; 
            req.query.filter = req.query.filter ??  '';
            const { payload, page, hasPrevPage, hasNextPage, prevPage, nextPage } = await this.getproducts(req, res, next);
          
            const { limit, numPage, order, filter } = req.query;

            const token = req.cookies.token;
            //if (!token) return res.redirect("/login");
            if(token){
            const decoded = jwt.verify(token, process.env.PRIVATE_KEY);
          
            const userFound = await this.userService.getBy({ email: decoded.user.email });

            }
            res.render('products', {
                products: payload,
                page: page,
                hasNextPage: hasNextPage,
                hasPrevPage: hasPrevPage, 
                nextPage: nextPage,
                prevPage: prevPage,
                limit: limit === null || limit === "" || typeof limit === "undefined" ? 4 : limit,
                contproducts: payload.length > 0,
                order: order === null || typeof order === "undefined" ? -1 : order,
                filter: filter === null || filter === "" || typeof filter === "undefined" ? null : filter,
                user: typeof userFound === 'undefined' ? null: userFound
            });
        } catch (error) {
            console.log(error);
            next(error); 
        }
    }
    
    
    getproduct     =  async (req, res, next) => {
        try{
            const { uid } = req.params
            const productFound = await this.productService.getProduct({_id: uid})
            res.send({status: 'success', payload: productFound})
        }catch(error){
            console.log(error); 
        }
    }
    createproduct  = async (req, res, next) => {
       
        try{
            const { body } = req
           
            if( !body.title || !body.code || !body.price || !body.description ){
                CustomError.createError({
                    name: 'Error al crear un producto',
                    casuse: generateProductError(body.title, body.code, body.price, body.description),
                    message: 'Error al crear el producto',
                    code: EError.INVALID_TYPES_ERROR
                })
            }
          
           /*  const  socketServer  = req.socketServer 
            const messages = []
            socketServer.on('connection', socket => {
                alert('Cliente conectado post')
            
            }) */
            body.owner = req.user.user.email;
           
            const result = await this.productService.createProduct(body)
            res.send({status: 'success', data: result})
        }catch(error){
            console.log(error)
        }
  }

  getProductById     =  async (req, res, next) => {
        try{
            const { pid } = req.params
            const productFound = await this.productService.getProduct(pid)
            res.send({status: 'success', payload: productFound})
        }catch(error){
            console.log(error); 
        }
    }
updateproduct  = async (req, res, next) => {
    try{
        const { body } = req
        /* const  socketServer  = req.socketServer 
        const messages = []
        socketServer.on('connection', socket => {
            alert('Cliente conectado post')
        
        }) */
        if( !body.title || !body.code || !body.price || !body.description ){
            CustomError.createError({
                name: 'Error al actualizar un producto',
                casuse: generateProductError(body.title, body.code, body.price, body.description),
                message: 'Error al actualizar el producto',
                code: EError.INVALID_TYPES_ERROR
            })
        }
        const result = await this.productService.update(body)
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
    deleteproduct = async (req, res, next) => {
        try{
            const { pid } = req.params
            const result = await this.productService.deleteProduct({ _id: pid });
            res.send({status: 'success', data: result})
        }catch(error){
            next(error); 
        }
    }

}

export default ProductController