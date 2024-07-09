import { connectDB, objectConfig} from '../config/index.js'

export let ProductDao
export let UserDao
export let CartDao
export let OrderDao

switch (objectConfig.persistence) {
    case 'MEMORY':
        const { default: UserDaoMemory } = await import('./memory/user.memory.js')
        UserDao = UserDaoMemory
        break;
    case 'FS':
        
        break;

    default:
        connectDB() // 2 llamada a la conexión
        const { default: ProductDaoMongo } = await import('./mongo/productsMongo.manager.js')
        ProductDao = ProductDaoMongo

        const { default:  UserDaoMongo } = await import('./mongo/usersMonto.manager.js')
        UserDao = UserDaoMongo

        const { default:  OrderDaoMongo } = await import('./mongo/odersMongo.manager.js')
        OrderDao = OrderDaoMongo

        const { default:  CartDaoMongo} = await import('./mongo/cartsMongo.manager.js')
        CartDao = CartDaoMongo
        break;
}

