import { ProductModel } from "./Product.Model";

export interface CartModelItem {
    product: ProductModel;
    quantity: number;
}