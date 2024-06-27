import { Router } from 'express'
import UserController from '../../controllers/users.controllers.js'

const router = Router()

const {
    getUser,
    getUsers,
    createUser,
    updateUser,
    deleteUser
} = new UserController()

router.get('/',         getUsers)
router.post('/',        createUser)
router.get('/:uid',     getUser)
router.put('/:uid',     updateUser)
router.delete('/:uid',  deleteUser)


export default  router