import { Router } from 'express';


const viewsrouter = Router()

viewsrouter.get('/', (req, res)=>{
    res.render('index')
})
viewsrouter.get('/login', (req, res)=>{
    res.render('index')
})
viewsrouter.get('/register', (req, res)=>{
    res.render('index')
})
viewsrouter.get('/products', (req, res)=>{
    res.render('index')
})
viewsrouter.get('/prfile', (req, res)=>{
    res.render('./views/index')
})
viewsrouter.get('/prfile', (req, res)=>{
    res.render('index')
})



export default viewsrouter
