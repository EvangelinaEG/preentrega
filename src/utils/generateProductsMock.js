import { faker } from '@faker-js/faker'

export const generateProducts = () => {
    return {
        title: faker.commerce.productName(),
        title: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        code: faker.commerce.product(),
        category: faker.commerce.department()    
    }
}