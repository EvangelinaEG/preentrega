import { Router, response } from "express";
import { RouterClass } from "./router.js";

export default class SessionRouter extends RouterClass{
    init(){
        this.get('/', ['PUBLIC'], (req, res) => {
            try{
                const response = 'hola coder'
                res.sendSuccess(response)
            }catch(error){
                res.sendServerError(error)
            }
        })
    }
}
