import express, { Request, Response } from 'express';
// import productsLogic from '../logic/products-logic';
const productsLogic = require('../logic/product-logic');

const router = express.Router();

router.get("/", async (request: Request, response: Response) => {
    try {
        const products = await productsLogic.getAllProducts();
        response.json(products);
    } catch (e: any) {
        console.error(e);
        response.status(500).send(e.message);
    }
});

router.post("/", async (request: Request, response: Response) => {
    try {
        let product = request.body;
        await productsLogic.addProduct(product);
        response.json();
    }
    catch (e: any) {

        console.error(e);
        response.status(600).send(e.message)
    }
});

export default router;
