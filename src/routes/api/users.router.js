import { Router } from 'express'
import UserController from '../../controllers/users.controllers.js'
import { atuhorization } from '../../utils/authorizationJwt.js'

const router = Router()

const {
    getUser,
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    autorizacion,
    autenticacion,
    logout
} = new UserController()

router.get('/',                 getUsers)
router.post('/',                createUser)
router.get('/autorizacion',     autorizacion)
router.get('/autenticacion',    autenticacion)
router.get('/logout',           logout)
router.get('/:uid',             getUser)
router.put('/:uid',             updateUser)
router.delete('/:uid',          deleteUser)


export default  router