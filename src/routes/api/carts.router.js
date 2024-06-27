import { Router } from 'express'
import cartController from '../../controllers/carts.controllers.js'

const router = Router()

const {
    getcarts,
    getcart,
    createcart,
    updatecart,
    deletecart,
} = new cartController()

router.get('/carts', getcarts )
router.post('/carts',  createcart)
router.get('/cart', getcart)
router.post('/:cid/products/:pid', updatecart)
router.delete('/:cid/products/:pid', deletecart)

export default router