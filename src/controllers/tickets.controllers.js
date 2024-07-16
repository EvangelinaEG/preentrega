import { ticketService } from "../service/index.js"

export default class ticketController{
    constructor(){
        this.ticketService = ticketService
    }

    gettickets    = async (req,res) => {
        try{
            const tickets = await this.ticketService.getAll()
            res.send({status: 'success', tickets})
        }catch(error){
            console.log(error)
        }
    } 
    getticket     =  async (req, res) => {
        try{
            const { uid } = req.params
            const ticketFound = await this.ticketService.get({_id: uid})
            res.send({status: 'success', payload: ticketFound})
        }catch(error){
            console.log(error)
        }
    }
    createticket  = async (req, res) => {
        try{
            const  socketServer  = req.socketServer 
            const messages = []
            socketServer.on('connection', socket => {
                alert('Cliente conectado post')
            
            })
            const result = await this.ticketService.create(body)
            res.send({status: 'success', data: result})
        }catch(error){
            console.log(error)
        }
  }

  getticketById     =  async (req, res) => {
    try{
        const { pid } = req.params
        const ticketFound = await this.ticketService.getBy(pid)
        res.send({status: 'success', payload: ticketFound})
    }catch(error){
        console.log(error)
    }
}
updateticket  = async (req, res) => {
    try{
        const  socketServer  = req.socketServer 
        const messages = []
        socketServer.on('connection', socket => {
            alert('Cliente conectado post')
        
        })
        const result = await this.ticketService.create(body)
        res.send({status: 'success', data: result})
    }catch(error){
        console.log(error)
    }
} 
  /*   updateticket  = async (req, res) => {
        try{
            const { body } = req
            const result = await this.ticketService.updateticket({ body });
            res.send({status: 'success', data: result})
        }catch(error){
            console.log(error)
        }
    } */
    deleteticket = async (req, res) => {
        try{
            const result = await this.ticketService.delete({ _id: pid });
            res.send({status: 'success', data: result})
        }catch(error){
            console.log(error)
        }
    }

}
