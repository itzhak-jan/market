import { TYPES } from "mssql";
import { OrderModel } from "../Models/order.Model";

let connection = require("./connection-wrapper")


// async function getAllOrders() {
//     let sql = `SELECT o.id, u.name as user, o.const as totalPrice, o.date_order as dateOrder, count(c.id) as amountOfProduct
//     FROM supermarket.orders o
//     join supermarket.users u
//     on o.user_id = u.id
//     join supermarket.carts c
//     on o.cart_id = c.id
//     join supermarket.product_cart pc
//     on pc.cart_id = c.id
//     join supermarket.product p
//     on pc.product_id = p.id
//     group by(c.id)`
//     let orders = await connection.execute(sql);
//     return orders;
// }

// async function addOrder(order: OrderModel) {
//     let sql = `INSERT INTO market.orders
//     (name , total_price , date , address , cardId ,credit_card)
//     values( ?, ?, ?, ?, ?, ?)`;
//     let parameters = [order.name, order.totalPrice, order.date, order.address,
//     order.cardId, order.creditCard];
//     console.log(parameters);
//     await connection.executeWithParameters(sql, parameters);
//     return
// }

async function addOrder(order: OrderModel): Promise<void> {

    if (isNaN(order.totalPrice)) {
        throw new Error('Invalid totalPrice value');
    }

    let sql = `INSERT INTO market.orders
    (name, total_price, date, address, cardId, credit_card)
    VALUES (@name, @total_price, @date, @address, @cardId, @credit_card)`;

    let parameters = [
        { name: 'name', value: order.name },
        { name: 'total_price', value: order.totalPrice },
        { name: 'date', value: order.date },
        { name: 'address', value: order.address },
        { name: 'cardId', value: order.cardId },
        { name: 'credit_card', value: order.creditCard }
    ];

    await connection.executeWithParameters(sql, parameters);
}


module.exports = {
    // getAllOrders,
    addOrder,
    // creatReception,
}
