import { CategoryModel } from "../Models/Category.Model";

const categoriesDal = require('../dal/categories-dal');
// import { CategoryModel } from '../Models/Category.Model';
//import  categoriesDal  from '../dal/categories-dal';

async function getAllCategories(): Promise<CategoryModel[]> {
    let categories = await categoriesDal.getAllCategories();
    return categories;
}

module.exports = {
    getAllCategories
};
