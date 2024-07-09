export const atuhorization = role => {
    return async (req, res, next) => {
        if (!req.user.user) return res.status(401).send({error: 'Unauthoized'})
        if(req.user.user.role !== role)  return    res.status(401).send({error: 'Not permissions'})
        next()
    }
}