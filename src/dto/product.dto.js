class ProductDTO {
    constructor(newProduct){
        this.title = newProduct.title
        this.description = newProduct.description
        this.price = newProduct.price
        this.thumbnails = newProduct.thumbnails
        this.code = newProduct.code
        this.stock = newProduct.stock
        this.status = newProduct.status
        this.category = newProduct.category
        

        // this.active  = true
        // this.phone   = newUser.phone ? newUser.phone.split('-').join('') : '' 
    }
}

export default ProductDTO