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


/* export const authorization = role => {
    console.log(role)
    return async (req, res, next) => {
        console.log(req.user)
        // repetido 
        if (!req.user) return res.status(401).send({error: 'Unauthoized'})
        if(req.user.user.role !== role)  return    res.status(401).send({error: 'Not permissions'})
        next()
    }
} */

/*  export const authorization = (role) => {
    return async (req, res, next) => {
        if(roles[0].toUpperCase() === 'PUBLIC') return next()
        if(!req.user) return res.status(401).send({status: 'error', error: 'Unauthorized' })
        if(req.user.role !== role) return res.status(401).send({status: 'error', error: 'Not permissions' })
       if(roles.toUpperCase().includes(req.user.role.toUpperCase())) return res.status(401).send({status: 'error', error: 'Not permissions' })
                next()
    }
}  */

    export const authorization = role => {
        return async (req, res, next) => {
            console.log(req.user);
            // Verifica si el usuario está autenticado
            if (!req.user) {
                return res.status(401).send({ error: 'Unauthorized' });
            }
    
            // Verifica si el rol del usuario coincide con el rol requerido
            if (req.user.role !== role) {
                return res.status(401).send({ error: 'No permissions' });
            }
    
            // Si el usuario está autenticado y tiene el rol adecuado, pasa al siguiente middleware
            next();
        };
    };