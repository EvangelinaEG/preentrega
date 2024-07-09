import ordersModel from "./models/order.model.js";

export default class OrdersManagerMongo{
    constructor(){
        this.ordersModel = ordersModel;
    }

    async create(order){
        return await this.ordersModel.create(order)
    }

    async get(filter) {
        return this.orderModel.findById({ _id: filter });
    }
    
}