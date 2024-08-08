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
router.get('/:cid',                     getcart)
router.post('/:cid/products/:pid',      updatecart)
router.delete('/:cid/products/:pid',    deletecart)
router.get('/:cid/purchase',            checkoutCart)

export default router