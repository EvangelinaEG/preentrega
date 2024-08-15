import { assert, expect } from 'chai';
import mongoose from 'mongoose'
import ProductsManagerMongo from '../src/dao/MONGO/productsMongo.manager.js'

//const expect = chai.expect
mongoose.connect("mongodb+srv://vanyu77:Joluvimo777@baseseva.hebhslk.mongodb.net/?retryWrites=true&w=majority&appName=BasesEva")

describe('Set de test con chai', function(){
    before(function(){
        this.ProductDao = new ProductsManagerMongo()
    })
    beforeEach(function() {
        //mongoose.connection.collection.products.drop()
        this.timeout(500)
    })
    
    it('El Dao debe obtener los productos en formato arreglo', async function() {
        const result = await this.ProductDao.getAll({});
        expect(Array.isArray(result)).to.be.ok
    });
})

