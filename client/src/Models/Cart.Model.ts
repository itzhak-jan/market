import { ProductModel } from "./Product.Model";

export interface CartModel {
    items: CartModelItem[];
}

export interface CartModelItem {
    product: ProductModel;
    quantity: number;
}