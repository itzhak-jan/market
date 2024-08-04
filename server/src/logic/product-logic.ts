import { ProductModel } from "../Models/Product.Model";
const productsDal = require('../dal/product-dal');


async function getAllProducts(): Promise<ProductModel[]> {
    let Products = await productsDal.getAllProducts();
    return Products;
}
async function addProduct(product: ProductModel): Promise<void>  {
    await productsDal.addProduct(product);
    //Maybe we'll use a socket here
    return ;
}
// async function updateProduct(product: ProductModel): Promise<void>  {
//     await productsDal.updateProduct(product);
//         //Maybe we'll use a socket here
//     return ;
// }
module.exports = {
    getAllProducts,
    addProduct,
    // updateProduct,
}