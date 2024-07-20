export const generateProductError = (error) => {
    return `Hay una de las propiedades del producto incompleto o no valido.
    Listado de propiedades requeridas:
    *title: necesita ser un string pero se recibio ${product.title}
    *description: necesita ser un string pero se recibio ${product.description}
    *code: necesita ser un numero pero se recibio ${product.code}
    *category: necesita ser un string pero se recibio ${product.category}
    *price: necesita ser un numero pero se recibio ${product.price}`
}

export const generateCartError = (error) => {
    return `Hay una de las propiedades del carrito estan incompletas o no validas.
    Listado de propiedades requeridas:
    *products: necesita tener un numero mayor a cero pero se recibio ${cart}`
}

