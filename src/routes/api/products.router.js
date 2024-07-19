import { Router } from 'express'
import ProductController from '../../controllers/products.controllers.js'
import { passportCall } from '../../utils/passportCall.js'
import { atuhorization } from '../../utils/authorizationJwt.js'
import { generateUsers } from '../../utils/generateProductsMock.js'


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
router.get("/mockingproducts", (req, res) => {
    let products = []

    for(let i=0; i< 100; i++){
        products.push(generateUsers())
    }


    res.send({
        status: 'success',
        payload: products
    })
})


export default router