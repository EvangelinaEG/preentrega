import { Router } from 'express'
import ProductController from '../../controllers/products.controllers.js'
import { passportCall } from '../../utils/passportCall.js'
import { atuhorization } from '../../utils/authorizationJwt.js'

const router = Router()

const {
    getproducts,
    getProductById,
    updateproduct,
    deleteproduct,
    createproduct,
} = new ProductController()

router.get('/products',  getproducts)
router.post('/products', passportCall('jwt'), atuhorization('admin'), createproduct)
router.get('/products/:pid', passportCall('jwt'), atuhorization('user'), getProductById)
router.put('/products/:pid', passportCall('jwt'), atuhorization('admin'), updateproduct)
router.delete('products/:pid', passportCall('jwt'), atuhorization('admin'), deleteproduct)


export default router