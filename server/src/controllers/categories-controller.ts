import express, { Request, Response } from 'express';
// import categoriesLogic from '../logic/categories-logic';
const categoriesLogic = require('../logic/categories-logic');

const router = express.Router();

router.get("/", async (request: Request, response: Response) => {
    try {
        const categories = await categoriesLogic.getAllCategories();

        response.json(categories);
    } catch (e: any) {
        console.error(e);
        response.status(500).send(e.message);
    }
});

export default router;
