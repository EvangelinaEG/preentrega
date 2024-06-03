import { Router } from 'express'
import  usersModel  from './../../models/users.model.js'

const router = Router()

router.post('/', async (req, res) => {
    
      console.log(first_name, last_name, email, password)
     const { first_name, last_name, email} = req.body
     if(!email) return res.send({status: 'error', error: 'faltan campos'})
   
     // persistencia en mongo -> atlas
     const newUser = {
         first_name,
         last_name,
         email
     }
    
     const result = await userModel.create(newUser)
     // validar el result
     res.status(200).send({ status: 'success', payload: result })
})
    
router.get('/', async(req, res) => {
    const users = await usersModel.find({})
    res.send({status: 'success', users})
})

router.post('/', async (req, res) => {
    const { body } = req
    const result = await usersModel.create(body)
    res.send({status: 'success', data: result})
})

router.get('/:uid', async (req, res) => {
    const { uid } = req.params
    const userFound = await usersModel.findOne({_id: uid})
    res.send({status: 'success', payload: userFound})
})
router.put('/:uid', (req, res) => {
    res.send('update User')
})
router.delete('/:uid', (req, res) => {
    res.send('delete User')
})


export default  router