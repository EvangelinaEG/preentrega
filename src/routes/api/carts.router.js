import { Router } from 'express'
import cartController from '../../controllers/carts.controllers.js'

const router = Router()

const {
    getcarts,
    getcart,
    createcart,
    updatecart,
    deletecart,
    checkoutCart
} = new cartController()

router.get('/',                         getcarts)
router.post('/',                        createcart)
router.get('/cart',                     getcart)
router.post('/products/:pid',      updatecart)
router.get('/delete/:pid',              deletecart)
router.get('/:cid/purchase',           checkoutCart)

export default router