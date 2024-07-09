export class DaoMongo{
    constructor(model){
        this.model = model
    }

    getAll = async () => await this.model.find({})
    get = async (filter) => await this.model.findOne(filter)
    create = async () => await this.model.create({})
    update = async () => await this.model.update({})
    delete = async () => await this.model.delete({})
}