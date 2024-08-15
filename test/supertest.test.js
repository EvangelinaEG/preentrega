import { assert, expect } from 'chai';
import supertest from 'supertest';

const resqueter = supertest('http://localhost:3000');

describe('Teste de app', function() {
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