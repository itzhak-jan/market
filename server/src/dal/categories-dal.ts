// import connection from './connection-wrapper';
const connection = require('./connection-wrapper');

import  {CategoryModel}  from '../Models/Category.Model';

async function getAllCategories(): Promise<CategoryModel[]> {
    let sql = `SELECT id, name FROM market.categories`;
    let categories = await connection.execute(sql);
    return categories;
}
module.exports = {
    getAllCategories
};
