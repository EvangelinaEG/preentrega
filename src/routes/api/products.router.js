import { Router } from 'express';
//import  ProductsManagerFS  from '../../daos/productsMongo.manager.js';
import  ProductsManagerMongo  from '../../daos/productsMongo.manager.js';

const productsManager = new ProductsManagerMongo();
const productsRouter = Router()

productsRouter.get('/products', async(req, res) => {
    const products = await productsManager.getProducts();
    res.send({status: 'success', products})
})

productsRouter.post('/products', async (req, res) => {
    const { body } = req
    const result = await productsManager.createProduct(body)
    res.send({status: 'success', data: result})
})

productsRouter.get('/products/:pid', async (req, res) => {
    const { pid } = req.params
    const productFound = await productsManager.getProductById(pid)
    res.send({status: 'success', payload: productFound})
})

productsRouter.put('/products/:pid', async (req, res) => {
    const { body } = req
    const result = await productsManager.updateProduct({ body });
    res.send({status: 'success', data: result})
})
productsRouter.delete('products/:pid', async(req, res) => {
    const result = await productsManager.deleteProduct({ _id: pid });
    res.send({status: 'success', data: result})
})


export default productsRouter