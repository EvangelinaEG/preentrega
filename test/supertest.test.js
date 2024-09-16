import { assert, expect } from 'chai';
import supertest from 'supertest';

const resqueter = supertest('http://localhost:3000');

describe('Teste de app', function() {
    describe('test de Sessions', function(){
        it('El endpoint de /api/sessions/login debe iniciar session correctamente', async () => {
            const loginMock = {    
                "email": "evange.gomes@gmail.com",
                "password":"abc321"
            };

            const { statusCode, ok, body } = await resqueter.post('/api/sessions/login').send(loginMock);

        })
        it('El endpoint /api/sessions/register debe crear un usuario correctamente', async () => {
            const registerMock = {
                "first_name": "Evangelina",
                "last_name": "Gomes",
                "email": "e.gomes@gmail.com",
                "password": "abc321"
             };
                const { statusCode, ok, _body } = await resqueter.post(`/api/sessions/register`).send(registerMock);

           // expect(ok).to.be.equal(true);
            expect(statusCode).to.be.equal(200);
            expect(_body.result).to.be.property('_id')
        } )
    })
    describe('test de cart', function(){
        it('El endpoint de /api/carts debe crear un carrito correctamente', async () => {
            const cartMock = {
                    "products": {
                       "product": "664d1a31f798d6a20eba88d9",
                       "quantity":5
                    }
            };

            const { statusCode, ok, body } = await resqueter.post('/api/carts').send(cartMock);

            console.log(ok);
            console.log(statusCode);
            console.log(body);
        })
        it('El endpoint /api/carts/:cart/products/:pid debe crear un producto dentro de un carrito correctamente', async () => {
                const cid = "66556550a2ad31a521163903"
                const pid =  "664d1a31f798d6a20eba88d9"
                const { statusCode, ok, body } = await resqueter.post(`/api/carts/${cid}/products/${pid}`);

            expect(ok).to.be.equal(true);
            expect(statusCode).to.be.equal(200);
           
        } )
    })
})