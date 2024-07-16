import ticketModel from "./models/ticket.model.js";

class TicketManagerMongo{
    constructor(){
        this.ticketModel = ticketModel;
    }

    async create(ticket){
        return await this.ticketModel.create(ticket)
    }

    async get(filter) {
        return this.ticketModel.findById({ _id: filter });
    }
    
}

export default TicketManagerMongo