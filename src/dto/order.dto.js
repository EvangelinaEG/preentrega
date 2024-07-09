class OrderDTO {
    constructor(newOrder){
        this.purchase_datetime = newOrder.purchase_datetime
        this.amount = newOrder.amount
        this.purchaaser = newOrder.price
        this.code = newOrder.code
    }
}

export default OrderDTO