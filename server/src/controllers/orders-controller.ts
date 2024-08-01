import express, { Request, Response } from 'express';
const ordersLogic = require('../logic/orders-logic') ;
const router = express.Router();

router.post("/", async (request: Request, response: Response) => {
  try {
    const order = request.body;
    const receipt = await ordersLogic.addOrder(order, response);
  } catch (e: any) {
    console.error(e);
    response.status(500).send((e as Error).message);
  }
});

export default router;
