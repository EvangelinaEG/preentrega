import { Router } from 'express'
import UserController from '../../controllers/users.controllers.js'
import { atuhorization } from '../../utils/authorizationJwt.js'
import { __dirname } from './../../utils/utils.js'
import { uploader } from './../../utils/multer.js'
const router = Router()

const {
    getUser,
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    autorizacion,
    autenticacion,
    updateRole,
    logout,
    documents,
    deleteAll
} = new UserController()

router.get('/',                 getUsers)
router.post('/',                createUser)
router.delete('/deleteInactive', deleteAll)
//router.put('/premium/:uid',     updateRole)
router.post('/updateRole/:uid',     updateRole)
router.get('/autorizacion',     autorizacion)
router.get('/autenticacion',    autenticacion)
router.get('/logout',           logout)
router.get('/:uid',             getUser)
router.post('/:uid/documents', uploader.single('myFile'), documents)
router.put('/:uid',             updateUser)
router.delete('/:uid',          deleteUser) 



export default  router