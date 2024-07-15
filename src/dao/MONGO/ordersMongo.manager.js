import ordersModel from "./models/order.model.js";

class OrdersManagerMongo{
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

export default OrdersManagerMongo