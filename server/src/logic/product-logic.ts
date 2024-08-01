import { ProductModel } from "../Models/Product.Model";
const productsDal = require('../dal/product-dal');


async function getAllProducts() {
    let Products = await productsDal.getAllProducts();
    return Products;
}
async function addProduct(product: ProductModel) {
    await productsDal.addProduct(product);
    //Maybe we'll use a socket here
    return ;
}
async function updateProduct(product: ProductModel) {
    await productsDal.updateProduct(product);
        //Maybe we'll use a socket here
    return ;
}
module.exports = {
    getAllProducts,
    addProduct,
    updateProduct,
}