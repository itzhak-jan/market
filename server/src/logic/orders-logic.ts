import { OrderModel } from "../Models/order.Model";
import { ProductModel } from "../Models/Product.Model";
import PDFDocument from 'pdfkit';
import { Response } from 'express';

const productsDal = require('../dal/product-dal');
const ordersDal = require('../dal/orders-dal');

async function addOrder(order: OrderModel, res: Response) {
    order.date = new Date();
    let allProduct = await productsDal.getAllProducts();
    let totalPrice = 0;

    order.items.forEach(i => {
        let product = allProduct.find((item: ProductModel) => item.id === i.product.id);
        if (product) {
            let price: number = product.price;
            totalPrice += (price * i.quantity);
        } else {
            console.warn(`Product with ID ${i.product.id} not found.`);
        }
    });
    order.totalPrice = totalPrice;
    await ordersDal.addOrder(order);

    // Generate and send PDF
    generateReceiptPDF(order, res);
}

const generateReceiptPDF = (order: OrderModel, res: Response) => {
    const doc = new PDFDocument();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=receipt.pdf');

    doc.pipe(res);

    // Add title
    doc.fontSize(18).text('Receipt', { align: 'center' });

    // Customer details
    doc.fontSize(12).text(`Name: ${order.name}`);
    doc.text(`Address: ${order.address}`);
    doc.text(`Date: ${order.date?.toISOString().split('T')[0]}`);
    doc.text(`Card ID: ${order.cardId}`);

    // Item list
    doc.text('\nItems:', { underline: true });
    order.items.forEach(item => {
        doc.text(`${item.product.name} - Quantity: ${item.quantity} - Price: $${item.product.price} - Total: $${item.quantity * item.product.price}`);
    });

    // Total price
    doc.text(`\nTotal Price: $${order.totalPrice?.toFixed(2)}`, { underline: true });

    doc.end();
}

module.exports = {
    addOrder
};
