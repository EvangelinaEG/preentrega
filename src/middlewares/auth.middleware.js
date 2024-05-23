export function auth(req, res, next) {
    if(req.session?.user?.email === 'fede@gmail.com' && req.session?.user?.admin) {
        return next()
    }

    return res.status(401).send('error de autorización')
}

export function cookie(req, res, next) {
    // res vamos a mandar una orden al navegador / 10000 ms -> 10 seg
    res.cookie('Carrito', 'carrito', {maxAge: 10000000, signed: true}).send('cookie signed')
    return next()
}