import { ProductModel } from "../Models/Product.Model";

const connection = require('./connection-wrapper');


async function getAllProducts() {
    let sql = `SELECT p.id, p.name, c.name as category , p.unit_price as price, p.img , category_id as categoryID
    FROM market.product p join market.categories c
    on p.category_id = c.id
    order by p.category_id`
    let Products = await connection.execute(sql);
    return Products;
}

async function addProduct(product: ProductModel) {
    let sql = `INSERT INTO market.product (name, category_id , unit_price , img)
    values(?, ?, ?,?)`;
    let parameters = [product.name, product.categoryID, product.price, product.img];
    await connection.executeWithParameters(sql, parameters);
    return;
}

async function updateProduct(product: ProductModel) {
    let sql = `UPDATE market.product
    SET name = ? , category_id = ?, unit_price =? , img =?
    WHERE id = ?`;
    let parameters = [product.name, product.categoryID, product.price, product.img , product.id];
    await connection.executeWithParameters(sql, parameters);
    return;
}
module.exports = {
    getAllProducts,
    addProduct,
    updateProduct,
}
