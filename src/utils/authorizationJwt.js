export const atuhorization = (...roles) => {
    return async (req, res, next) => {
        console.log(req.user.user.role)
        if (!req.user.user) return res.status(401).redirect("/autorizacion")
        if(!roles.includes(req.user.user.role))  return    res.status(401).redirect("/autenticacion")
        next()
    }
}

