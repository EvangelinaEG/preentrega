import { connectDB } from '../config/index.js';

let ProductDao;
let UserDao;
let CartDao;
let OrderDao;

async function initializeDAOs() {
  switch ('MONGO') {
    case 'MONGO':
      await connectDB();
      const { default: ProductDaoMongo } = await import('./MONGO/productsMongo.manager.js');
      ProductDao = ProductDaoMongo;

      const { default: UserDaoMongo } = await import('./MONGO/usersMongo.manager.js');
      UserDao = UserDaoMongo;

      const { default: OrderDaoMongo } = await import('./MONGO/ordersMongo.manager.js');
      OrderDao = OrderDaoMongo;

      const { default: CartDaoMongo } = await import('./MONGO/cartsMongo.manager.js');
      CartDao = CartDaoMongo;
      break;

    case 'MEMORY':
      const { default: UserDaoMemory } = await import('./memory/user.memory.js');
      UserDao = UserDaoMemory;
      break;

    case 'ARCHIVO':
      // Manejo de archivo aquí
      break;

    default:
      break;
  }
}

await initializeDAOs();

export {
  ProductDao,
  UserDao,
  CartDao,
  OrderDao
};
