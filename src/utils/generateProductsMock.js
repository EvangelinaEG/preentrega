import { faker } from '@faker-js/faker'
import crypto from 'crypto'

function generateProducts(){
    return{
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        code: faker.commerce.product(),
        category: faker.commerce.department(),  
        stock: parseInt(faker.string.numeric()),
        _id: crypto.randomUUID()
    }
}

export const generateUsers = () => {

    let numProducts = parseInt(faker.string.numeric(1, {bannerDigits: ['0']}))
    let products= []
    for(let i = 0; i < numProducts; i++){
        products.push(generateProducts())
    }

    return {
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        sex: faker.person.sex(),
        email: faker.internet.email(),
        _id: crypto.randomUUID()
    }
}