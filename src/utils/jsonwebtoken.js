import jwt from 'jsonwebtoken'

export const PRIVATE_KEY = 'CoderKeyS@secretToken'

export const generateToken = user => jwt.sign({user}, PRIVATE_KEY, {'expiresIn': '24h'})

/* export const authTokenMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization
    if(!authHeader) return res.status(401).send({status: 'error', error: 'not authenticated'})
    const token = authHeader.split(' ')[1]
    jwt.verify(token, PRIVATE_KEY, (error, credential) => {
        if(error) return res.status(401).send({status: 'error', error: 'Not authorized'})
        req.user = credential.user
        next()
    })
} */

