import cors from 'cors';
//import swaggerJSDoc from 'swagger-jsdoc';
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
// import swaggerUi from 'swagger-ui-express';
import express from 'express';
import productController from './controllers/product-controller';
import categoriesController from './controllers/categories-controller';
import ordersController from './controllers/orders-controller';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Supermarket API',
    version: '1.0.0',
    description: 'API for a supermarket system',
  },
  servers: [
    {
      url: 'http://localhost:3001',
      description: 'Development server',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

const server = express();

const corsOptions = {
  origin: ['http://localhost:4200', 'http://localhost:3000'],
  optionsSuccessStatus: 200,
};

server.use(cors(corsOptions));
server.use(express.json());
server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

server.use("/products", productController);
server.use("/categories", categoriesController);
server.use("/orders", ordersController);

server.listen(5000, () => console.log("Listening on http://localhost:5000"));
