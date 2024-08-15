import ProductsManagerMongo from "../src/dao/MONGO/productsMongo.manager.js";
import Asserts from 'assert';
import mongoose from "mongoose";

mongoose.connect("mongodb+srv://vanyu77:Joluvimo777@baseseva.hebhslk.mongodb.net/?retryWrites=true&w=majority&appName=BasesEva")

const assert = Asserts.strict

describe('Test Products Dao', function() {
    before(async function() {
        this.ProductDao = new ProductsManagerMongo();
    });
    beforeEach(function() {
        //mongoose.connection.collection.products.drop()
        this.timeout(500)
    })
    it('El Dao debe obtener los productos en formato arreglo', async function(){
        this.timeout(5000); 
        const result = await this.ProductDao.getAll({})
        assert.strictEqual(Array.isArray(result), true)
    })
    it('El dao debe agregar un usuario correctamente a la base de datos', async function(){
        let mockProduct = {
            title: 'Producto de prueba',
            description: 'Descripcion del producto',
            price: '150',
            code: '841694',
            stock: 65,
            status: true,
            owner: 'evange.gomes@gmail.com',
            category: 'Category 2'
        }

        const result = await this.ProductDao.create(mockProduct)
        assert.ok(result._id)
    })
    it('El dao puede obtener a un producto por code', async function (){
        let mockProduct = {
            title: 'Producto de prueba',
            description: 'Descripcion del producto',
            price: '150',
            code: '841694',
            stock: 65,
            status: true,
            owner: 'evange.gomes@gmail.com',
            category: 'Category 2'
        }
        
        await this.ProductDao.productsModel.create(mockProduct);
    
        const product = await this.ProductDao.getBy(mockProduct.code);
        
        assert.strictEqual(typeof product, 'object');
        assert.strictEqual(product.code, mockProduct.code); 
    })
    
})
