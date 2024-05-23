import { Router } from 'express'
import CartManagerMongo from '../../daos/cartsMongo.manager.js'
// import { cartsModel } from '../models/carts.model'
import { cookie } from '../../middlewares/auth.middleware.js'


const router = Router()
const cartService = new CartManagerMongo()

router.get('/carts', async (req, res)=>{
    const carts = await cartService.getCarts()
    res.send(carts)
})
router.post('/carts', async (req, res)=>{
    const carts = await cartService.getCarts()
    let cart = {}
    if(carts.length === 0){
        cart = await cartService.createCart()
    }
    res.send(cart)
})

router.get('/cart', async (req, res)=>{
    const {cid } = req.params
    const cart = await cartService.getCart({ cid })
    res.send(cart)
})

router.post('/:cid/products/:pid', async (req, res)=>{
    const {cid, pid} = req.params

    const result = await cartService.addProduct(cid, pid)
    res.send(result)
})

router.delete('/:cid/products/:pid', async (req, res)=>{
    const {cid, pid} = req.params
console.log("paso por aca")
    const result = await cartService.deleteProduct(cid, pid)
    res.send(result)
})

export default router