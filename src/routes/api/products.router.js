import { Router } from 'express'
import ProductController from '../../controllers/products.controllers.js'

const router = Router()

const {
    getproducts,
    getProductById,
    updateproduct,
    deleteproduct,
    createproduct,
} = new ProductController()

router.get('/products',  getproducts)
router.post('/products', createproduct)
router.get('/products/:pid', getProductById)
router.put('/products/:pid', updateproduct)
router.delete('products/:pid', deleteproduct)


export default router