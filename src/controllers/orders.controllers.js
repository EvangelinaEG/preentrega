import { orderService } from "../service/index.js"

export default class OrderController{
    constructor(){
        this.orderService = orderService
    }

    getorders    = async (req,res) => {
        try{
            const orders = await this.orderService.getAll()
            res.send({status: 'success', orders})
        }catch(error){
            console.log(error)
        }
    } 
    getorder     =  async (req, res) => {
        try{
            const { uid } = req.params
            const orderFound = await this.orderService.get({_id: uid})
            res.send({status: 'success', payload: orderFound})
        }catch(error){
            console.log(error)
        }
    }
    createorder  = async (req, res) => {
        try{
            const  socketServer  = req.socketServer 
            const messages = []
            socketServer.on('connection', socket => {
                alert('Cliente conectado post')
            
            })
            const result = await this.orderService.create(body)
            res.send({status: 'success', data: result})
        }catch(error){
            console.log(error)
        }
  }

  getorderById     =  async (req, res) => {
    try{
        const { pid } = req.params
        const orderFound = await this.orderService.getBy(pid)
        res.send({status: 'success', payload: orderFound})
    }catch(error){
        console.log(error)
    }
}
updateorder  = async (req, res) => {
    try{
        const  socketServer  = req.socketServer 
        const messages = []
        socketServer.on('connection', socket => {
            alert('Cliente conectado post')
        
        })
        const result = await this.orderService.create(body)
        res.send({status: 'success', data: result})
    }catch(error){
        console.log(error)
    }
} 
  /*   updateorder  = async (req, res) => {
        try{
            const { body } = req
            const result = await this.orderService.updateorder({ body });
            res.send({status: 'success', data: result})
        }catch(error){
            console.log(error)
        }
    } */
    deleteorder = async (req, res) => {
        try{
            const result = await this.orderService.delete({ _id: pid });
            res.send({status: 'success', data: result})
        }catch(error){
            console.log(error)
        }
    }

}
