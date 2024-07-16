import { connectDB } from '../config/index.js';

let ProductDao;
let UserDao;
let CartDao;
let ticketDao;

async function initializeDAOs() {
  switch ('MONGO') {
    case 'MONGO':
      await connectDB();
      const { default: ProductsManagerMongo } = await import('./MONGO/productsMongo.manager.js');
      ProductDao = ProductsManagerMongo;

      const { default: UsersManagerMongo } = await import('./MONGO/usersMongo.manager.js');
      UserDao = UsersManagerMongo;

      const { default: ticketDaoMongo } = await import('./MONGO/ticketMongo.manager.js');
      ticketDao = ticketDaoMongo;

      const { default: CartManagerMongo } = await import('./MONGO/cartsMongo.manager.js');
      CartDao = CartManagerMongo;
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
  ticketDao
};
